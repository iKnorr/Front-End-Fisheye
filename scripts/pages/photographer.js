let params = new URL(document.location).searchParams;
let idURL = Number(params.get('id'));

const createPhotographerHeaderDOM = photographer => {
  const { portrait, name, tagline, city, country } = photographer;

  const textHTML = `<div class="info-photographer"><h1 id"info-heading">${name}</h1><h3 class="">${city}, ${country}</h3><p>${tagline}</p></div>`;

  const imgHTML = `<img src="assets/photographers/${portrait}" alt="${name}">`;

  const photographerHeaderSection = document.querySelector('.photograph-header');
  photographerHeaderSection.insertAdjacentHTML('afterbegin', textHTML);
  photographerHeaderSection.insertAdjacentHTML('beforeend', imgHTML);
};

const createPhotographerGalleryDOM = (photographer, photographerMedia) => {
  const { name, price } = photographer;

  const lightboxModal = document.querySelector('.lightbox_modal');
  const closeLightboxModal = document.querySelector('.btn-closeLightbox');

  const openLightbox = () => {
    lightboxModal.style.display = 'block';
  };

  const closeLightbox = () => {
    lightboxModal.style.display = 'none';
  };

  let sumOfLikes = 0;
  photographerMedia.forEach(el => {
    sumOfLikes += el.likes;
  });

  const imagesGallery =
    '<div class="gallery">' +
    photographerMedia
      .map(el => {
        if (Object.keys(el).includes('video')) {
          return `<div class="gallery_img"><video class="image_gallery video" height="300"><source src="assets/images/${name}/${el.video}" type="video/mp4"></video><i class="icon-play fa-solid fa-play"></i><div class="gallery_img_info"><h3>${el.title}</h3><div class="gallery_img_like"><h3 class="like">${el.likes}</h3><i class="heart-icon fa-solid fa-heart"></i></div></div></div>`;
        }
        if (Object.keys(el).includes('image')) {
          return `<div class="gallery_img"><img class="image_gallery" src="assets/images/${name}/${el.image}" alt="${el.title}" height="300"><div class="gallery_img_info"><h3>${el.title}</h3><div class="gallery_img_like"><h3 class="like">${el.likes}</h3><i class="heart-icon fa-solid fa-heart"></i></div></div></div>`;
        }
      })
      .join('') +
    `</div>`;

  const photographerInfo = `<div class="photographer_info"><div class="sum-of-likes"><p class="nr_of_likes">${sumOfLikes}</p><i class="fa-solid fa-heart"></i></div><div>${price}€ / jour</div></div>`;

  const photographerHeaderSection = document.querySelector('.photograph-header');
  photographerHeaderSection.insertAdjacentHTML('afterend', imagesGallery);
  const gallery = document.querySelector('.gallery');
  gallery.insertAdjacentHTML('beforeend', photographerInfo);
  const allLikes = document.querySelector('.nr_of_likes');

  const likeButton = document.querySelectorAll('.heart-icon');

  likeButton.forEach(i => {
    i.addEventListener(
      'click',
      () => {
        i.previousElementSibling.textContent = Number(i.previousElementSibling.textContent) + 1;
        allLikes.textContent = Number(allLikes.textContent) + 1;
      },
      { once: true },
    );
  });

  // Open and Close Lightbox
  const images = document.querySelectorAll('.image_gallery');

  // Close Lightbox Modal
  closeLightboxModal.addEventListener('click', closeLightbox);

  //Lightbox
  const carouselList =
    `<ul>` +
    photographerMedia
      .map((el, i) => {
        if (Object.keys(el).includes('video')) {
          return `<li class="carousel_list_item item-${i}"><video class="video" height="900" controls><source src="assets/images/${name}/${el.video}" type="video/mp4"></video></li>`;
        }
        if (Object.keys(el).includes('image')) {
          return `<li class="carousel_list_item item-${i}"><img class="image_lightbox " src="assets/images/${name}/${el.image}" alt="${el.title}"><span>${el.title}</span></li>`;
        }
      })
      .join('') +
    `</ul>`;
  const lightboxContent = document.querySelector('.lightbox-wrapper');
  lightboxContent.insertAdjacentHTML('afterBegin', carouselList);

  const imagesLightbox = document.getElementsByClassName('carousel_list_item');

  console.log(imagesLightbox);
  images.forEach((el, index) => {
    // console.log(el);
    el.addEventListener('click', e => {
      openLightbox();
      for (i = 0; i < imagesLightbox.length; i++) {
        imagesLightbox[i].style.display = 'none';
      }
      imagesLightbox[index].style.display = 'block';
    });
  });
};

async function getMedia() {
  const response = await fetch('../data/photographers.json');
  const { photographers, media } = await response.json();
  const photographer = photographers.filter(i => i.id === idURL).shift();
  const photographerMedia = media.filter(i => i.photographerId === idURL);

  createPhotographerHeaderDOM(photographer);
  createPhotographerGalleryDOM(photographer, photographerMedia);
}
getMedia();
