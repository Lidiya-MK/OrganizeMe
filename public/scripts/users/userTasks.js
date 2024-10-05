
function getUserId() {
    const urlParts = window.location.pathname.split('/');
    return urlParts[urlParts.length - 1]; 
}

function getAuthToken() {
    return localStorage.getItem('authToken'); 
}


async function fetchTasks(day) {
    const userId = getUserId();
    const response = await fetch(`http://localhost:5000/organize/users/tasks/${userId}?day=${day}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${getAuthToken()}`, 
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        const tasks = await response.json();
        displayTasks(tasks);
    } else {
        console.error('Failed to fetch tasks');
    }
}


function displayTasks(tasks) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; 

    tasks.forEach(task => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        listItem.id = task._id; 


        const labelStyle = task.isDone ? 'line-through' : 'none';

        listItem.innerHTML = `
            <input type="checkbox" class="form-check-input me-2" id="${task._id}" ${task.isDone ? 'checked' : ''}>
            <label for="${task._id}" style="text-decoration: ${labelStyle};">${task.title}</label>
            <div class="action-icons">
                <i class="fas fa-edit" onclick="editTask('${task._id}')"></i>
                <i class="fas fa-trash" onclick="deleteTask('${task._id}')"></i>
                <i class="fas fa-star" style="color: ${task.isImportant ? 'gold' : 'gray'};" onclick="toggleImportant('${task._id}', ${task.isImportant})"></i>
            </div>
        `;
        taskList.appendChild(listItem);
    });

    initTaskActions();
}


async function addTask() {
    const taskInput = document.getElementById('newTaskInput');
    const title = taskInput.value.trim();
    const day = document.getElementById('currentDay').textContent.trim();

    if (!title) return;

    const userId = getUserId();
    const response = await fetch(`http://localhost:5000/organize/users/tasks`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${getAuthToken()}`, 
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title,
            day: day,
            owner: userId
        })
    });

    if (response.ok) {
        taskInput.value = '';
        fetchTasks(day); 
    } else {
        console.error('Failed to add task');
    }
}


async function deleteTask(taskId) {
    const confirmation = confirm("Are you sure you want to delete this task?"); 
    if (!confirmation) return;

    const response = await fetch(`http://localhost:5000/organize/users/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${getAuthToken()}`, 
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        const day = document.getElementById('currentDay').textContent.trim();
        fetchTasks(day); 
    } else {
        console.error('Failed to delete task');
    }
}


document.getElementById('addTaskButton').addEventListener('click', addTask);


const sidebarItems = document.querySelectorAll('.sidebar-item');
sidebarItems.forEach(item => {
    item.addEventListener('click', function() {
        const newTitle = this.textContent;
        document.getElementById('currentDay').textContent = newTitle;
        fetchTasks(newTitle);
    });
});


fetchTasks('Monday'); 


async function editTask(taskId) {
    const taskTitle = prompt("Edit task title:");
    if (!taskTitle) return;

    const response = await fetch(`http://localhost:5000/organize/users/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${getAuthToken()}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: taskTitle }) 
    });

    if (response.ok) {
        const updatedTask = await response.json();
        const day = document.getElementById('currentDay').textContent.trim();
        fetchTasks(day); 
    } else {
        console.error('Failed to update task');
    }
}
