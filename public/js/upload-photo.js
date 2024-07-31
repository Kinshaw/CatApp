// public/js/upload-photo.js
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('uploadPhotoForm');

  form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const formData = new FormData(form);

      try {
          const response = await fetch('/api/photos', {
              method: 'POST',
              headers: {
                  'Authorization': `Bearer ${localStorage.getItem('token')}`, // Use JWT from local storage
              },
              body: formData,
          });

          if (response.ok) {
              const result = await response.json();
              alert('Photo uploaded successfully!');
              // Optionally, redirect or update the UI
              window.location.href = '/'; // Redirect to home or another page
          } else {
              const error = await response.json();
              alert(`Error: ${error.message}`);
          }
      } catch (err) {
          console.error('Error uploading photo:', err);
          alert('Error uploading photo');
      }
  });
});
