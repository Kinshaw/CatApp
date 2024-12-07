# CatApp
### README

###PROJECT OVERVIEW
Our goal is to build a full-stack application for the purpose of allowing registered users to upload photos of cats, as well as like or pass on other users cat photos, while adding the liked cats to an album on the user's profile page. 
The pages/features we are using are as follows:
Home Page
Profile Page
Settings Page


The application will consist of a landing page to prompt the user to sign in or register an account if they have not already registered an account.
From the landing page users will be directed to the home page where the user will see cat photos and be able to swipe left or swipe right to view cats. Their will be a title and description of the cat as well as a like button the user can use to add the photo to their personal album.   
The application will be built using:
Node.js
Express.js
Sequelize.js
Swipe.js
Handlebars.js


### Architecture:
1. **Backend:**
   - **Node.js & Express.js:** Set up the server and API routes.
   - **Sequelize:** Manage database interactions with PostgreSQL.
   - **Passport.js:** Handle user authentication. (future development)
   - **AWS S3:** Store cat photos. (future development)

2. **Frontend:**
   - **Handlebars.js:** Render HTML templates.
   - **CSS Framework (e.g., Bootstrap):** Style the application.
   - **JavaScript:** Add interactivity on the client side.

3. **MVC Architecture:**
   - **Models:** Define the data schema.
   - **Views:** Handle user interface rendering.
   - **Controllers:** Handle application logic and user input.

### Detailed Features:

#### User Authentication:
- **Sign Up:**
  - Route: `POST /`
  - Form with fields: username, email, password.
  - Hash password using bcrypt before storing.
- **Login:**
  - Route: `POST /login`
  - Validate user credentials and start a session.
- **Profile Management:**
  - Route: `GET /profile`
  - Allow users to update their bio and profile picture.

#### Photo Uploading:
- **Upload Photo:**
  - Route: `POST /update`
  - Form with fields: photo upload, description, tags.
  - Store photo in AWS S3, save URL in the database.
- **View Photos:**
  - Route: `GET /photos`
  - Display a feed of uploaded photos.



#### Comments (future development):
- **Add Comment:**
  - Route: `POST /photos/:photoId/comments`
  - Form with field: comment_text.
- **View Comments:**
  - Route: `GET /photos/:photoId/comments`
  - Display comments for a specific photo.


### Database Schema:

1. **Users Table:**
   - `id`: Primary Key
   - `username`: String, Unique
   - `email`: String, Unique
   - `password`: String
   - `bio`: Text
   - `profile_picture_url`: String
   - `created_at`: Timestamp
   - `updated_at`: Timestamp

2. **Photos Table:**
   - `id`: Primary Key
   - `user_id`: Foreign Key (references Users)
   - `photo_url`: String
   - `description`: Text
   - `tags`: Array of Strings
   - `created_at`: Timestamp
   - `updated_at`: Timestamp

3. **Polls Table:**
   - `id`: Primary Key
   - `photo_id`: Foreign Key (references Photos)
   - `question`: Text
   - `created_at`: Timestamp
   - `updated_at`: Timestamp

4. **Votes Table:**
   - `id`: Primary Key
   - `poll_id`: Foreign Key (references Polls)
   - `user_id`: Foreign Key (references Users)
   - `vote`: String (option chosen)
   - `created_at`: Timestamp

5. **Comments Table:**
   - `id`: Primary Key
   - `photo_id`: Foreign Key (references Photos)
   - `user_id`: Foreign Key (references Users)
   - `comment_text`: Text
   - `created_at`: Timestamp
   - `updated_at`: Timestamp

6. ** PhotoLikes Table:**
   - `id`: Primary Key
   - `photo_id`: Foreign Key (references Photos)
   - `user_id`: Foreign Key (references Users)

### User Stories:

1. **As a user, I want to sign up and create a profile so that I can participate in the app.**
2. **As a user, I want to uploadstore my favorite cat photos so that I can browse my collection.**
3. **As a user, I want to be able to edit my bio.**
In the future: 
3. **As a user, I want to vote on polls created by the admin so that I can engage with the community.**
4. **As a user, I want to view the results of polls so that I can see what others think about the photos.**
5. **As a user, I want to comment on photos so that I can share my thoughts and interact with other users.**
6. **As an admin, I want to create polls so that I can gather feedback from the community.**


### Detailed Implementation Plan:

#### Backend (Node.js & Express.js):
1. **Set up the server and routes:**
   - Create server using Express.js.
   - Define routes for user authentication, photo uploading, voting polls, and comments.
   - Implement middleware for authentication and file uploads.

2. **Set up Sequelize models:**
   - Define models for Users, Photos, Polls, Votes, and Comments.
   - Set up relationships between models.

3. **Implement controllers:**
   - Create controller functions for handling CRUD operations for each feature.
   - Ensure data validation and error handling.

#### Frontend (Handlebars.js):
1. **Set up views:**
   - Create Handlebars templates for each page (e.g., signup, login, profile, photo feed, poll results).
   - Use partials for reusable components (e.g., header, footer, photo card).

2. **Implement client-side logic:**
   - Use JavaScript to handle form submissions and dynamic updates (e.g., voting on polls, commenting).

3. **Style the application:**
   - Use a CSS framework like Bootstrap for responsive design.
   - Customize styles to create a cohesive and visually appealing UI.

### Project Management:
- **Assign roles and tasks:** Divide responsibilities among group members (e.g., backend development, frontend development, database design).
- **Use version control:** Use Git and a platform like GitHub for source control and collaboration.
- **Plan sprints:** Break down the project into sprints with specific goals and deadlines.
- **Regular meetings:** Schedule regular check-ins to discuss progress, address challenges, and adjust plans as needed.


This project has been deployed using Render.com: https://catapp-pde6.onrender.com

It is available in the following gitHub link: https://github.com/Kinshaw/CatApp and here for the version with the Render deploy variables: https://github.com/KimCBNS/CatApp

