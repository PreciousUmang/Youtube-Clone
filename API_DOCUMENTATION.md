# API Documentation

## Base URL
`http://localhost:5000/api`

## Authentication
- Use JWT for authentication. Include the token in the `Authorization` header as `Bearer <token>` for protected routes.

## Endpoints

### User Authentication
- **POST /api/auth/signup**
  - Register a new user.
  - **Request Body**: 
    ```json
    {
      "username": "Precious",
      "email": "Precious@Umang.com",
      "password": "password123"
    }
    ```
  - **Response**: 
    ```json
    {
      "message": "User registered successfully."
    }
    ```

- **POST /api/auth/login**
  - Log in an existing user.
  - **Request Body**: 
    ```json
    {
      "email": "Umang@example.com",
      "password": "password123"
    }
    ```
  - **Response**: 
    ```json
    {
      "token": "You will get JWT Token here"
    }
    ```

### Channel Management
- **POST /api/channels**
  - Create a new channel.
  - **Request Body**: 
    ```json
    {
      "channelName": "Code with John",
      "description": "Coding tutorials and tech reviews."
    }
    ```
  - **Response**: 
    ```json
    {
      "message": "Channel created successfully."
    }
    ```

- **GET /api/channels/:id**
  - Get channel details.
  - **Response**: 
    ```json
    {
      "channelId": "channel01",
      "channelName": "Code with John",
      "description": "Coding tutorials and tech reviews.",
      "videos": ["video01", "video02"]
    }
    ```

### Video Management
- **POST /api/videos**
  - Upload a new video.
  - **Request Body**: 
    ```json
    {
      "title": "Learn React in 30 Minutes",
      "thumbnailUrl": "https://example.com/thumbnails/react30min.png",
      "description": "A quick tutorial to get started with React.",
      "channelId": "channel01"
    }
    ```
  - **Response**: 
    ```json
    {
      "message": "Video uploaded successfully."
    }
    ```

- **GET /api/videos**
  - Get all videos.
  - **Response**: 
    ```json
    [
      {
        "videoId": "video01",
        "title": "Learn React in 30 Minutes",
        "thumbnailUrl": "https://example.com/thumbnails/react30min.png",
        "views": 15200
      },

    ]
    ```

- **GET /api/videos/:id**
  - Get video details.
  - **Response**: 
    ```json
    {
      "videoId": "video01",
      "title": "Learn React in 30 Minutes",
      "description": "A quick tutorial to get started with React.",
      "comments": [
      ]
    }
    ```

- **PUT /api/videos/:id**
  - Update a video.
  - **Request Body**: 
    ```json
    {
      "title": "Updated Title",
      "description": "Updated description."
    }
    ```
  - **Response**: 
    ```json
    {
      "message": "Video updated successfully."
    }
    ```

- **DELETE /api/videos/:id**
  - Delete a video.
  - **Response**: 
    ```json
    {
      "message": "Video deleted successfully."
    }
    ```

### Comments
- **POST /api/videos/:id/comments**
  - Add a comment to a video.
  - **Request Body**: 
    ```json
    {
      "userId": "user02",
      "text": "Great video!"
    }
    ```
  - **Response**: 
    ```json
    {
      "message": "Comment added successfully."
    }
    ```

- **GET /api/videos/:id/comments**
  - Get comments for a video.
  - **Response**: 
    ```json
    [
      {
        "commentId": "comment01",
        "userId": "user02",
        "text": "Great video!",
        "timestamp": "2024-09-21T08:30:00Z"
      },
    ]
    ```
