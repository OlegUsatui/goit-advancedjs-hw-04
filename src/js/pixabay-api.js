import axios from 'axios';

const API_KEY = '22615360-5cbe46b430b53ed17aa097d2d';
const BASE_URL = 'https://pixabay.com/api/';

const initParams = {
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 15,
};

export async function fetchPhotos(q, page = 1) {
  const params = new URLSearchParams({
    ...initParams,
    page,
    q,
  });

  const response = await axios.get(`${BASE_URL}?${params}`);
  return response.data;
}