# ChatSphere

**ChatSphere** is a robust, real-time chat application backend designed to facilitate seamless communication. Built with Node.js and TypeScript, it leverages Socket.io for real-time messaging, Kafka for reliable message brokering, and Postgres for efficient message storage and retrieval. This project is perfect for developers looking to understand or build scalable chat applications with modern technologies.

## Features
- **Real-Time Messaging:** Powered by Socket.io for instant message delivery.
- **Scalable Architecture:** Utilizes Kafka for distributed message brokering, ensuring data integrity and fault tolerance.
- **Efficient Data Storage:** Messages are stored and queried using Postgres, providing reliability and performance.
- **TypeScript:** Strongly-typed codebase for better maintainability and developer experience.
- **RESTful APIs:** A set of well-documented APIs for user management, message history, and more.

## Technologies Used

- **Node.js:** Runtime environment for building the backend.
- **TypeScript:** Adds static typing to JavaScript for enhanced code quality.
- **Socket.io:** Enables real-time, bidirectional communication.
- **Kafka:** Distributed event streaming platform for message brokering.
- **Express.js:** Web framework for building RESTful APIs.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v16 or higher)
- npm or yarn
- Docker (for Kafka and Postgres)
- PostgreSQL (if not using Docker)
- Kafka (if not using Docker)

### Installation
1. **Clone the Repository:**
```
  git clone https://github.com/your-username/ChatSphere.git
  cd ChatSphere
```

2. **Install Dependencies:**
```
  npm install
```

3. **Set Up Environment Variables:**

Create a `.env` file in the root directory and add the following:
```
  PORT=3000
  DATABASE_URL=postgresql://postgres:mypassword@localhost:5432/ChatSphere
  JWT_SECRET=
  KAFKA_BROKER=
  KAFKA_USERNAME=
  KAFKA_PASSWORD=
  KAFKA_TOPIC=
```

4. **Check Kafka and Postgres are running using Docker:**
```
  docker ps 
```

5. **Start the Server:**
```
  npm run dev
```

6. **Access the Application:**

The server will be running at `http://localhost:3000`.

## API Documentation

Explore the APIs using the following endpoints:

### Base URL - 
  ```
  http://localhost:3000/api
  ```
#### Login/Register a User -
- Endpoint: `POST /auth/login`
- Request Body:
  ```
  {
      "name": "abc",
      "email": "abc@gmail.com",
      "oauth_id": "",
      "provider": ""
  }
  ```

#### Create Chat Group -
- Endpoint: `POST /chat-group`
- Request Body:
  ```
  {
      "title": "Testing",
      "passcode": "1212",
      "user_id": "1"
  }
  ```

#### Update Chat Group -
- Endpoint: `POST /chat-group/:groupId`
- Request Body:
  ```
  {
      "title": "Testing",
      "passcode": "111"
  }
  ```

#### Create User in Chat Group -
- Endpoint: `POST /chat-group-user`
- Request Body:
  ```
  {
      "name": "abc",
      "group_id": "18e2da3c-2985-4b95-bdd9-1413f960590d"
  }
  ```

## Endpoints

| HTTP Verbs | Endpoints                         | Action                       |
| ---------- | --------------------------------- | ---------------------------- |
| POST       | /api/auth/login                   | To register/login a new user |
| POST       | /api/chat-group                   | To create chat group         |
| GET        | /api/chat-group-user?group_id=:id | To get user from chat group  |
| GET        | /api/chats/:id                    | User Chats                   |
| PUT        | /api/chat-group/:groupId          | Update chat group            |
| GET        | /api/chat-group                   | Get chat groups              |
| GET        | /api/chat-group/:groupId          | Show chat group              |
| DELETE     | /api/chat-group/:groupId          | Get chat groups              |