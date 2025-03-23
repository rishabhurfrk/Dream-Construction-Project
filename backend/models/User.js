const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['customer', 'architect'],
        default: 'customer'
    },
    phone: {
        type: String,
        required: true
    },
    // Architect-specific fields
    experience: {
        type: String,
        required: function() {
            return this.role === 'architect';
        }
    },
    license: {
        type: String,
        required: function() {
            return this.role === 'architect';
        }
    },
    credentials: {
        type: String,
        required: function() {
            return this.role === 'architect';
        }
    } // File path for certificate
}, {
    collection: 'UserCredentials'
});

// Method to check password
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('User', userSchema);
