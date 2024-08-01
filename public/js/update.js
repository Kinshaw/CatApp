

// Add event listeners to the like buttons

const updateButton = document.querySelector('.update-btn');
console.log('Update buttons:', updateButton); // Check if button is present

updateButton.addEventListener('click', async function (event) {
  event.preventDefault();
  console.log('button clicked');
  const newBio = document.querySelector('#bioUpdate').value.trim();

  console.log('New bio info:', newBio); // Check if bio update is entere

  if (!newBio) {
    console.error('No new bio info');
    return;
  }

  // Log the photo ID to the console

  try {
    console.log('got to the try method')


    const response = await fetch('/api/users/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ bio: newBio }),
    });

    if (response.ok) {
      console.log('Bio updated successfully');
      // Optionally, you can add code to update the UI or redirect the user
    } else {
      console.error('Failed to update bio');
    }
  } catch (error) {
    console.error('Error:', error);
  }

});
