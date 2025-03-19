from flask_restful import Resource, reqparse
from models import Task, db

# Parser for task data
task_parser = reqparse.RequestParser()
task_parser.add_argument("title", type=str, required=True, help="Title is required")
task_parser.add_argument("description", type=str)
task_parser.add_argument("priority", type=str, default="Low")
task_parser.add_argument("due_date", type=str)
task_parser.add_argument("completed", type=bool, default=False)

class TaskResource(Resource):
    def get(self, task_id):
        task = Task.query.get_or_404(task_id)
        return task.to_dict(), 200

    def put(self, task_id):
        task = Task.query.get_or_404(task_id)
        args = task_parser.parse_args()
        task.title = args["title"]
        task.description = args["description"]
        task.priority = args["priority"]
        task.due_date = args["due_date"]
        task.completed = args["completed"]
        db.session.commit()
        return task.to_dict(), 200

    def delete(self, task_id):
        task = Task.query.get_or_404(task_id)
        db.session.delete(task)
        db.session.commit()
        return {"message": "Task deleted"}, 200

class TaskListResource(Resource):
    def get(self):
        filter_type = reqparse.request.args.get("filter", "all")
        if filter_type == "active":
            tasks = Task.query.filter_by(completed=False).all()
        elif filter_type == "completed":
            tasks = Task.query.filter_by(completed=True).all()
        else:
            tasks = Task.query.all()
        return [task.to_dict() for task in tasks], 200

    def post(self):
        args = task_parser.parse_args()
        print("Received POST request with data:", args)

        task = Task(
            title=args["title"],
            description=args["description"],
            priority=args["priority"],
            due_date=args["due_date"],
            completed=args["completed"]
        )
        print("Created task object:", task.to_dict())

        try:
            db.session.add(task)
            db.session.commit()
            print("Task saved to database:", task.to_dict())
        except Exception as e:
            db.session.rollback()
            print("Error saving task to database:", str(e))
            return {"error": "Failed to save task"}, 500

        return task.to_dict(), 201