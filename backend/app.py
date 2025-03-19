from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from models import db
from controllers import TaskResource, TaskListResource

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Initialize CORS
CORS(app)

# Initialize database and API
db.init_app(app)
api = Api(app)

# Create database tables
with app.app_context():
    print("Creating database tables...")
    db.create_all()
    print("Database tables created.")

# Define API routes
api.add_resource(TaskListResource, "/api/tasks")
api.add_resource(TaskResource, "/api/tasks/<int:task_id>")

if __name__ == "__main__":
    app.run(debug=True, port=5000)