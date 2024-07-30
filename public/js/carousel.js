document.addEventListener('DOMContentLoaded', function() {
  console.log('carousel.js loaded');

  function allImagesLoaded() {
    const images = document.querySelectorAll('.carousel-image');
    let loaded = true;
    images.forEach((img) => {
      if (!img.complete || img.naturalHeight === 0) {
        loaded = false;
      }
    });
    return loaded;
  }

  function initCarousel() {
    const prevButton = document.getElementById('carousel-prev');
    const nextButton = document.getElementById('carousel-next');

    if (prevButton && nextButton) {
      prevButton.addEventListener('click', function(event) {
        console.log('Previous button clicked');
      });

      nextButton.addEventListener('click', function(event) {
        console.log('Next button clicked');
      });
    }

    $('#photoCarousel').carousel();
  }

  function waitForImages() {
    if (allImagesLoaded()) {
      initCarousel();
    } else {
      setTimeout(waitForImages, 100);
    }
  }

  waitForImages();
});