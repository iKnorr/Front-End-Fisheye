const sortPhotographerMedia = (sortedMedia, currentSortingValue) => {
  if (currentSortingValue === 'Popularité') {
    sortedMedia.sort((a, b) => b.likes - a.likes);
  } else if (currentSortingValue === 'Titre') {
    sortedMedia.sort((a, b) => {
      let sortA = a.title;
      let sortB = b.title;
      return sortA < sortB ? -1 : sortA > sortB ? 1 : 0;
    });
  } else if (currentSortingValue === 'Date') {
    sortedMedia.sort((a, b) => new Date(a.date) - new Date(b.date));
  }
  return sortedMedia;
};

async function getPhotographers() {
  const response = await fetch('../../data/photographers.json');
  const { photographers, media } = await response.json();
  return {
    photographers,
    media,
  };
}

async function getMedia() {
  const response = await fetch('../../data/photographers.json');
  const { photographers, media } = await response.json();
  const photographer = photographers.filter(i => i.id === idURL).shift();
  const photographerMedia = media.filter(i => i.photographerId === idURL);

  const btnText = document.querySelector('.btn-text');
  let currentSortingValue = btnText.textContent;
  let sortedMedia = photographerMedia.slice();

  sortedMedia = sortPhotographerMedia(sortedMedia, currentSortingValue);

  createPhotographerHeaderDOM(photographer);
  createPhotographerGalleryDOM(photographer, sortedMedia);
  createLightbox(photographer, sortedMedia);
}
getPhotographers();
getMedia();
