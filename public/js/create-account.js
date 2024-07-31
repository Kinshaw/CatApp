document.querySelector('.signup-form').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const username = document.getElementById('username-signup').value.trim();
    const email = document.getElementById('email-signup').value.trim();
    const password = document.getElementById('password-signup').value.trim();
    const verifyPassword = document.getElementById('verify-password-signup').value.trim();
  
    if (username && email && password && verifyPassword) {
      if (password === verifyPassword) {
        const response = await fetch('/api/users', {
          method: 'POST',
          body: JSON.stringify({ username, email, password }),
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.ok) {
          alert('Signup successful! Redirecting to login page...');
          document.location.replace('/login');
        } else {
          alert('Failed to sign up. Please try again.');
        }
      } else {
        alert('Passwords do not match. Please try again.');
      }
    } else {
      alert('Please fill out all fields.');
    }
  });
  
  document.getElementById('back-to-login').addEventListener('click', (event) => {
    event.preventDefault();
    document.location.replace('/login');
  });
  