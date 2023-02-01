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

  let sumOfLikes = 0;
  photographerMedia.forEach(el => {
    sumOfLikes += el.likes;
  });

  const imagesGallery =
    '<div class="gallery">' +
    photographerMedia
      .map((el, index) => {
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
};
