
async function getUserData(userId) {
    try {
 
        const token = localStorage.getItem('authToken');
        
        if (!token) {
            throw new Error("No authentication token found. Please log in again.");
        }


        const response = await fetch(`http://localhost:5000/organize/users/${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error("Failed to fetch user data. Please check your token.");
        }

        const userData = await response.json();

        document.getElementById("userName").textContent = userData.userName;
        document.getElementById("userEmail").textContent = userData.email;


        const profilePictureUrl = userData.profilePicture || "/assets/default-image.avif";
        document.getElementById("userProfilePic").src = profilePictureUrl;


        document.getElementById("userProfilePic").onerror = function() {
            this.src = "/assets/default-image.avif"; 
        };
        
    } catch (error) {
        console.error("Error fetching user data:", error);
       
    }
}


function getUserIdFromURL() {
    const urlPath = window.location.pathname;
    const pathSegments = urlPath.split("/"); 
    const userId = pathSegments[pathSegments.length - 1];
    return userId;
}


const userId = getUserIdFromURL();
getUserData(userId);
