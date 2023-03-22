let params = new URL(document.location).searchParams;
let idURL = Number(params.get('id'));

const createPhotographerHeaderDOM = photographer => {
  const { portrait, name, tagline, city, country } = photographer;

  const textHTML = `<div class="info-photographer"><h1 id"info-heading">${name}</h1><h3 class="">${city}, ${country}</h3><p>${tagline}</p></div>`;

  const imgHTML = `<img src="assets/photographers/${portrait}" alt="${name}">`;
  const headingNameHTML = `<h2>${name}</h2>`;

  const heading = document.getElementById('header-heading');
  heading.insertAdjacentHTML('beforeend', headingNameHTML);
  const photographerHeaderSection = document.querySelector('.photograph-header');
  photographerHeaderSection.insertAdjacentHTML('afterbegin', textHTML);
  photographerHeaderSection.insertAdjacentHTML('beforeend', imgHTML);
};

const createPhotographerGalleryDOM = (photographer, photographerMedia) => {
  const { name, price } = photographer;

  const btnText = document.querySelector('.btn-text');

  let currentSortingValue = btnText.textContent;
  let sortedMedia = photographerMedia.slice();

  const renderGallery = currentSortingValue => {
    sortedMedia = sortPhotographerMedia(photographerMedia, currentSortingValue);

    let sumOfLikes = 0;
    sortedMedia.forEach(el => {
      sumOfLikes += el.likes;
    });

    // Delete gallery after every function call
    if (document.getElementById('gallery')) {
      document.getElementById('gallery').remove();
    }

    const gallery = document.createElement('div');
    gallery.setAttribute('id', 'gallery');
    gallery.setAttribute('role', 'list');
    gallery.setAttribute('aria-label', 'Gallery of images and videos');
    const imagesGalleryHtml = sortedMedia
      .map((el, index) => {
        if (Object.keys(el).includes('video')) {
          return `<div class="gallery_img" role="listitem"><video class="image_gallery video" height="300"><source src="assets/images/${name}/${el.video}" type="video/mp4"></video><i class="icon-play fa-solid fa-play"></i><div class="gallery_img_info"><h3>${el.title}</h3><div class="gallery_img_like"><h3 class="like">${el.likes}</h3><i class="heart-icon fa-solid fa-heart aria-label="like" role="button"></i></div></div></div>`;
        }
        if (Object.keys(el).includes('image')) {
          return `<div class="gallery_img" role="listitem"><img class="image_gallery" src="assets/images/${name}/${el.image}" alt="${el.title}" height="300"><div class="gallery_img_info"><h3>${el.title}</h3><div class="gallery_img_like"><h3 class="like">${el.likes}</h3><i class="heart-icon fa-solid fa-heart aria-label="like" role="button"></i></div></div></div>`;
        }
      })
      .join('');

    const photographerInfo = `<div class="photographer_info" role="complementary"><div class="sum-of-likes"><p class="nr_of_likes">${sumOfLikes}</p><i class="fa-solid fa-heart"></i></div><div>${price}€ / jour</div></div>`;

    const dropdown = document.getElementById('dropdown');
    dropdown.after(gallery);
    const galleryID = document.getElementById('gallery');
    galleryID.innerHTML = imagesGalleryHtml;
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

  // Dropdown
  const dropdownWrapper = document.querySelector('.wrapper-button');
  const dropdownBtn = document.querySelector('.btn-dropdown');
  const dropdownContent = document.querySelector('.dropdown-content');
  const dropdownOptions = document.querySelectorAll('.dropdown-option');
  const chevron = document.querySelector('.fa-chevron-down');
  const firstLiEl = document.getElementById('date');
  const secondLiEl = document.getElementById('titel');

  dropdownBtn.setAttribute('aria-haspopup', 'true');
  dropdownBtn.setAttribute('aria-expanded', 'false');
  dropdownBtn.setAttribute('aria-controls', 'dropdown-content');

  dropdownWrapper.addEventListener('click', () => {
    dropdownBtn.classList.toggle('radius');
    dropdownContent.classList.toggle('show');
    chevron.classList.toggle('turn-icon');

    const expanded = dropdownBtn.getAttribute('aria-expanded') === 'true' || false;
    dropdownBtn.setAttribute('aria-expanded', String(!expanded));
    dropdownContent.setAttribute('aria-hidden', String(!expanded));
  });

  const sortMedia = e => {
    let from = btnText.textContent;

    btnText.textContent = e.target.textContent;
    e.target.textContent = from;

    dropdownBtn.classList.toggle('radius');
    dropdownContent.classList.toggle('show');
    chevron.classList.toggle('turn-icon');
    dropdownBtn.setAttribute('aria-expanded', 'false');
    dropdownContent.setAttribute('aria-hidden', 'true');
    currentSortingValue = btnText.textContent;

    renderGallery(currentSortingValue);
    createLightbox(photographer, sortedMedia);
  };

  dropdownOptions.forEach(e => {
    e.addEventListener('click', e => {
      sortMedia(e);
    });
  });

  firstLiEl.addEventListener('keyup', e => {
    if (e.key === 'Enter') {
      sortMedia(e);
    }
  });

  secondLiEl.addEventListener('keyup', e => {
    if (e.key === 'Enter') {
      sortMedia(e);
    }
  });

  // close dropdown with escape key
  window.addEventListener('keyup', function (e) {
    if (e.key === 'Escape') {
      dropdownBtn.classList.remove('radius');
      dropdownContent.classList.remove('show');
      dropdownBtn.setAttribute('aria-expanded', 'false');
      dropdownContent.setAttribute('aria-hidden', 'true');
    }
  });

  renderGallery(currentSortingValue);
};
