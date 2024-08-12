import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

let box = new SimpleLightbox('ul.results a', { captionsData: 'alt', captionDelay: 250 });

function getElement(element) {
  return `<li class="result-item">
        <a class="result-link"
          href="${element.largeImageURL}">
          <img class="result-image"
            src="${element.webformatURL}"
            alt="${element.tags}" />
          <ul class="statistic">
            <li class="statistic-item">
              <span class="likes-title">Likes</span>
              <span class="likes-number">${element.likes}</span>
            </li>
            <li class="statistic-item">
              <span class="likes-title">Views</span>
              <span class="likes-number">${element.views}</span>
            </li>
            <li class="statistic-item">
              <span class="likes-title">Comments</span>
              <span class="likes-number">${element.comments}</span>
            </li>
            <li class="statistic-item">
              <span class="likes-title">Downloads</span>
              <span class="likes-number">${element.downloads}</span>
            </li>
          </ul>
        </a>
      </li>`;
}

export function render(arrayOfElements) {
  const update = arrayOfElements.map(el => getElement(el)).join("");

  const gallery = document.querySelector("ul.results");
  gallery.insertAdjacentHTML("afterbegin", update);

  box.refresh();
}
