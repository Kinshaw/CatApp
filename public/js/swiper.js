// swiper js 
document.addEventListener('DOMContentLoaded', function() {
  console.log('swiper.js loaded');

  function allImagesLoaded() {
    const images = document.querySelectorAll('.swiper-slide img');
    let loaded = true;
    images.forEach((img) => {
      if (!img.complete || img.naturalHeight === 0) {
        loaded = false;
      }
    });
    return loaded;
  }

  function initSwiper() {
    new Swiper('.swiper-container', {
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });

    // Add event listeners to the like buttons
    const likeButtons = document.querySelectorAll('.like-button');
    console.log('Like buttons:', likeButtons); // Check if buttons are selected
    likeButtons.forEach(button => {
      button.addEventListener('click', async function(event) {
        event.preventDefault();
        console.log('button clicked');

        const photoId = this.getAttribute('data-id');
        console.log('Photo ID from button:', photoId); // Check if photoId is correct

        if (!photoId) {
          console.error('No data-id found on button');
          return;
        }

        // Log the photo ID to the console
        console.log('Photo ID:', photoId);
        try {
          const response = await fetch('/api/users/like', { // Updated endpoint
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ photoId: photoId })
          });

          if (response.ok) {
            const data = await response.json();
            console.log('Photo liked successfully:', data);
          } else {
            console.error('Failed to like photo');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      });
    });
  }

  function waitForImages() {
    if (allImagesLoaded()) {
      initSwiper();
    } else {
      setTimeout(waitForImages, 100);
    }
  }

  waitForImages();
});