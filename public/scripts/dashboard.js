

async function fetchUserData() {
    const token = localStorage.getItem('authToken');
    const userId = 'someId'; 

    try {
        const response = await fetch(`http://localhost:5000/organize/users/${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const userData = await response.json();
            document.getElementById('userName').textContent = userData.name; // Assuming user object has 'name'
            document.getElementById('userEmail').textContent = userData.email; // Assuming user object has 'email'
        } else {
            console.error('Failed to fetch user data:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}


function manageTasks() {
    const taskList = document.getElementById('taskList');
    const newTaskInput = document.getElementById('newTaskInput');
    const addTaskButton = document.getElementById('addTaskButton');


    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        taskList.innerHTML = ''; 
        tasks.forEach((task, index) => {
            const listItem = createTaskItem(task, index);
            taskList.appendChild(listItem);
        });
    };


    const createTaskItem = (task, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'form-check-input me-2';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => {
            task.completed = checkbox.checked;
            saveTasks();
            loadTasks();
        });

        const label = document.createElement('label');
        label.textContent = task.name;

        const actionIcons = document.createElement('div');
        actionIcons.className = 'action-icons';
        
        const editIcon = document.createElement('i');
        editIcon.className = 'fas fa-edit';
        editIcon.onclick = () => editTask(index);

        const deleteIcon = document.createElement('i');
        deleteIcon.className = 'fas fa-trash';
        deleteIcon.onclick = () => deleteTask(index);

        actionIcons.appendChild(editIcon);
        actionIcons.appendChild(deleteIcon);
        listItem.appendChild(checkbox);
        listItem.appendChild(label);
        listItem.appendChild(actionIcons);

        return listItem;
    };


    const saveTasks = () => {
        const tasks = Array.from(taskList.children).map((item, index) => {
            return { name: item.querySelector('label').textContent, completed: item.querySelector('input').checked };
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

   
    addTaskButton.addEventListener('click', () => {
        const newTask = newTaskInput.value.trim();
        if (newTask) {
            const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            tasks.push({ name: newTask, completed: false });
            localStorage.setItem('tasks', JSON.stringify(tasks));
            newTaskInput.value = ''; 
            loadTasks();
        }
    });


    const editTask = (index) => {
        const tasks = JSON.parse(localStorage.getItem('tasks'));
        const taskName = prompt('Edit task name:', tasks[index].name);
        if (taskName) {
            tasks[index].name = taskName;
            localStorage.setItem('tasks', JSON.stringify(tasks));
            loadTasks();
        }
    };

    const deleteTask = (index) => {
        const tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        loadTasks();
    };

    loadTasks(); 
}


document.addEventListener('DOMContentLoaded', () => {
    fetchUserData();
    manageTasks();
});
