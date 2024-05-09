# Image Store Server

This is a simple image store server that allows you to upload images and retrieve them.

## Hosting

- The backend in hosted on [Render](https://render.com) and the frontend is hosted on [Vercel](https://vercel.com/).
- Hosted Backend URL: [https://image-store-assignment.onrender.com](https://image-store-assignment.onrender.com)
- Hosted Frontend URL: [image-store-assignment.vercel.app](image-store-assignment.vercel.app)

## Installation

1. Clone the repository

### For Frontend
2. Navigate to the frontend directory
3. Run `npm install`
4. Run `npm run dev`

### For Backend
5. Navigate to the backend directory
6. Run `npm install`
7. Run `npm run dev`

## Environment Variables

### For Backend
- `PORT` - The port on which the server will run
- `MONGO_URI` - The URI of the MongoDB database
- `JWT_SECRET` - The secret key for JWT
- `CLOUDINARY_API_KEY` - The API key for Cloudinary
- `CLOUDINARY_API_SECRET` - The API secret for Cloudinary
- `CLOUDINARY_CLOUD_NAME` - The cloud name for Cloudinary

### For Frontend
- `VITE_API_URL` - The URL of the backend server

## Usage

1. Register a new user
2. Login with the registered user
3. Upload Images
4. View the uploaded images
5. Search for an image
6. Logout