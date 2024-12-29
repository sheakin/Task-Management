# Task Management Web Application

A user-friendly Task Management Web Application designed to help individuals and teams efficiently manage their tasks. Built with **React** for the frontend and **Django** for the backend, it features a RESTful API for seamless communication and supports all CRUD operations.

---

## Key Features

### Frontend (React)
- **Task Creation**: 
  - Add tasks with:
    - Title (required)
    - Description (optional)
    - Due Date (required)
    - Status: Choose between "Pending," "In Progress," or "Completed"
- **Task Management**:
  - View tasks in an organized table or card layout.
  - Edit and delete tasks with a simple UI.
  - Filter tasks by status for easier management.
- **Responsive Design**:
  - Fully responsive for seamless usage across devices.
- **Navigation**:
  - React Router enables smooth page transitions.

### Backend (Django)
- **Django REST Framework (DRF)**:
  - RESTful API for efficient frontend-backend communication.
- **Database**:
  - Default: SQLite (supports other databases).
  - Task entity schema:
    - `id`: Auto-generated primary key.
    - `title`: String, max length 100.
    - `description`: Optional text field.
    - `due_date`: Date.
    - `status`: Choice field ("Pending," "In Progress," "Completed").
- **API Endpoints**:
  - `POST /tasks/`: Create a new task.
  - `GET /tasks/`: Retrieve all tasks.
  - `GET /tasks/<id>/`: Retrieve a specific task.
  - `PUT /tasks/<id>/`: Update an existing task.
  - `DELETE /tasks/<id>/`: Delete a task.
- **Data Validation**:
  - Ensures proper data entry (e.g., valid due dates, mandatory fields).

---

## Installation and Setup

### Prerequisites
- **Frontend**:
  - [Node.js](https://nodejs.org) (version 14.x or higher)
- **Backend**:
  - [Python 3.x](https://www.python.org/)
  - [Pip](https://pip.pypa.io/)

### Steps
1. **Clone the repository**:
   ```bash
   git clone https://github.com/sheakin/Task-Management.git
   cd Task-Management

# Task-Management
