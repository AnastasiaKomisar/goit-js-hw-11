import axios from "axios";

const API_KEY = "49733939-659891c25e41a9f00718666a7";
const BASE_URL = "https://pixabay.com/api/";

export const getImagesByQuery = (query) => {
    return axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
      },
    })
    .then(response => response.data.hits)
    .catch(error => {
      console.error("Error fetching images:", error);
      throw new Error("Error fetching images");
    });
  };