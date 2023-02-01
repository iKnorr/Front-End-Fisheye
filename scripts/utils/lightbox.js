const createLightbox = (photographer, photographerMedia) => {
  const { name } = photographer;

  const body = document.querySelector('body');
  const mainSection = document.getElementById('main');
  const lightboxModal = document.querySelector('.lightbox_modal');
  const closeLightboxModal = document.querySelector('.btn-closeLightbox');

  const openLightbox = () => {
    mainSection.ariaHidden = 'true';
    lightboxModal.ariaHidden = 'false';
    body.classList.add('no-scroll');
    lightboxModal.style.display = 'block';
  };

  const closeLightbox = () => {
    mainSection.ariaHidden = 'false';
    lightboxModal.ariaHidden = 'true';
    body.classList.remove('no-scroll');
    lightboxModal.style.display = 'none';
  };

  // Open and Close Lightbox
  const images = document.querySelectorAll('.image_gallery');

  // Close Lightbox Modal
  closeLightboxModal.addEventListener('click', closeLightbox);

  //Lightbox
  const carouselList = photographerMedia
    .map((el, i) => {
      if (Object.keys(el).includes('video')) {
        return `<div class="carousel_list_item item-${i}"><video class="video" height="900" controls><source src="assets/images/${name}/${el.video}" type="video/mp4"></video><span>${el.title}</span></div>`;
      }
      if (Object.keys(el).includes('image')) {
        return `<div class="carousel_list_item item-${i}"><img class="image_lightbox " src="assets/images/${name}/${el.image}" alt="${el.title}"><span>${el.title}</span></div>`;
      }
    })
    .join('');

  // Lightbox Variables
  const previous = document.querySelector('.prev');
  const next = document.querySelector('.next');
  const prev = document.querySelector('.prev');
  previous.insertAdjacentHTML('afterEnd', carouselList);

  const imagesLightbox = document.getElementsByClassName('carousel_list_item');

  // Lightbox next and previous Image
  images.forEach((el, index) => {
    el.addEventListener('click', e => {
      openLightbox();
      currentSlide(index + 1);
    });
  });

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
  prev.addEventListener('click', () => {
    plusSlides(-1);
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
};
