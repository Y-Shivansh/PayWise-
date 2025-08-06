# PayWise - Payment Web Application

**PayWise** is a full-stack web application that enables users to securely make payments and manage their balances. This project was built to enhance my skills in full-stack development using modern technologies.

---

## Technologies Used

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js, JWT
- **Database**: MongoDB
- **API Testing**: Postman

---

## Features

- **User Authentication**: Secure login and registration using JWT tokens.
- **Payments**: Users can make payments to other users.
- **Balance Management**: Users can view and manage their payment balance.
- **Secure API**: The backend is built using **Node.js** and **Express.js**, with routes protected by JWT for secure access.
- **API Testing**: All API endpoints are tested using **Postman** to ensure functionality.

---

## Installation

### Prerequisites
Make sure you have the following installed on your machine:
- **Node.js** (v12 or higher)
- **MongoDB** (or a MongoDB cluster URL if using a cloud service)

### Steps to Run Locally:

1. Clone this repository:

    ```bash
    git clone https://github.com/Y-Shivansh/PayWise.git
    cd PayWise
    ```

2. Install **backend** dependencies:

    ```bash
    cd backend
    npm install
    ```

3. Set up **MongoDB** connection. Create a `.env` file in the `backend` folder and add your MongoDB URL and JWT secret:

    ```env
    MONGODB_URL=<your_mongo_connection_string>
    JWT_SECRET=<your_jwt_secret>
    ```

4. Start the **backend server**:

    ```bash
    npm start
    ```

5. Install **frontend** dependencies:

    ```bash
    cd frontend
    npm install
    ```

6. Start the **frontend**:

    ```bash
    npm start
    ```

Now, open your browser and go to `http://localhost:3000` to see the application in action.

---

## API Documentation

The following endpoints are available for interacting with the backend API:

- **POST /signin**: User login (returns JWT token)
  - Request body: `{ email, password }`
  - Response: `{ message, token, user }`

- **POST /register**: User registration
  - Request body: `{ firstName, lastName, email, password }`
  - Response: `{ message }`

- **GET /balance**: Get the current balance of the logged-in user
  - Headers: `{ Authorization: 'Bearer <JWT_TOKEN>' }`
  - Response: `{ balance }`

- **POST /payment**: Make a payment to another user
  - Request body: `{ receiverEmail, amount }`
  - Response: `{ message, balance }`

---

## Usage

Once the application is up and running, users can:

1. Register a new account.
2. Log in using their credentials.
3. View their account balance.
4. Make payments to other users.

---

## Contributing

This project is a solo effort, but if you'd like to contribute or suggest improvements, feel free to fork this repository and create a pull request. 

---

**Author**: Shivansh Sharma

**GitHub**: https://github.com/Y-Shivansh

