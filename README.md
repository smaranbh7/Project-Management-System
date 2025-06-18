#  Project Management System

A modern project management platform that enables users to manage projects, collaborate effectively, track progress, manage tasks, and communicate in real-time. The application features a clean, responsive interface with robust backend architecture supporting multiple subscription tiers.

## ✨ Features

### 🏗️ Core Functionality
- **Project Management**: Create, update, manage and organize projects 
- **Team Collaboration**: Invite team members and assign taks and issues
- **Real-time Chat**: Integrated messaging system for project communication
- **User Authentication**: Secure JWT-based authentication system using Spring Security
- **Project Status Tracking**: Monitor project progress with visual indicators

### 💰 Subscription & Payments
- **Multiple Tiers**: Free, Monthly, and Annual subscription plans
- **Stripe Integration**: Secure payment processing
- **Feature Restrictions**: Plan-based access control

### 🎨 User Experience
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Modern UI**: Clean interface built with shadcn/ui components


## 🛠️ Tech Stack

### Frontend
- **React 19.1.0** - Modern UI library with hooks
- **Vite** - Fast build tool and development server
- **Redux + Redux Toolkit** - State management
- **React Router Dom** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern component library
- **Lucide React** - Beautiful icons
- **Axios** - HTTP client for API calls

### Backend
- **Spring Boot 3.4.5** - Java framework for enterprise applications
- **Spring Security** - Authentication and authorization
- **Spring Data JPA** - Database abstraction layer
- **MySQL** - Relational database
- **JWT (jsonwebtoken)** - Token-based authentication
- **Stripe API** - Payment processing
- **Spring Boot Mail** - Invitation Email service integration
- **Lombok** - Boilerplate code reduction


## 📁 Project Structure

```
ProjectManagementSystem/
├── Backend/                    # Spring Boot Backend
│   ├── src/main/java/
│   │   └── com/smaran/projectmanagementsystem/
│   │       ├── config/         # Security & App configuration
│   │       ├── controller/     # REST API controllers
│   │       ├── model/          # JPA entities
│   │       ├── repo/           # Data repositories
│   │       ├── service/        # Business logic
│   │       ├── request/        # Request DTOs
│   │       └── response/       # Response DTOs
│   ├── src/main/resources/     # Application properties
│   └── pom.xml                 # Maven dependencies
│
├── Frontend/ProjectManagementSystem/  # React Frontend
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/              # Page components
│   │   ├── redux/              # State management
│   │   ├── config/             # API configuration
│   │   └── lib/                # Utility functions
│   ├── public/                 # Static assets
│   ├── package.json            # NPM dependencies
│   └── vite.config.js          # Vite configuration
│
└── README.md                   # Project documentation
```

## 👨‍💻 Developed By

**Smaran Bhattarai** - [GitHub Profile](https://github.com/smaranbh7)

## Screenshots
![Screenshot 2025-06-18 at 1 50 04 PM](https://github.com/user-attachments/assets/a193093a-b78a-4b36-aeed-e93e203f19ce)



⭐ If you like this project, please give it a star on GitHub! 
