const createLightbox = (photographer, photographerMedia) => {
  const { name } = photographer;
  const body = document.querySelector('body');
  const lightboxModal = document.querySelector('.lightbox_modal');
  const closeLightboxModal = document.querySelector('.btn-closeLightbox');

  const openLightbox = () => {
    lightboxModal.setAttribute('aria-hidden', 'false');
    body.classList.add('no-scroll');
    lightboxModal.style.display = 'block';
  };

  const closeLightbox = () => {
    lightboxModal.setAttribute('aria-hidden', 'true');
    body.classList.remove('no-scroll');
    lightboxModal.style.display = 'none';
  };

  // Open and Close Lightbox
  const images = document.querySelectorAll('.image_gallery');
  images.forEach((el, index) => {
    el.addEventListener('click', e => {
      openLightbox();
      currentSlide(index + 1);
    });
  });

  images.forEach((el, index) => {
    el.addEventListener('keyup', e => {
      if (e.key === 'Enter') {
        openLightbox();
        currentSlide(index + 1);
      }
    });
  });

  // Close Lightbox Modal
  closeLightboxModal.addEventListener('click', closeLightbox);
  closeLightboxModal.addEventListener('keyup', e => {
    if (e.key === 'Enter') {
      closeLightbox();
    }
  });

  //Lightbox
  const carouselList = photographerMedia
    .map((el, i) => {
      if (Object.keys(el).includes('video')) {
        return `<div class="carousel_list_item item-${i}"><video class="video" height="900" controls><source src="assets/images/${name}/${el.video}" type="video/mp4"></video><span>${el.title}</span></div>`;
      } else if (Object.keys(el).includes('image')) {
        return `<div class="carousel_list_item item-${i}"><img class="image_lightbox " src="assets/images/${name}/${el.image}" alt="${el.title}"><span>${el.title}</span></div>`;
      }
    })
    .join('');

  // Lightbox Variables
  const lightboxContent = document.querySelector('.lightbox-content');
  const previous = document.querySelector('.prev');
  const next = document.querySelector('.next');
  const prev = document.querySelector('.prev');
  lightboxContent.innerHTML = carouselList;

  const imagesLightbox = document.querySelectorAll('.carousel_list_item');

  let slideIndex = 1;

  const currentSlide = n => {
    showSlides((slideIndex = n));
  };

  const plusSlides = n => {
    showSlides((slideIndex += n));
  };

  next.addEventListener('click', () => {
    plusSlides(1);
  });
  next.addEventListener('keyup', e => {
    if (e.key === 'Enter') {
      plusSlides(1);
    }
  });
  prev.addEventListener('click', () => {
    plusSlides(-1);
  });
  prev.addEventListener('keyup', e => {
    if (e.key === 'Enter') {
      plusSlides(-1);
    }
  });

  const showSlides = index => {
    if (index > imagesLightbox.length) {
      slideIndex = 1;
    }
    if (index < 1) {
      slideIndex = imagesLightbox.length;
    }
    for (i = 0; i < imagesLightbox.length; i++) {
      imagesLightbox[i].style.display = 'none';
    }
    imagesLightbox[slideIndex - 1].style.display = 'block';
  };

  // Next and previous slide
  window.addEventListener('keyup', e => {
    if (e.key === 'ArrowLeft') {
      plusSlides(-1);
    }
  });

  window.addEventListener('keyup', e => {
    if (e.key === 'ArrowRight') {
      plusSlides(1);
    }
  });

  // close Lightbox with escape key
  window.addEventListener('keyup', function (e) {
    if (e.key === 'Escape') {
      closeLightbox();
    }
  });
};
