# CatApp

## README

### Project Overview

Our goal is to build a full-stack application that allows registered users to:
- Upload photos of cats.
- Like or pass on other users' cat photos.
- Add liked cats to an album on their profile page.
- Comment in a forum below the poll in a respectful manner.

The application will include the following pages/features:
- **Landing Page**
- **Home Page**
- **Create Account Page**
- **Login Page**
- **Profile Page**
- **Settings Page**
- **Search Page** (possibly with a search bar in the nav bar)

Users will start at a landing page prompting them to sign in or register an account. From there, they will be directed to the home page, which displays a feed of cat photos. A navigation bar at the bottom will facilitate easy navigation between pages and features.

The application will be built using:
- **Node.js**
- **Express.js**

## Architecture

### Backend
- **Node.js & Express.js:** Set up the server and API routes.
- **Sequelize:** Manage database interactions with PostgreSQL.
- **JWT (JSON Web Token):** Handle user authentication and authorization.
- **AWS S3:** Store cat photos.

### Frontend
- **Handlebars.js:** Render HTML templates.
- **CSS Framework (e.g., Bootstrap):** Style the application.
- **JavaScript:** Add interactivity on the client side.

### MVC Architecture
- **Models:** Define the data schema.
- **Views:** Handle user interface rendering.
- **Controllers:** Handle application logic and user input.

## Detailed Features

### User Authentication
- **Sign Up:**
  - **Route:** `POST /signup`
  - **Form Fields:** username, email, password
  - **Notes:** Hash password using bcrypt before storing
- **Login:**
  - **Route:** `POST /login`
  - **Notes:** Validate user credentials and start a session
- **Profile Management:**
  - **Route:** `GET /profile`
  - **Notes:** Allow users to update their bio and profile picture

### Photo Uploading
- **Upload Photo:**
  - **Route:** `POST /photos`
  - **Form Fields:** photo upload, description, tags
  - **Notes:** Store photo in AWS S3, save URL in the database
- **View Photos:**
  - **Route:** `GET /photos`
  - **Notes:** Display a feed of uploaded photos

### Comments
- **Add Comment:**
  - **Route:** `POST /photos/:photoId/comments`
  - **Form Fields:** comment_text
- **View Comments:**
  - **Route:** `GET /photos/:photoId/comments`
  - **Notes:** Display comments for a specific photo

### Admin Panel
- **Manage Users:**
  - **Route:** `GET /admin/users`
  - **Notes:** List, edit, and delete users
- **Manage Photos:**
  - **Route:** `GET /admin/photos`
  - **Notes:** List, edit, and delete photos

## Database Schema

### Users Table
- **id:** Primary Key
- **username:** String, Unique
- **email:** String, Unique
- **password:** String
- **bio:** Text
- **profile_picture_url:** String
- **created_at:** Timestamp
- **updated_at:** Timestamp

### Photos Table
- **id:** Primary Key
- **user_id:** Foreign Key (references Users)
- **photo_url:** String
- **description:** Text
- **tags:** Array of Strings
- **created_at:** Timestamp
- **updated_at:** Timestamp

### Comments Table
- **id:** Primary Key
- **photo_id:** Foreign Key (references Photos)
- **user_id:** Foreign Key (references Users)
- **comment_text:** Text
- **created_at:** Timestamp
- **updated_at:** Timestamp

### PhotoLike Table
- **id:** Primary Key
- **user_id:** Foreign Key (references Users)
- **photo_id:** Foreign Key (references Photos)

## User Stories

1. **As a user, I want to sign up and create a profile so that I can participate in the app.**
2. **As a user, I want to upload photos of my cat so that I can share them with others.**
3. **As a user, I want to comment on photos so that I can share my thoughts and interact with other users.**
4. **As an admin, I want to manage users and photos so that I can ensure the platform remains safe and enjoyable.**

## Detailed Implementation Plan

### Backend (Node.js & Express.js)
1. **Set up the server and routes:**
   - Create server using Express.js.
   - Define routes for user authentication, photo uploading, and comments.
   - Implement middleware for authentication and file uploads.

2. **Set up Sequelize models:**
   - Define models for Users, Photos, Comments, and PhotoLikes.
   - Set up relationships between models.

3. **Implement controllers:**
   - Create controller functions for handling CRUD operations for each feature.
   - Ensure data validation and error handling.

### Frontend (Handlebars.js)
1. **Set up views:**
   - Create Handlebars templates for each page (e.g., signup, login, profile, photo feed).
   - Use partials for reusable components (e.g., header, footer, photo card).

2. **Implement client-side logic:**
   - Use JavaScript to handle form submissions and dynamic updates (e.g., commenting).

3. **Style the application:**
   - Use a CSS framework like Bootstrap for responsive design.
   - Customize styles to create a cohesive and visually appealing UI.

## Project Management
- **Assign roles and tasks:** Divide responsibilities among group members (e.g., backend development, frontend development, database design).
- **Use version control:** Use Git and a platform like GitHub for source control and collaboration.
- **Plan sprints:** Break down the project into sprints with specific goals and deadlines.
- **Regular meetings:** Schedule regular check-ins to discuss progress, address challenges, and adjust plans as needed.
