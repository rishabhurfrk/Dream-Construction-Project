

# DREAM Construction - Construction Management Website



## Overview

DREAM Construction is a comprehensive construction management website designed to connect clients with construction professionals. The platform provides tools for clients to explore and purchase construction plans, calculate construction costs, and upload custom architectural plans. For administrators, it offers a robust dashboard to manage projects, users, plans, and client communications.

## Features

### Client-Facing Features

- **Plan Browsing:** Browse through existing construction plans with detailed specifications
- **Custom Plan Uploads:** Architects can upload custom plans for clients to purchase
- **Construction Cost Calculator:** Estimate construction costs based on parameters like location, size, and materials
- **User Authentication:** Secure signup/login for clients and professionals
- **Shopping Cart System:** Add desired plans to cart for purchase
- **Previous Uploads Tracking:** View history of uploaded architectural plans

### Admin Features

- **Dashboard Overview:** Visualize key metrics about users, projects, and plans
- **Project Management:** Track project status, progress, and client details
- **User Management:** Manage user accounts and permissions
- **Plan Management:** Add, remove, and update construction plans
- **Message Center:** Central hub for client communications

## Tech Stack

### Frontend
- HTML5, CSS3, JavaScript
- FontAwesome for icons
- Responsive design for all device sizes

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Multer for file uploads

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/website_project.git
   cd website_project
   ```

2. Install backend dependencies:
   ```
   cd backend
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Start the backend server:
   ```
   npm start
   ```
   For development with auto-reload:
   ```
   npm run dev
   ```

5. Access the frontend:
   Open `public/index.html` in your browser or serve it using a static file server.

## Project Structure

```
website_project/
├── backend/
│   ├── models/           # MongoDB schemas
│   ├── scripts/          # Seed scripts
│   ├── uploads/          # Storage for uploaded files
│   └── server.js         # Main server file
├── public/
│   ├── admin/            # Admin dashboard files
│   │   ├── css/
│   │   ├── js/
│   │   └── includes/     # Reusable HTML components
│   ├── css/              # Stylesheets
│   ├── images/           # Image assets
│   ├── js/               # JavaScript files
│   ├── model/            # 3D models
│   └── *.html            # HTML pages
└── README.md
```

## Usage

### Client Usage

1. Visit the homepage to explore services
2. Navigate to "Get Plan" to browse existing construction plans
3. Use "Calculate Cost" to estimate construction expenses
4. Create an account to upload custom architectural plans
5. View previously uploaded plans in your account

### Admin Usage

1. Access the admin panel at `/admin/admin-login.html`
2. Use the dashboard to monitor key metrics
3. Manage construction projects, users, and plans
4. Respond to client messages
5. Configure system settings

## Development

### Seeding the Database

To populate the database with sample plans:

```
cd backend
node scripts/seedPlans.js
```

### Adding New Features

1. For frontend components, add HTML/CSS/JS in the appropriate directories
2. For backend functionality, extend the server.js file or create new route files

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Note:** This is a fictional construction company website built for demonstration purposes.
