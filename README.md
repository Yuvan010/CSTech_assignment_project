# CSTech_assignment_project

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup & Installation](#setup--installation)
- [Running the App](#running-the-app)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Demo](#demo)
- [Troubleshooting](#troubleshooting)

## Project Overview
This project implements a basic admin panel where you can:
- Register/login as admin
- Add/manage agents
- Upload a CSV and distribute its items to agents fairly
- View lists per agent

## Features
- User Signup & Login (JWT authentication)
- Agent creation & management
- CSV upload & validation
- Distribution of items to agents
- Clean UI using React and custom CSS

## Tech Stack
- **Frontend:** React.js, Axios, CSS
- **Backend:** Node.js, Express.js, MongoDB (Mongoose)
- **Authentication:** JWT
- **File Upload:** Multer

## Setup & Installation

### 1. Clone the Repo

git clone https://github.com/Yuvan010/CSTech_assignment_project.git
cd CSTech_assignment_project

text

### 2. Backend Setup
cd backend
npm install
python -m pip install "pymongo[srv]"

text
Create a `.env` file in backend:
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>

text
Start the backend server:
npm start

text
or
node app.js

text

### 3. Frontend Setup
cd ../frontend
npm install
npm install axios react-router-dom

text
Create a `.env` file in frontend:
REACT_APP_API_URL=http://localhost:5000/api

text
Start the frontend server:
npm start

text

## Running the App

- **Backend** runs at: `http://localhost:5000`
- **Frontend** runs at: `http://localhost:3000`
- Access frontend from your browser: `http://localhost:3000`

## Usage

- **Signup:** Register a new admin account (`/signup`)
- **Login:** Log in as admin (`/login`)
- **Agent Management:** Add agents by providing name, email, mobile, password
- **CSV Upload & Distribution:** Upload a CSV in required format and tasks will be divided among agents
- **View Distributed Lists:** Lists assigned to each agent are displayed on dashboard

## Project Structure

<h2>📁 Project Structure</h2>

<pre>
CSTech_assignment_project/
├── backend/
│   ├── models/
│   │   ├── Agent.js
│   │   ├── User.js
│   │   └── DistributedList.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── agents.js
│   │   └── lists.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── controllers/
│   ├── .env
│   ├── app.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── LoginForm.js
│   │   │   ├── AgentForm.js
│   │   │   ├── CsvUpload.js
│   │   │   └── AgentList.js
│   │   ├── pages/
│   │   │   ├── Dashboard.js
│   │   │   ├── Login.js
│   │   │   ├── Home.js
│   │   │   └── Signup.js
│   │   └── App.js
│   ├── .env
│   └── package.json
</pre>



## Demo

Link to Google Drive demo video:  
[https://drive.google.com/file/d/1mmeI0oyomvWDsWxhoEXsZVNdWTwOy2XY/view?usp=drive_link](https://drive.google.com/file/d/1mmeI0oyomvWDsWxhoEXsZVNdWTwOy2XY/view?usp=drive_link)

## Troubleshooting
- **Port conflicts:** Change backend/frontend port in config if needed.
- **MongoDB connection errors:** Verify `MONGO_URI` string in `.env`.
- **CORS errors:** Ensure CORS is enabled in backend (`app.use(cors())`).
- **.env changes:** Restart server after edits.
- **404 on signup/login:** Double-check API URLs and backend route setup.
- **Dependencies:** Run `npm install` in both frontend and backend folders.
