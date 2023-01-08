function photographerHeaderfactory(data) {
  const { name, id, city, country, tagline, portrait } = data;

  const picture = `assets/photographers/${portrait}`;

  function getHeaderPhotographerDOM() {
    const article = document.createElement("article");
    const heading = document.createElement("h1");
    heading.textContent = name;
    article.appendChild(heading);

    return article;
  }

  return {
    name,
    picture,
    id,
    city,
    country,
    tagline,
    getHeaderPhotographerDOM,
  };
}
