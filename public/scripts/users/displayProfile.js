async function fetchProfilePicture() {
    const token = localStorage.getItem('authToken');


    const pathSegments = window.location.pathname.split('/'); 
    const userId = pathSegments[pathSegments.length - 1];


    document.getElementById('userProfilePicLarge').src = '/assets/default-image.avif';

    try {
        const response = await fetch(`/organize/users/profile-picture/${userId}`, { 
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, 
                'Cache-Control': 'no-cache',
            },
        });

        console.log("Fetched Profile Picture URL:", result.profilePicture);


        if (response.ok) {
            const result = await response.json();

            if (result.profilePicture) {
                document.getElementById('userProfilePicLarge').src = result.profilePicture || "/assets/default-image.avif";;
            } else {
               
                document.getElementById('userProfilePicLarge').src = '/assets/default-image.avif';
            }
        } else {
            console.error("Error fetching profile picture:", response.statusText);
        }
    } catch (error) {
        console.error("Error fetching profile picture:", error.message);
    }
}

window.onload = fetchProfilePicture;
