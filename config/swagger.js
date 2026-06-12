const swaggerSpec = {
  openapi: "3.0.3",
  info: {
    title: "Personal Blogging Platform API",
    version: "1.0.0",
    description: "API documentation for the Personal Blogging Platform project.",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Local development server",
    },
  ],
  tags: [
    {
      name: "Auth",
      description: "Authentication endpoints",
    },
    {
      name: "Posts",
      description: "Blog post endpoints",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      RegisterRequest: {
        type: "object",
        required: ["username", "email", "password"],
        properties: {
          username: {
            type: "string",
            example: "testuser",
          },
          email: {
            type: "string",
            format: "email",
            example: "testuser@example.com",
          },
          password: {
            type: "string",
            example: "Password123!",
          },
        },
      },
      LoginRequest: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: {
            type: "string",
            format: "email",
            example: "testuser@example.com",
          },
          password: {
            type: "string",
            example: "Password123!",
          },
        },
      },
      PostRequest: {
        type: "object",
        required: ["title", "content"],
        properties: {
          title: {
            type: "string",
            example: "My First Post",
          },
          content: {
            type: "string",
            example: "This is my first post content.",
          },
        },
      },
      User: {
        type: "object",
        properties: {
          _id: { type: "string", example: "665f1a2b3c4d5e6f78901234" },
          username: { type: "string", example: "testuser" },
          email: { type: "string", example: "testuser@example.com" },
          posts: {
            type: "array",
            items: { type: "string" },
          },
        },
      },
      Post: {
        type: "object",
        properties: {
          _id: { type: "string", example: "665f1a2b3c4d5e6f78901234" },
          title: { type: "string", example: "My First Post" },
          content: { type: "string", example: "This is my first post content." },
          authorID: { type: "string", example: "665f1a2b3c4d5e6f78905678" },
        },
      },
    },
  },
  paths: {
    "/auth/register": {
      post: {
        tags: ["Auth"],
        summary: "Register a new user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/RegisterRequest" },
            },
          },
        },
        responses: {
          201: {
            description: "User created successfully",
          },
          409: {
            description: "Email already exists",
          },
          400: {
            description: "Validation failed",
          },
        },
      },
    },
    "/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Login a user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/LoginRequest" },
            },
          },
        },
        responses: {
          200: {
            description: "Login successful",
          },
          401: {
            description: "Invalid email or password",
          },
          400: {
            description: "Validation failed",
          },
        },
      },
    },
    "/posts": {
      get: {
        tags: ["Posts"],
        summary: "Get all posts",
        responses: {
          200: {
            description: "Posts retrieved successfully",
          },
        },
      },
      post: {
        tags: ["Posts"],
        summary: "Create a post",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/PostRequest" },
            },
          },
        },
        responses: {
          201: {
            description: "Post created successfully",
          },
          401: {
            description: "Authorization token is required",
          },
          400: {
            description: "Validation failed",
          },
        },
      },
    },
    "/posts/{id}": {
      put: {
        tags: ["Posts"],
        summary: "Update a post",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/PostRequest" },
            },
          },
        },
        responses: {
          200: {
            description: "Post updated successfully",
          },
          401: {
            description: "Authorization token is required",
          },
          403: {
            description: "You are not allowed to modify this post",
          },
          400: {
            description: "Validation failed",
          },
        },
      },
      delete: {
        tags: ["Posts"],
        summary: "Delete a post",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: {
            description: "Post deleted successfully",
          },
          401: {
            description: "Authorization token is required",
          },
          403: {
            description: "You are not allowed to modify this post",
          },
          400: {
            description: "Validation failed",
          },
        },
      },
    },
  },
};

module.exports = swaggerSpec;