# 🚀 Project Management System

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

### Development & Deployment
- **Maven** - Dependency management and build tool
- **AWS EC2** - Cloud hosting platform
- **nginx** - Web server and reverse proxy
- **SSL/TLS** - Secure HTTPS communication

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

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Java 17** or higher
- **Node.js 18** or higher
- **npm** or **yarn**
- **MySQL 8.0** or higher
- **Maven 3.6** or higher

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/smaranbh7/Project-Management-System.git
cd Project-Management-System
```

### 2. Database Setup
```sql
-- Create database
CREATE DATABASE project_management_system;

-- Create user (optional)
CREATE USER 'pms_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON project_management_system.* TO 'pms_user'@'localhost';
FLUSH PRIVILEGES;
```

### 3. Backend Configuration
```bash
cd Backend
```

Create `src/main/resources/application.properties`:
```properties
# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/project_management_system
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
spring.jpa.show-sql=true

# Email Configuration
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=your_email@gmail.com
spring.mail.password=your_app_password
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true

# Stripe Configuration
stripe.api.key=your_stripe_public_key
stripe.api.secret=your_stripe_secret_key
```

### 4. Frontend Configuration
```bash
cd Frontend/ProjectManagementSystem
```

Create `src/config/api.js` (if not exists):
```javascript
export const API_BASE_URL = "http://localhost:5454";
```

## 🏃‍♂️ Running the Application

### 1. Start the Backend
```bash
cd Backend
mvn spring-boot:run
```
The backend will start on `http://localhost:5454`

### 2. Start the Frontend
```bash
cd Frontend/ProjectManagementSystem
npm install
npm run dev
```
The frontend will start on `http://localhost:5173`

### 3. Access the Application
Open your browser and navigate to `http://localhost:5173`

## 📚 API Documentation

### Authentication Endpoints
- `POST /auth/signup` - User registration
- `POST /auth/login` - User login

### Project Endpoints
- `GET /api/projects` - Get user projects
- `POST /api/projects` - Create new project
- `GET /api/projects/{id}` - Get project details
- `PUT /api/projects/{id}` - Update project
- `DELETE /api/projects/{id}` - Delete project

### Issue/Task Endpoints
- `GET /api/issues/project/{projectId}` - Get project issues
- `POST /api/issues` - Create new issue
- `PUT /api/issues/{id}/status/{status}` - Update issue status
- `PUT /api/issues/{id}/assignee/{userId}` - Assign user to issue

### Team Management
- `POST /api/projects/invite` - Invite user to project
- `GET /api/projects/accept_invitation` - Accept project invitation
- `DELETE /api/projects/{id}/userDelete` - Remove user from project


## 👨‍💻 Developed By

**Smaran Bhattarai** - [GitHub Profile](https://github.com/smaranbh7)

## 🙏 Acknowledgments

- Spring Boot team for the excellent framework
- React team for the powerful frontend library
- shadcn/ui for beautiful UI components
- Tailwind CSS for utility-first styling
- All open source contributors

---

⭐ If you like this project, please give it a star on GitHub! 