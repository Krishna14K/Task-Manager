document.addEventListener('DOMContentLoaded', () => {
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const tabs = document.querySelectorAll('.tab');
    const API_URL = 'http://localhost:5000/api/tasks';

    // Add Task
    addTaskBtn.addEventListener('click', async () => {
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const priority = document.getElementById('priority').value;
        const dueDate = document.getElementById('due-date').value;

        if (title.trim() === '') {
            alert('Please enter a task title');
            return;
        }

        const task = {
            title,
            description,
            priority,
            due_date: dueDate,
            completed: false
        };

        console.log('Sending task to back-end:', task);

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(task)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Task added successfully:', result);

            renderTasks('all');

            // Clear form
            document.getElementById('title').value = '';
            document.getElementById('description').value = '';
            document.getElementById('priority').value = 'Low';
            document.getElementById('due-date').value = '';
        } catch (error) {
            console.error('Error adding task:', error);
        }
    });

    // Tab Switching
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const filter = tab.getAttribute('data-tab');
            renderTasks(filter);
        });
    });

    // Render Tasks
    async function renderTasks(filter) {
        taskList.innerHTML = '';

        try {
            const response = await fetch(`${API_URL}?filter=${filter}`);
            const tasks = await response.json();

            if (tasks.length === 0) {
                taskList.innerHTML = '<p>No tasks found</p>';
                return;
            }

            tasks.forEach(task => {
                const taskItem = document.createElement('div');
                taskItem.classList.add('task-item');
                if (task.completed) {
                    taskItem.classList.add('completed');
                }

                taskItem.innerHTML = `
                    <div>
                        <h3>${task.title}</h3>
                        <p>${task.description || 'No description'}</p>
                        <p>Priority: ${task.priority}</p>
                        <p>Due: ${task.due_date || 'No due date'}</p>
                    </div>
                    <div>
                        <button class="complete">${task.completed ? 'Undo' : 'Complete'}</button>
                        <button class="delete">Delete</button>
                    </div>
                `;

                // Complete Task
                taskItem.querySelector('.complete').addEventListener('click', async () => {
                    try {
                        await fetch(`${API_URL}/${task.id}`, {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ ...task, completed: !task.completed })
                        });
                        renderTasks(filter);
                    } catch (error) {
                        console.error('Error updating task:', error);
                    }
                });

                // Delete Task
                taskItem.querySelector('.delete').addEventListener('click', async () => {
                    try {
                        await fetch(`${API_URL}/${task.id}`, {
                            method: 'DELETE'
                        });
                        renderTasks(filter);
                    } catch (error) {
                        console.error('Error deleting task:', error);
                    }
                });

                taskList.appendChild(taskItem);
            });
        } catch (error) {
            console.error('Error fetching tasks:', error);
            taskList.innerHTML = '<p>Error loading tasks</p>';
        }
    }

    // Initial render
    renderTasks('all');
});