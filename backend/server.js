require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer'); // For handling file uploads
const connectDB = require('./config/database');
const User = require('./models/User');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const plansRouter = require('./routes/plans');
// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
// Parse JSON bodies
app.use(express.json());

// Mount the plans router
app.use('/api/plans', plansRouter);
// Configure multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Create different folders for certificates and portfolios
        const folder = file.fieldname === 'certificate' ? 'certificates' : 'portfolios';
        const uploadPath = path.join(__dirname, 'uploads', folder);
        // Create directory if it doesn't exist
        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        // Create unique filename with timestamp
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// File filter function
const fileFilter = (req, file, cb) => {
    if (file.fieldname === 'certificate') {
        // Allow only specific file types for certificates
        if (file.mimetype === 'application/pdf' || 
            file.mimetype === 'image/jpeg' || 
            file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only PDF, JPEG, and PNG files are allowed.'), false);
        }
    } else if (file.fieldname === 'portfolio') {
        // Allow only PDF for portfolios
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only PDF files are allowed for portfolio.'), false);
        }
    }
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

// Connect to Database
connectDB()
    .then(connection => {
        console.log('Database connection established');
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Failed to connect to database:', err);
        process.exit(1);
    });

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// Session handling
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Login route
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        let { role } = req.body;
        
        // Convert role to lowercase to match database
        role = role.toLowerCase();
        
        console.log('Login attempt:', { email, role }); // Debug log

        // Find user with matching email and role
        const user = await User.findOne({ email, role });
        console.log('Found user:', user ? 'Yes' : 'No'); // Debug log
        
        if (!user) {
            console.log('No user found with these credentials');
            return res.status(401).json({ 
                success: false, 
                message: `Invalid ${role} credentials - user not found`
            });
        }

        // Check password
        const isMatch = await user.matchPassword(password);
        console.log('Password match:', isMatch ? 'Yes' : 'No'); // Debug log

        if (!isMatch) {
            console.log('Password does not match');
            return res.status(401).json({ 
                success: false, 
                message: `Invalid ${role} credentials - password mismatch`
            });
        }

        // Set session
        req.session.userId = user._id;
        req.session.role = user.role;

        res.json({
            success: true,
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error during login',
            error: error.message 
        });
    }
});

// Logout route
app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login.html');  // Redirect to login page after logout
    });
});

// Signup route
app.post('/api/signup', upload.fields([
    { name: 'certificate', maxCount: 1 },
    { name: 'portfolio', maxCount: 1 }
]), async (req, res) => {
    try {
        const { name, email, password, phone, role, experience, license } = req.body;
        
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Email already registered'
            });
        }

        let userData = {
            name,
            email,
            password,
            phone,
            role: role || 'customer'
        };

        // Add architect-specific fields if role is architect
        if (role === 'architect') {
            userData = {
                ...userData,
                experience,
                license,
                credentials: req.files['certificate'] ? req.files['certificate'][0].path : null,
                portfolio: req.files['portfolio'] ? req.files['portfolio'][0].path : null
            };
        }

        // Create new user
        const user = new User(userData);
        await user.save();

        res.status(201).json({
            success: true,
            message: 'User registered successfully'
        });

    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({
            success: false,
            message: 'Error during signup',
            error: error.message
        });
    }
});

// 404 handler
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '../public/404.html'));
});

// Add this after mongoose.connect()
mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err);
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set proper MIME types
app.use(express.static(path.join(__dirname, '../public'), {
    setHeaders: (res, path) => {
        if (path.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        }
        if (path.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript');
        }
    }
}));

// Ensure CSS files are served with correct MIME type
app.get('*.css', function(req, res, next) {
    res.type('text/css');
    next();
});

// Routes
app.post('/api/signup', async (req, res) => {
    // ... existing signup route code ...
});

// Catch-all route to serve index.html for client-side routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Error handling middleware for Multer
app.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                success: false,
                message: 'File size is too large. Maximum size is 5MB'
            });
        }
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
    next(error);
});

// Serve static files from the 'public' directory
app.use(express.static('public'));
