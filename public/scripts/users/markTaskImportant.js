
function getAuthToken() {
    return localStorage.getItem('authToken'); 
}


async function toggleImportant(taskId, isImportant) {
    const response = await fetch(`http://localhost:5000/organize/users/tasks/${taskId}/star`, {
        method: 'PUT', 
        headers: {
            'Authorization': `Bearer ${getAuthToken()}`, 
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        const updatedTask = await response.json();
        const starIcon = document.querySelector(`.fa-star[onclick="toggleImportant('${taskId}', ${isImportant})"]`);


        starIcon.style.color = updatedTask.isImportant ? 'gold' : 'gray';
    } else {
        console.error('Failed to toggle task importance');
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


