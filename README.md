# Chatapps

A modern real-time chat application featuring a React-based frontend and a Node.js/Express/MongoDB backend with Socket.IO for live communication.

## Features

- **Real-time Messaging:** Instant chat updates using Socket.IO.
- **User Authentication:** Secure login and registration (JWT, bcrypt).
- **Responsive UI:** Built with React, Bootstrap, and Framer Motion.
- **Form Validation:** Using React Hook Form and Yup.
- **Group & Private Chats:** Support for 1:1 and group conversations.
- **Notifications:** Toast messages for user feedback.
- **State Management:** Redux Toolkit for predictable state.
- **Database:** MongoDB with Mongoose for data persistence.

## Tech Stack

### Frontend (client/)
- React 19
- React Router DOM 7
- Redux Toolkit
- Vite
- Bootstrap 5, Animate.css, Framer Motion
- Axios
- Socket.IO Client
- React Hook Form, Yup

### Backend (server/)
- Node.js
- Express 5
- MongoDB & Mongoose
- Socket.IO
- JWT Authentication
- Bcrypt for password hashing
- CORS, Dotenv for environment management

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- MongoDB running locally or remotely

### Setup

1. **Clone the repository**
    ```bash
    git clone https://github.com/sanjaysingh24/Chatapps.git
    cd Chatapps
    ```

2. **Install dependencies**

    - For the client:
      ```bash
      cd client
      npm install
      # or
      yarn install
      ```

    - For the server:
      ```bash
      cd ../server
      npm install
      # or
      yarn install
      ```

3. **Configure environment variables**

    - In `server/`, create a `.env` file:
      ```
      MONGO_URI=your_mongo_db_connection_string
      JWT_SECRET=your_secret_key
      PORT=5000
      ```

4. **Run the development servers**

    - Start the backend server:
      ```bash
      cd server
      npm start
      ```

    - Start the frontend:
      ```bash
      cd ../client
      npm run dev
      ```

5. **Visit the App**
    - Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
Chatapps/
  client/   # React frontend
  server/   # Node.js backend
```

## Scripts

- **Frontend**
  - `npm run dev` — Start Vite dev server
  - `npm run build` — Build production files
  - `npm run preview` — Preview production build
  - `npm run lint` — Lint code

- **Backend**
  - `npm start` — Start backend with nodemon

## License

ISC

---

> This README is auto-generated based on the detected project structure and dependencies.  
> For more details, explore the [repository on GitHub](https://github.com/sanjaysingh24/Chatapps).