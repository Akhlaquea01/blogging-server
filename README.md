# Blog API with Node.js, Express, TypeScript, and MongoDB

A production-ready blog API with authentication, file uploads, and API documentation.

## Features

- TypeScript support
- MongoDB with Mongoose
- JWT Authentication
- File uploads with Cloudinary
- Swagger API documentation
- CORS and security headers
- Error handling
- Hot reloading with nodemon

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Cloudinary account (for file uploads)

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/blog-db
   JWT_SECRET=your-super-secret-jwt-key
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   ```

4. Create the uploads directory:
   ```bash
   mkdir uploads
   ```

## Development

Run the development server with hot reloading:
```bash
npm run dev
```

## Production

Build and run for production:
```bash
npm run build
npm start
```

## API Documentation

Access the Swagger documentation at:
```
http://localhost:5000/api-docs
```

## API Endpoints

### Authentication
- POST `/api/admin/register` - Register a new admin
- POST `/api/admin/login` - Login admin
- GET `/api/admin/profile` - Get admin profile (protected)

### Posts
- GET `/api/posts` - Get all posts
- POST `/api/posts` - Create a new post

### File Uploads
- POST `/api/upload` - Upload a file (protected)

## Project Structure

```
src/
├── config/         # Configuration files
├── controllers/    # Route controllers
├── middlewares/    # Custom middlewares
├── models/         # Mongoose models
├── routes/         # API routes
├── types/          # TypeScript type definitions
└── server.ts       # Application entry point
```

## Error Handling

The API uses a consistent error response format:
```json
{
  "success": false,
  "message": "Error message",
  "data": null
}
```

## Security

- JWT authentication
- Password hashing with bcrypt
- CORS enabled
- Helmet security headers
- Environment variables for sensitive data

## License

MIT 