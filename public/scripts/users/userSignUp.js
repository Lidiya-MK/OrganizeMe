

        document.getElementById('signup-form').addEventListener('submit', async function(event) {
            event.preventDefault();

            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;


            if (password !== confirmPassword) {
                document.getElementById('error-message').textContent = "Passwords do not match!";
                return;
            }

         
            const payload = {
                userName: username,
                email: email,
                password: password
            };

            try {

                const response = await fetch('http://localhost:5000/organize/users/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });

                if (response.ok) {
                    const data = await response.json();


                    const token = data.token;

                
                    localStorage.setItem('authToken', token);

                  
            
                    window.location.href = `/user/login`;
                } else {
                    const errorData = await response.json();
                    document.getElementById('error-message').textContent = errorData.message || 'Sign-up failed.';
                }
            } catch (error) {
                console.error('Error during sign-up:', error);
                document.getElementById('error-message').textContent = 'An error occurred. Please try again later.';
            }
        });
