import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchPhotos } from './js/pixabay-api.js';
import { clearGallery, renderPhotos } from './js/render-functions.js';

iziToast.settings({
  position: 'topRight',
  progressBar: false,
  messageColor: '#FFFFFF',
  icon: '',
  close: false,
});

document.addEventListener('DOMContentLoaded', () => {
  const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });

  const fetchPhotosBtn = document.querySelector('.btn');
  const loadMoreBtn = document.getElementById('loadMore');
  const searchInput = document.querySelector('.search');
  const loader = document.querySelector('.loader');

  const errorMessage = 'Sorry, there are no images matching your search query. Please try again!';
  const limitPostsMessage = 'We\'re sorry, there are no more posts to load';
  let page = 1;
  let limit = 15;
  let totalPhotos = null;
  let query = '';

  const handleFetchPhotos = async () => {
    query = searchInput.value.trim();
    if (query === '') return;

    clearGallery();
    page = 1;
    loader.style.display = 'block';
    loadMoreBtn.style.display = 'none';

    try {
      const photos = await fetchPhotos(query, page);
      if (photos.hits.length === 0) {
        throw new Error(errorMessage);
      }
      totalPhotos = photos.totalHits;
      renderPhotos(photos.hits);
      lightbox.refresh();
      searchInput.value = '';
      loadMoreBtn.style.display = 'block';
    } catch (error) {
      handleFetchError(errorMessage);
    } finally {
      loader.style.display = 'none';
    }
  };

  const handleLoadMorePhotos = async () => {
    page += 1;

    try {
      if (page === Math.ceil(totalPhotos / limit)) {
        loadMoreBtn.style.display = 'none';
        iziToast.info({ message: limitPostsMessage });
      }

      const photos = await fetchPhotos(query, page);

      if (photos.hits.length === 0) {
        throw new Error(errorMessage);
      }
      renderPhotos(photos.hits);
      lightbox.refresh();
    } catch (error) {
      handleFetchError(errorMessage);
    } finally {
      loader.style.display = 'none';
    }
  };

  const handleFetchError = (error) => {
    iziToast.error({ message: error });
    searchInput.value = '';
  };

  fetchPhotosBtn.addEventListener('click', handleFetchPhotos);
  loadMoreBtn.addEventListener('click', handleLoadMorePhotos);
});
