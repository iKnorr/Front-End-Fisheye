function photographerFactory(data) {
  const { name, id, city, country, tagline, price, portrait } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement('article');
    const link = document.createElement('a');
    link.setAttribute('href', `photographer.html?id=${id}`);
    const container = document.createElement('div');
    container.classList.add('photographer_card');
    const img = document.createElement('img');
    img.setAttribute('src', picture);
    img.setAttribute('alt', name);
    img.ariaLabel = `aria-label=${name}`;
    const h2 = document.createElement('h2');
    const location = document.createElement('h3');
    location.textContent = `${city}, ${country}`;
    const taglineText = document.createElement('p');
    taglineText.textContent = tagline;
    const priceText = document.createElement('span');
    h2.textContent = name;
    priceText.textContent = `${price}€/jour`;
    link.appendChild(container);
    link.appendChild(img);
    link.appendChild(h2);
    container.appendChild(img);
    article.appendChild(link);
    article.appendChild(location);
    article.appendChild(taglineText);
    article.appendChild(priceText);

    return article;
  }
  return { name, picture, id, city, country, tagline, price, getUserCardDOM };
}
