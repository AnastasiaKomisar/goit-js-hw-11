import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { getImagesByQuery } from "./js/pixabay-api";
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from "./js/render-functions";


const form = document.querySelector(".form");
const input = form.querySelector("input[name='search-text']");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const query = input.value.trim();

  if (!query) {
    iziToast.warning({
      title: "Oops!",
      message: "Please enter a search term!",
    });
    return;
  }

  clearGallery();
  showLoader();

  getImagesByQuery(query)
    .then((images) => {
        if (images.length === 0) {
            iziToast.error({
            title: "",
            message: "Sorry, there are no images matching your search query. Please try again!",
            position: "topRight",
            backgroundColor: "#EF4040",
            messageColor: "#FAFAFB",
            });
            hideLoader();
            return;
        }
        createGallery(images);
    })
    .catch(() => {
        iziToast.error({
            title: "",
            message: "Something went wrong. Please try again later.",
            position: "topRight",
            backgroundColor: "#EF4040",
            messageColor: "#FAFAFB",
        });
    })
});
