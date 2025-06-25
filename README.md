
# Task Manager Web App

A simple task manager built using the MERN stack (React, Node, Express) with a PostgreSQL database via Prisma ORM. Users can sign up, log in, and manage their tasks across three statuses: To Do, In Progress, and Done.




## Features

- User signup and login

- Secure password hashing using bcrypt

- Create, read, update, and delete tasks

- Group tasks by status: To Do, In Progress, Done

- Edit task title and status

- Task deletion

- Protected routes and dashboard


## Tech Stack

**Frontend:** 


- React.js (Vite)

- Tailwind CSS

- Axios

- React Router

- React Hook Form


**Backend:** 

- Node.js + Express.js

- Prisma ORM

- PostgreSQL

- JWT Authentication

- Bcrypt for password hashing


## Installation

Clone the Repository

```bash
  https://github.com/zerotwoadarsh/Grapes.git
```
Backend Setup

```bash
  cd Server
  npm install
```

Run Migrations (Prisma)
```bash
  npx prisma generate
```

Start Backend Server
```bash
  npm run dev
```

Frontend Setup

```bash
  cd ../Client
  npm install
```

Start Frontend Server

```bash
  npm run dev
```
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT=5175`

`JWT_SECRET=your_secret_key`

`DATABASE_URL=YOUR_URL`

