const gallery = document.querySelector('.gallery');

export function renderPhotos(images) {
  const markup = images.map(({ largeImageURL, webformatURL, likes, views, tags, comments, downloads}) => {
    return `
    <li class="gallery-item">
        <a class="gallery-link" href="${largeImageURL}">
            <img
                class="gallery-image"
                src="${webformatURL}"
                data-source="${largeImageURL}"
                alt="${tags}"
            />
        </a>
        <div class="stats">
          <div>Likes<span>${likes}</span></div>
          <div>Views<span>${views}</span></div>
          <div>Comments<span>${comments}</span></div>
          <div>Downloads<span>${downloads}</span></div>
        </div>
    </li>
  `;
  }).join("");
  gallery.insertAdjacentHTML("beforeend",  markup);
}

export function clearGallery() {
  gallery.innerHTML = '';
}
