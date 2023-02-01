async function getMedia() {
  const response = await fetch('../data/photographers.json');
  const { photographers, media } = await response.json();
  const photographer = photographers.filter(i => i.id === idURL).shift();
  const photographerMedia = media.filter(i => i.photographerId === idURL);

  createPhotographerHeaderDOM(photographer);
  createPhotographerGalleryDOM(photographer, photographerMedia);
  createLightbox(photographer, photographerMedia);
}
getMedia();
