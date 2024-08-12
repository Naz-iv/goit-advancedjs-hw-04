import { loadData } from './js/pixabay-api';
import { render } from './js/render-function';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const mainForm = document.querySelector(".search");
const loadMoreButton = document.getElementById("load-more");
let loader = document.querySelector("div.loader-panel");

let currentPage = 1;
let currentQuery = "";
let totalLoaded = 0;
let totalHits = 0;

function showEndOfCollectionMessage() {
    iziToast.show({
        message: `We're sorry, but you've reached the end of search results.`,
        position: "topRight",
        backgroundColor: 'rgb(250,128,114)',
        messageColor: 'rgb(255,255,255)'
    });
}

function smoothScroll() {
    const galleryItem = document.querySelector(".result-item");
    if (galleryItem) {
        const itemHeight = galleryItem.getBoundingClientRect().height;
        window.scrollBy({
            top: itemHeight * 2,
            behavior: 'smooth'
        });
    }
}

mainForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const searchQuery = mainForm.elements['search-query'].value.trim();

    if (searchQuery !== currentQuery) {
        currentQuery = searchQuery;
        currentPage = 1;
        totalLoaded = 0;
        totalHits = 0;

        const oldElements = document.querySelectorAll("li.result-item");
        if (oldElements && oldElements.length > 0) {
            oldElements.forEach(element => element.remove());
        }
    }

    loadMoreButton.style.display = "none";
    loader.style.display = "block";

    await loadData(
        currentQuery,
        currentPage,
        (response) => {
            render(response.hits);
            totalLoaded += response.hits.length;
            totalHits = response.totalHits;
            currentPage++;

            if (totalLoaded < totalHits) {
                loadMoreButton.style.display = "block";
            } else {
                showEndOfCollectionMessage();
            }

            smoothScroll();
        },
        (error) => console.error(error),
        () => loader.style.display = "none"
    );
});

loadMoreButton.addEventListener("click", async () => {
    loader.style.display = "block";
    loadMoreButton.style.display = "none";

    await loadData(
        currentQuery,
        currentPage,
        (response) => {
            render(response.hits);
            totalLoaded += response.hits.length;
            currentPage++;

            if (totalLoaded < totalHits) {
                loadMoreButton.style.display = "block";
            } else {
                showEndOfCollectionMessage();
            }

            smoothScroll();
        },
        (error) => console.error(error),
        () => loader.style.display = "none"
    );
});
