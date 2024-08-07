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

  const form = document.querySelector('.search-bar');
  const loadMoreBtn = document.getElementById('loadMore');
  const searchInput = document.querySelector('.search');
  const loader = document.querySelector('.loader');

  const errorMessage = 'Sorry, there are no images matching your search query. Please try again!';
  const limitPostsMessage = 'We\'re sorry, there are no more posts to load';
  let page = 1;
  let limit = 15;
  let totalPhotos = null;
  let query = '';

  const handleFetchPhotos = async (e) => {
    e.preventDefault();

    query = searchInput.value.trim();
    if (query === '') return;

    clearGallery();
    page = 1;
    loader.style.display = 'block';
    loadMoreBtn.style.display = 'none';

    try {
      const { hits, totalHits } = await fetchPhotos(query, page);
      const photos = hits;
      totalPhotos = totalHits;

      if (photos.length === 0) {
        throw new Error(errorMessage);
      }

      renderPhotos(photos);
      lightbox.refresh();
      searchInput.value = '';
      loadMoreBtn.style.display = 'block';
      scrollToBottom();
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

      const { hits } = await fetchPhotos(query, page);
      const photos = hits;

      if (photos.length === 0) {
        throw new Error(errorMessage);
      }
      renderPhotos(photos);
      lightbox.refresh();
      scrollToBottom();
    } catch (error) {
      handleFetchError(errorMessage);
    } finally {
      loader.style.display = 'none';
    }
  };

  const scrollToBottom = () => {
    const galleryItem = document.querySelector('.gallery-item');
    if (galleryItem) {
      const cardHeight = galleryItem.getBoundingClientRect().height;
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }
  };

  const handleFetchError = (error) => {
    iziToast.error({ message: error });
    searchInput.value = '';
  };

  form.addEventListener('submit', handleFetchPhotos);
  loadMoreBtn.addEventListener('click', handleLoadMorePhotos);
});
