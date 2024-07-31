document.addEventListener('DOMContentLoaded', () => {
    const commentForm = document.querySelector('#comment-form');
  
    if (commentForm) {
      commentForm.addEventListener('submit', async (event) => {
        event.preventDefault();
  
        const content = document.querySelector('#comment-content').value;
        const photoId = document.querySelector('#photo-id').value;
  
        try {
          const response = await fetch('/comments', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ content, photoId })
          });
  
          if (!response.ok) {
            throw new Error('Failed to add comment');
          }
  
          const result = await response.json();
          console.log('Comment added:', result);
  
          // Optionally, update the UI to reflect the new comment
        } catch (error) {
          console.error(error);
        }
      });
    }
  });
    