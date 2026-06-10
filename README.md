# WanderVista - Tourism Booking System

A complete, responsive web application designed to help users discover and book their dream vacations. Built with a modern tech stack, this application allows users to explore various global destinations, choose specific tour packages, and securely book their travel.

## Key Features
- **Interactive Frontend:** Built with Angular for a fast, seamless single-page application experience.
- **Backend API:** Powered by Node.js and Express to handle user requests securely.
- **Database Integration:** Utilizes MongoDB (via Mongoose) to persistently store user accounts, destination details, and booking information.
- **User Authentication:** Secure user registration and login functionality.
- **Booking Flow:** End-to-end booking process calculating total costs based on travel group size and selected tour packages.

## Tech Stack
- **Frontend:** Angular, TypeScript, HTML/CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** bcryptjs for password hashing

## Prerequisites
Before you begin, ensure you have met the following requirements:
- You have installed [Node.js](https://nodejs.org/) and npm.
- You have a running instance of [MongoDB](https://www.mongodb.com/) (locally on port `27017` or via MongoDB Atlas).
- You have installed the Angular CLI globally (`npm install -g @angular/cli`).

## Setup Instructions

**1. Clone the repository:**
```bash
git clone https://github.com/HariniGS-0307/TourismBooking.git
cd TourismBooking
```

**2. Install Frontend Dependencies:**
```bash
npm install
```

**3. Install Backend Dependencies:**
```bash
cd server
npm install
cd ..
```

**4. Seed the Database (One-time setup):**
Populate your MongoDB database with the initial destinations:
```bash
node server/seed.js
```

## Running the Application

To run the application, you need to start both the backend server and the frontend development server.

**1. Start the Backend Server:**
Open a terminal in the root directory and run:
```bash
node server/server.js
```
The backend API will run on `http://localhost:3000`.

**2. Start the Frontend Server:**
Open a new terminal window in the root directory and run:
```bash
npm start
```
Navigate to `http://localhost:4200/` in your browser. The app will automatically reload if you change any of the source files.
