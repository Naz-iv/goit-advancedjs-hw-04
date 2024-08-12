import axios from 'axios';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const API_KEY = '45339856-2e70ead6ce9cf82bdbbd89c7e';
const API_URL = 'https://pixabay.com/api/';
const PER_PAGE = 15;

let raiseEmptySearchCriteria = () => {
    iziToast.show({
        message: `Fill search field`,
        position: "topRight",
        backgroundColor: 'rgb(250,128,114)',
        messageColor: 'rgb(255,255,255)'
    });
};

let raiseEmptyResponse = () => {
    iziToast.show({
        message: `Sorry, there are no images matching your search query. Please try again!`,
        position: "topRight",
        backgroundColor: 'rgb(250,128,114)',
        messageColor: 'rgb(255,255,255)'
    });
};

export async function loadData(searchText, page, callbackOnSuccess, callbackOnError, callOnFinally) {
    if (searchText === null || searchText === "") {
        raiseEmptySearchCriteria();
        callOnFinally();
        return;
    }

    try {
        const response = await axios.get(API_URL, {
            params: {
                key: API_KEY,
                q: searchText,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
                per_page: PER_PAGE,
                page: page
            },
            headers: {
                "Accept": "application/json"
            }
        });

        if (response.data.hits.length > 0) {
            callbackOnSuccess(response.data);
        } else {
            raiseEmptyResponse();
        }
    } catch (error) {
        callbackOnError(error);
    } finally {
        callOnFinally();
    }
}
