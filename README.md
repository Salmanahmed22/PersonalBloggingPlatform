# Personal Blogging Platform API

Simple Express + MongoDB API for user authentication and blog posts.

## Features

- Register and login users
- JWT-based auth for protected routes
- Create, update, delete, and list posts
- Request validation with `express-validator`

## Requirements

- Node.js
- MongoDB

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env` file in the project root with:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=3000
```

`PORT` is optional. If it is not set, the server uses `3000`.

## Run the Server

```bash
node index.js
```

To run in debug mode:

```bash
node --inspect index.js
```

## API Endpoints

Base URL: `http://localhost:3000`

### Auth

- `POST /auth/register`
- `POST /auth/login`

Example register body:

```json
{
  "username": "testuser",
  "email": "testuser@example.com",
  "password": "Password123!"
}
```

Example login body:

```json
{
  "email": "testuser@example.com",
  "password": "Password123!"
}
```

### Posts

- `GET /posts` - public
- `POST /posts` - protected, requires `Authorization: Bearer <token>`
- `PUT /posts/:id` - protected, requires ownership
- `DELETE /posts/:id` - protected, requires ownership

Example create/update body:

```json
{
  "title": "My First Post",
  "content": "This is my first post content."
}
```

## Postman Collection

Import [PersonalBloggingPlatform.postman_collection.json](PersonalBloggingPlatform.postman_collection.json) into Postman to test all endpoints quickly.

## Response Notes

- Passwords are hashed before saving.
- User responses are sanitized to exclude password and `__v`.
- Auth failures and validation failures are handled by the global error middleware.

## Project Structure

- `config/` - database connection
- `controllers/` - request handlers
- `Errors/` - custom error classes
- `middlewares/` - auth, validation, and error handling
- `models/` - Mongoose schemas
- `repos/` - database access layer
- `routers/` - Express routes
- `services/` - business logic
- `validations/` - request validation rules
