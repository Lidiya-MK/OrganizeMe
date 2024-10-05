
async function loginUser(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const payload = { email, password };

    try {
   
        const response = await fetch('http://localhost:5000/organize/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            const data = await response.json();


            if (data.token && data.userId) {
                const token = data.token;
                const userId = data.userId;


                localStorage.setItem('authToken', token);
                console.log('Token stored:', token); 


                window.location.href = `/dashboard/${userId}`;
            } else {
                document.getElementById('error-message').textContent = 'Login successful, but missing user information.';
            }
        } else {
            const errorData = await response.json();
            document.getElementById('error-message').textContent = errorData.message || 'Login failed. Please try again.';
        }
    } catch (error) {
        console.error('Error during login:', error);
        document.getElementById('error-message').textContent = 'An error occurred. Please try again later.';
    }
}
