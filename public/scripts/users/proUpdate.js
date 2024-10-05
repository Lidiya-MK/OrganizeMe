document.getElementById('submitProfileChangesButton').addEventListener('click', async function() {

    const userName = document.getElementById('usernameInput').value;
    const email = document.getElementById('emailInput').value;


    const token = localStorage.getItem('authToken'); 
    

    const response = await fetch('/organize/users/update', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({
            userName,
            email    
        })
    });

   
    const result = await response.json();

    if (response.ok) {
        alert('Profile updated successfully!');
    } else {
        alert(`Error: ${result.error || 'Failed to update profile'}`);
    }
});