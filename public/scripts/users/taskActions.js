
function getAuthToken() {
    return localStorage.getItem('authToken'); 
}


async function toggleTaskDone(taskId, isDone) {
    try {
        const response = await fetch(`http://localhost:5000/organize/users/tasks/${taskId}/done`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ isDone: !isDone }) 
        });

        const updatedTask = await response.json();
        if (response.ok) {

            updateTaskUI(updatedTask);
        } else {
            alert('Failed to update task: ' + updatedTask.error);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}


function updateTaskUI(task) {
    const taskItem = document.getElementById(task._id);
    const label = taskItem.querySelector('label');

  
    if (task.isDone) {
        label.style.textDecoration = 'line-through';
    } else {
        label.style.textDecoration = 'none'; 
    }
}


function attachCheckboxListeners() {
    const checkboxes = document.querySelectorAll('.form-check-input');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', async function() {
            const taskId = this.id; 
            const isDone = this.checked; 
            await toggleTaskDone(taskId, isDone); 
        });
    });
}


function initTaskActions() {
    attachCheckboxListeners();
}
