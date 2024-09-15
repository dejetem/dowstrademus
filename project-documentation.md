# Student Election System - Project Documentation

## Table of Contents
1. [Introduction](#introduction)
2. [System Architecture](#system-architecture)
3. [Backend Setup](#backend-setup)
4. [Frontend Setup](#frontend-setup)
5. [API Endpoints](#api-endpoints)
6. [Database Schema](#database-schema)
7. [File Upload and Processing](#file-upload-and-processing)
8. [Authentication and Authorization](#authentication-and-authorization)
9. [Deployment](#deployment)
10. [Future Improvements](#future-improvements)

## 1. Introduction

The Student Election System is a supplementary system designed for a university's student representative council election. It provides functionality for data replication and verification purposes, allowing administrators to upload and manage student voter information.

Key features include:
- User authentication (admin login)
- File upload for student data (CSV/Excel)
- Asynchronous processing of uploaded files
- Display of student information in a paginated table
- Email notifications for file processing status

## 2. System Architecture

The system follows a client-server architecture:

- Backend: Django with Django Rest Framework
- Frontend: React with TypeScript and Tailwind CSS
- Database: MySQL
- Asynchronous Task Queue: Celery with Redis as message broker
- Containerization: Docker and Docker Compose

## 3. Backend Setup

1. Clone the repository
2. Navigate to the backend directory
3. Create a `.env` file with necessary environment variables (see `docker-compose.yml` for required variables)
4. Run `docker-compose up --build`

This will start the Django application, MySQL database, phpMyAdmin, Redis, and Celery worker.

## 4. Frontend Setup

1. Navigate to the frontend directory
2. Install dependencies: `npm install`
3. Create a `.env` file with `REACT_APP_API_URL=http://localhost:8000/api`
4. Start the development server: `npm start`

## 5. API Endpoints

- `POST /api/users/`: Register a new user
- `POST /api/users/login/`: User login
- `POST /api/users/logout/`: User logout
- `GET /api/students/`: List students (paginated)
- `POST /api/file-uploads/`: Upload student data file

## 6. Database Schema

### User
- id (int, primary key)
- username (varchar)
- email (varchar)
- password (hashed)

### Student
- id (int, primary key)
- student_id (varchar, unique)
- first_name (varchar)
- last_name (varchar)
- email (varchar, unique)
- department (varchar)
- year_of_study (int)
- uploaded_at (datetime)

### FileUpload
- id (int, primary key)
- file (file field)
- uploaded_by (foreign key to User)
- uploaded_at (datetime)
- status (varchar: IN_PROGRESS, COMPLETED, FAILED)
- error_message (text, nullable)

## 7. File Upload and Processing

1. Admin uploads a CSV or Excel file through the frontend
2. File is sent to the backend and saved
3. A Celery task is triggered to process the file asynchronously
4. The task reads the file, validates data, and creates/updates Student records
5. Upon completion, an email is sent to the admin with the processing status
6. The frontend periodically checks the file status and updates the UI accordingly

## 8. Authentication and Authorization

- JWT (JSON Web Tokens) are used for authentication
- Token is stored in localStorage on the client-side
- Protected routes in the frontend check for the presence of a valid token
- API requests include the token in the Authorization header

## 9. Deployment

### Backend
- The backend is dockerized and can be deployed to any platform supporting Docker containers (e.g., AWS ECS, Google Cloud Run, or a VPS with Docker installed)
- Ensure environment variables are properly set in the production environment

### Frontend
- Build the React app: `npm run build`
- Deploy the built files to a static file hosting service (e.g., Netlify, Vercel, or AWS S3 with CloudFront)
- Set the `REACT_APP_API_URL` to point to your production backend API URL

## 10. Future Improvements

1. Implement real-time updates using WebSockets for file processing status
2. Add more robust error handling and data validation
3. Implement unit and integration tests for both frontend and backend
4. Add support for multi-language interface
5. Implement a more granular permission system
6. Add data export functionality
7. Implement rate limiting to prevent abuse
8. Add logging and monitoring solutions for better observability
9. Implement a caching layer (e.g., Redis) for frequently accessed data
10. Optimize database queries and add appropriate indexes for better performance

