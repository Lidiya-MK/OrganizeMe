function updateCardTitle(title) {
    const currentDayElement = document.getElementById('currentDay'); // Ensure this ID matches your HTML
    if (currentDayElement) {
        currentDayElement.textContent = title; // Update the text content with the title
    } else {
        console.error('Element with ID "currentDay" not found');
    }
}
async function fetchImportantTasks() {
    const token = localStorage.getItem('authToken'); 

    try {
        const response = await fetch('/organize/users/tasks/important', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache' // Prevent cached responses
            },
            cache: 'no-store' // This ensures the request is always fresh from the server
        });

        if (!response.ok) {
            throw new Error('Failed to fetch important tasks');
        }

        const importantTasks = await response.json();

        // Additional check to ensure only tasks marked as important are displayed
        const filteredTasks = importantTasks.filter(task => task.isImportant === true);

        displayImportantTasks(filteredTasks);
    } catch (error) {
        console.error('Error fetching important tasks:', error);
    }
}


function displayImportantTasks(tasks) {
    const importantTaskList = document.getElementById('importantTaskList');
    importantTaskList.innerHTML = ''; // Clear the existing list

    if (tasks.length === 0) {
        // Clear any existing content
        importantTaskList.innerHTML = ''; // Clear the existing content
        
        // Create a container for the message and the GIF
        const container = document.createElement('div');
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.alignItems = 'center'; // Center horizontally
        container.style.justifyContent = 'center'; // Center vertically
        container.style.height = '100%'; // Full height of the parent
        container.style.textAlign = 'center'; // Center text
    
        // Create an image element for the GIF
        const procrastinationGif = document.createElement('img');
        procrastinationGif.src = '/assets/Procrastination.gif'; // Path to your GIF
        procrastinationGif.alt = 'Procrastination GIF'; // Alt text for accessibility
        procrastinationGif.style.height = 'auto'; // Maintain aspect ratio
        procrastinationGif.style.maxWidth = '40%'; // Limit the width
        procrastinationGif.style.opacity = '0.8';
        procrastinationGif.style.borderRadius = '20px'; // Set opacity if needed
    
        // Create a message element
        const message = document.createElement('p');
        message.textContent = 'Whoo whoo! No important tasks yet!'; // Message text
        message.style.fontSize = '1rem'; // Adjust font size as needed
        message.style.color = 'grey'; // Change text color as desired
    
        // Append the GIF and message to the container
        container.appendChild(procrastinationGif);
        container.appendChild(message);
    
        // Append the container to the importantTaskList
        importantTaskList.appendChild(container);
    
        return;
    }
    
    

    // Create list items for each important task
    tasks.forEach(task => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item d-flex align-items-center justify-content-between';

        // Create the task title element
        const taskTitle = document.createElement('span');
        taskTitle.textContent = task.title; // Task title

        // Create the icon for marking the task as done
        const doneIcon = document.createElement('i');
        doneIcon.className = 'fa fa-star'; 
        // Use a FontAwesome check icon for example
        doneIcon.style.cursor = 'pointer';
        doneIcon.style.color = 'gold';
        doneIcon.addEventListener('click', () => markTaskAsDone(task._id)); // Add a click event to mark the task as done

        // Append task title and done icon to the list item
        listItem.appendChild(taskTitle);
        listItem.appendChild(doneIcon);

        // Append the list item to the important task list
        importantTaskList.appendChild(listItem);
    });
}

function markTaskAsDone(taskId) {
    const token = localStorage.getItem('token');

    fetch(`/organize/users/tasks/${taskId}/mark-done`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Task marked as done:', data);
        fetchImportantTasks(); // Re-fetch the tasks to update the list
    })
    .catch(error => console.error('Error marking task as done:', error));
}

// Updated event listeners for sidebar items
sidebarItems.forEach(item => {
    item.addEventListener('click', function () {
        const newTitle = this.textContent;

        // Update the card title
        updateCardTitle(newTitle);

        if (newTitle === "Important") {
            document.getElementById('taskCard').style.display = 'none'; // Hide task input
            document.getElementById('importantTasksCard').style.display = 'block'; // Show important tasks
            document.getElementById('profilePictureSection').style.display = 'none'; // Hide profile picture section
            fetchImportantTasks(); // Call the function to fetch and display important tasks
        } else if (newTitle === "Update Profile") {
            document.getElementById('taskCard').style.display = 'none'; // Hide task input
            document.getElementById('importantTasksCard').style.display = 'none'; // Hide important tasks
            document.getElementById('profilePictureSection').style.display = 'block'; // Show profile picture section
        } else {
            document.getElementById('taskCard').style.display = 'block'; // Show task input
            document.getElementById('importantTasksCard').style.display = 'none'; // Hide important tasks
            document.getElementById('profilePictureSection').style.display = 'none'; // Hide profile picture section
            fetchTasks(newTitle); // Fetch tasks for the selected day
        }
    });
});
