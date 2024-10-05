
document.getElementById('changeProfileButton').addEventListener('click', () => {
    document.getElementById('fileInput').click(); 
});


document.getElementById('fileInput').addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const token = localStorage.getItem('authToken');

    const formData = new FormData();
    formData.append('profilePicture', file); 

    try {
        const response = await fetch('/organize/users/profile-picture', {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData, 
        });

        const result = await response.json();

        if (response.ok) {
         
            document.getElementById('userProfilePicLarge').src = result.profilePicture;
            alert("Profile picture updated successfully!");
        } else {
            console.error("Error updating profile picture:", result.message);
        }
    } catch (error) {
        console.error("Error updating profile picture:", error.message);
    }
});
