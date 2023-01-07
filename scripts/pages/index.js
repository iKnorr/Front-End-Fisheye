async function getPhotographers() {
  const response = await fetch("../data/photographers.json");
  const { photographers, media } = await response.json();
  // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet,
  // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".

  // et bien retourner le tableau photographers seulement une fois récupéré
  return {
    photographers,
    media,
  };
}

async function displayData(photographers) {
  // console.log("DISPLAYDATA");
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    console.log(photographer);
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  console.log("INIT");
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
