import ApiService from './apiService';
import imageTemplate from '../templates/imageCard.hbs';

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('#gallery'),
  imageContainer: document.querySelector('.gallery'),
  sentinel: document.querySelector('#sentinel'),
};

const apiService = new ApiService();

refs.form.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();

  apiService.searchQuery = e.currentTarget.elements.query.value;
        
  apiService.resetPage();
  clearListImage();
  viewMarkup();
}


function listImageMarkup(images) {
  refs.gallery.insertAdjacentHTML('beforeend', imageTemplate(images));
}

function clearListImage() {
  refs.gallery.innerHTML = '';
}

async function viewMarkup() {
try {
       const response = await apiService.fetchImages();
    listImageMarkup(response);
    apiService.incrementPage();
  }
  catch (error) {
    console.log('Error');
  }
}

//_________ IntersectionObserver__________
const onEntry = entries => {
  entries.forEach(entry => {
    
    if (entry.isIntersecting && apiService.searchQuery !== '' ) {
      viewMarkup();
    }
  });
};

const options = {
  rootMargin: '200px',
};
const observer = new IntersectionObserver(onEntry, options);
observer.observe(refs.sentinel);

