# Task Management System

The Task Management System is a full-stack web application designed to help individuals or teams create, track, and manage tasks efficiently. It integrates a modern front-end with a robust back-end, using RESTful APIs to handle task operations and a SQLite database for persistent storage. The project follows modern design patterns like MVC (Model-View-Controller) and is structured with a microservices-inspired architecture (simulated with a single service for task management).

## Features
- **Task Creation**: Add tasks with a title, description, priority, due date, and completion status.
- **Task Filtering**: View tasks by status (All, Active, Completed) using tabs.
- **Task Management**: Update task status (mark as complete/undo) and delete tasks.
- **Persistent Storage**: Tasks are stored in a SQLite database (`database.db`).
- **RESTful API**: The back-end provides a RESTful API for CRUD operations (Create, Read, Update, Delete).
- **Modern Design Patterns**: Uses MVC pattern for the back-end (Model for database, View for API responses, Controller for request handling).
- **Responsive UI**: Clean and user-friendly interface with a modern design.

## Tech Stack
- **Front-End**:
  - HTML5
  - CSS3
  - JavaScript (ES6+)
- **Back-End**:
  - Python 3.8+
  - Flask (web framework)
  - Flask-RESTful (for RESTful APIs)
  - Flask-SQLAlchemy (for database ORM)
  - Flask-CORS (for handling CORS)
- **Database**:
  - SQLite (lightweight database for development)
- **Architecture**:
  - Microservices-inspired (single service for task management)
  - MVC design pattern

## Project Structure
```
task-manager/
│
├── frontend/
│   ├── index.html        # Front-end HTML
│   ├── styles.css        # Front-end CSS
│   └── script.js         # Front-end JavaScript (handles API calls)
│
├── backend/
│   ├── app.py            # Flask application (main entry point)
│   ├── models.py         # Database models (MVC: Model)
│   ├── controllers.py    # API logic (MVC: Controller)
│   ├── database.db       # SQLite database (auto-generated)
│   └── requirements.txt  # Python dependencies
│
└── README.md             # Project documentation
```

## Prerequisites
Before running the project, ensure you have the following installed:
- **Python 3.8+**: For the back-end.
- **pip**: Python package manager (comes with Python).
- **A web browser**: To access the front-end (e.g., Chrome, Firefox).
- **Optional**: A SQLite viewer (e.g., DB Browser for SQLite) to inspect the database.

## Setup Instructions

### 1. Clone the Repository
If the project is hosted on a version control system like GitHub, clone it to your local machine:
```bash
git clone <repository-url>
cd task-manager
```
Alternatively, if you're creating the project from scratch, ensure the directory structure matches the one above and copy the code files provided.

### 2. Set Up the Back-End
The back-end is a Flask application that handles API requests and stores data in a SQLite database.

#### a. Navigate to the `backend` Directory
```bash
cd backend
```

#### b. Create a Virtual Environment
Create a virtual environment to isolate dependencies:
```bash
python -m venv venv
```

Activate the virtual environment:
- **On Linux/Mac**:
  ```bash
  source venv/bin/activate
  ```
- **On Windows**:
  ```bash
  venv\Scripts\activate
  ```

#### c. Install Dependencies
Install the required Python packages listed in `requirements.txt`:
```bash
pip install -r requirements.txt
```

**requirements.txt** (ensure this file exists in the `backend` directory):
```
Flask==2.3.2
Flask-SQLAlchemy==3.0.5
Flask-RESTful==0.3.10
Flask-CORS==4.0.1
```

#### d. Run the Back-End
Start the Flask server:
```bash
python app.py
```

- The back-end will run on `http://localhost:5000`.
- You should see logs indicating the database is initialized:
  ```
  Creating database tables...
  Database tables created successfully.
  Task table exists with 0 entries.
  ```
- A `database.db` file will be created in the `backend` directory to store tasks.

### 3. Set Up the Front-End
The front-end is a static web application that communicates with the back-end via API calls.

#### a. Navigate to the `frontend` Directory
```bash
cd ../frontend
```

#### b. Serve the Front-End
Use Python’s built-in HTTP server to serve the front-end files:
```bash
python -m http.server 8000
```

- The front-end will be accessible at `http://localhost:8000`.
- Open this URL in your web browser to access the Task Management System.

### 4. Test the Application
- **Add a Task**:
  - Fill in the form (e.g., Title: "Test Task", Description: "This is a test", Priority: "High", Due Date: "2025-03-20").
  - Click "Add Task."
  - The task should appear in the task list below the form.
- **Filter Tasks**:
  - Use the tabs (All, Active, Completed) to filter tasks.
- **Manage Tasks**:
  - Click "Complete" to mark a task as completed (or "Undo" to revert).
  - Click "Delete" to remove a task.
- **Check the Database**:
  - Open `backend/database.db` with a SQLite viewer to confirm tasks are being saved.

## API Endpoints
The back-end provides the following RESTful API endpoints:

| Method | Endpoint                     | Description                          | Request Body (for POST/PUT)                     |
|--------|------------------------------|--------------------------------------|------------------------------------------------|
| GET    | `/api/tasks?filter=<type>`   | Get tasks (filter: `all`, `active`, `completed`) | N/A                                            |
| POST   | `/api/tasks`                 | Create a new task                    | `{"title": "string", "description": "string", "priority": "string", "due_date": "string", "completed": boolean}` |
| GET    | `/api/tasks/<task_id>`       | Get a specific task by ID            | N/A                                            |
| PUT    | `/api/tasks/<task_id>`       | Update a task by ID                  | Same as POST                                   |
| DELETE | `/api/tasks/<task_id>`       | Delete a task by ID                  | N/A                                            |

### Example API Request
**Create a Task**:
```bash
curl -X POST http://localhost:5000/api/tasks \
-H "Content-Type: application/json" \
-d '{"title": "Test Task", "description": "This is a test", "priority": "High", "due_date": "2025-03-20", "completed": false}'
```

**Response**:
```json
{
    "id": 1,
    "title": "Test Task",
    "description": "This is a test",
    "priority": "High",
    "due_date": "2025-03-20",
    "completed": false
}
```

## Troubleshooting
If you encounter issues while running the project, here are some common problems and solutions:

### 1. Tasks Not Saving to Database
- **Symptoms**: Tasks are added in the UI but not saved to `database.db`.
- **Solution**:
  - Check the Flask terminal for logs (e.g., "Task successfully committed to database").
  - Ensure the `backend` directory has write permissions:
    ```bash
    chmod 775 backend
    ```
  - Open `database.db` with a SQLite viewer and confirm the `task` table exists.
  - Delete `database.db` and restart the Flask server to recreate the database.

### 2. CORS Errors
- **Symptoms**: Browser console shows CORS errors (e.g., "Access-Control-Allow-Origin").
- **Solution**:
  - Ensure `Flask-CORS` is installed and enabled in `app.py`:
    ```python
    CORS(app)
    ```
  - Restart the Flask server after making changes.

### 3. API Request Fails
- **Symptoms**: Browser console shows errors like "HTTP error! Status: 500".
- **Solution**:
  - Check the Flask terminal for error logs (e.g., "Error committing task to database").
  - Ensure the front-end sends data in the correct format (e.g., `due_date` instead of `dueDate`).
  - Test the API directly using `curl` or Postman (see "API Endpoints" section).

### 4. Database Not Created
- **Symptoms**: `database.db` file is not created in the `backend` directory.
- **Solution**:
  - Ensure the `SQLALCHEMY_DATABASE_URI` in `app.py` is correct (`sqlite:///database.db`).
  - Check for errors during database initialization in the Flask terminal.
  - Verify write permissions for the `backend` directory.

## Additional Features to Implement
Here are some ideas to extend the project:
1. **User Authentication**:
   - Add a login system using JWT (JSON Web Tokens) to secure the API.
   - Store user information in a separate `users` table.
2. **Notifications**:
   - Integrate a notification service to send email reminders for due dates.
   - Use a message broker like RabbitMQ for asynchronous notifications.
3. **Task Categories**:
   - Allow users to categorize tasks (e.g., Work, Personal).
   - Add a `category` field to the `Task` model.
4. **Search and Sort**:
   - Add search functionality to filter tasks by title or description.
   - Allow sorting tasks by priority or due date.
5. **Microservices**:
   - Split the back-end into multiple services (e.g., task management, user authentication, notifications).
   - Use Docker and Kubernetes for deployment.
6. **Deployment**:
   - Deploy the app to a cloud provider like AWS, Heroku, or Vercel.
   - Use a production-ready database like PostgreSQL instead of SQLite.

## Known Limitations
- **Database**: SQLite is used for simplicity but may not be suitable for production due to concurrency limitations. Consider switching to PostgreSQL or MySQL for a production environment.
- **Security**: The current implementation lacks user authentication and input validation. Add these features to prevent unauthorized access and ensure data integrity.
- **Scalability**: The project simulates a microservices architecture with a single service. For a true microservices setup, additional services and orchestration tools are needed.

## Contributing
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add your feature description"
   ```
4. Push your changes to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Create a pull request with a detailed description of your changes.

## License
This project is licensed under the MIT License. See the `LICENSE` file for details (if applicable).

## Acknowledgments
- Built with ❤️ by Krishna Kant Singh.
- Inspired by modern task management tools like Todoist and Trello.
- Thanks to the Flask and JavaScript communities for their amazing tools and documentation.
