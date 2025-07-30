Fintech Dashboard API
A Node.js/Express/MongoDB application for managing user accounts, transactions, and profile media uploads.
File Upload Feature
The application supports secure file uploads for profile images and videos, accessible via /api/profile/upload-image and /api/profile/upload-video routes.
How It Works

Endpoints:
POST /api/profile/upload-image: Uploads an image (JPEG, JPG, PNG, GIF).
POST /api/profile/upload-video: Uploads a video (MP4, MOV).


Frontend: Use profile.html to upload files via a form, or test with Postman.
Storage: Files are saved to the uploads/ folder with unique filenames (e.g., 16987654321-abcdef.jpg).
Database: The User model stores file paths in profileImage and profileVideo fields.
Display: The dashboard (dashboard.html) displays the profile image if uploaded, or a placeholder message.

Security Checks

File Type Validation: Only allows images (JPEG, JPG, PNG, GIF) and videos (MP4, MOV). Scripts (.js) and executables (.exe) are explicitly blocked.
Size Limit: Maximum file size is 20MB.
Filename Safety: Files are renamed using a timestamp and random string (e.g., 16987654321-abcdef.jpg).
Folder Safety: The uploads/ folder is excluded from version control via .gitignore.
Authentication: Upload routes require a valid JWT token (via Authorization: Bearer <token>).

Testing with Postman

Login:
Send POST http://localhost:5000/api/auth/login:{
  "username": "testuser3",
  "password": "testpass"
}


Copy the token from the response.


Upload Image:
Send POST http://localhost:5000/api/profile/upload-image:
Headers: Authorization: Bearer <token>
Body: form-data, key file, select a JPEG/PNG/GIF
Expected: 200, {"message": "Image uploaded successfully", "profileImage": "/uploads/16987654321-abcdef.jpg"}




Upload Video:
Send POST http://localhost:5000/api/profile/upload-video:
Headers: Authorization: Bearer <token>
Body: form-data, key file, select an MP4/MOV
Expected: 200, {"message": "Video uploaded successfully", "profileVideo": "/uploads/16987654322-uvwxyz.mp4"}




Test Invalid File:
Send POST http://localhost:5000/api/profile/upload-image with a .pdf:
Expected: 400, {"message": "Only JPEG, JPG, PNG, and GIF files are allowed"}





Testing with Frontend

Open http://localhost:5000/login.html, log in with valid credentials.
Navigate to http://localhost:5000/profile.html.
Upload an image (JPEG/PNG/GIF) or video (MP4/MOV).
Visit http://localhost:5000/dashboard.html to verify the profile image display.

Setup

Clone the repository.
Install dependencies: npm install.
Create a .env file with:MONGO_URI=mongodb://localhost:27017/fintech-dashboard
JWT_SECRET=LUCKYKELIMU56


Create an uploads/ folder: mkdir uploads.
Start MongoDB: mongod.
Run the server: node server.js.
Access at http://localhost:5000.

API Endpoints

POST /api/auth/register: Register a user.
POST /api/auth/login: Log in and get JWT.
GET /api/dashboard: Fetch user dashboard data.
POST /api/transactions: Create a transaction.
POST /api/profile/upload-image: Upload profile image.
POST /api/profile/upload-video: Upload profile video.
