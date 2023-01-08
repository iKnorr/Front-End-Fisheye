let params = new URL(document.location).searchParams;
let idURL = Number(params.get("id"));

const createPhotographerHeaderDOM = (photographer) => {
  const { portrait, name, price, tagline, city, country } = photographer;

  const picture = `assets/photographers/${portrait}`;

  const photographerHeaderSection =
    document.querySelector(".photograph-header");

  const containerInfo = document.createElement("div");
  containerInfo.classList.add("info-photographer");
  const h1 = document.createElement("h1");
  h1.textContent = name;
  const location = document.createElement("h3");
  location.textContent = `${city}, ${country}`;
  const taglineText = document.createElement("p");
  taglineText.textContent = tagline;
  const img = document.createElement("img");
  img.setAttribute("src", picture);
  img.setAttribute("alt", name);
  photographerHeaderSection.insertBefore(
    containerInfo,
    photographerHeaderSection.children[0]
  );
  containerInfo.appendChild(h1);
  containerInfo.appendChild(location);
  containerInfo.appendChild(taglineText);
  photographerHeaderSection.appendChild(img);
};

const createPhotographerGalleryDOM = (photographerMedia) => {
  const { id, title, image, likes, data, price } = photographerMedia;
  console.log(photographerMedia);
  const images = photographerMedia.map((el) => el.image);
  console.log(images);
};

async function getMedia() {
  const response = await fetch("../data/photographers.json");
  const { photographers, media } = await response.json();
  const photographer = photographers.filter((i) => i.id === idURL).shift();
  const photographerMedia = media.filter((i) => i.photographerId === idURL);

  createPhotographerHeaderDOM(photographer);
  createPhotographerGalleryDOM(photographerMedia);
}
getMedia();
