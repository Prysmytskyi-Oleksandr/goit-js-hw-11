
import './css/styles.css';
import NewsApiService from './fetchPhoto';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const refs = {
    searchForm: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery'),
    searchInput: document.querySelector('.request'),
    loadMoreBtn: document.querySelector('.load-more'),     
}

const lightbox = new SimpleLightbox('.gallery a', { captionsData: "alt", captionPosition: "bottom", captionDelay: 250 });

const newsApiService = new NewsApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

refs.loadMoreBtn.classList.add('is-hiden');


 
function onSearch(event) {
  event.preventDefault();
        
  newsApiService.query = event.currentTarget.elements.query.value.trim();
  newsApiService.resetPage();
  console.log(newsApiService.searchQuery);

  clear();

  if (newsApiService.searchQuery === "") {
    return;
  }
  
  newsApiService.fetchPhoto()
    .then((response) => {
      if (response.hits.length === 0) {
        return Notiflix.Notify.failure(`Sorry, there are no images matching your search query. Please try again.`);
      }
      else {
        Notiflix.Notify.success(`Hooray! We found ${response.totalHits} images.`);
        onCreatCard(response)
      }
    })

    // onCreatCard(response)
    // .catch(onError);
}; 
   


function onCreatCard(response) {
   
  const card = response.hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => 
            
            `
            <a href = "${largeImageURL}">
  <img src="${webformatURL}" alt="${tags}" class = "image" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes: ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${downloads}</b>
    </p>
  </div>
  </a>
`
        ).join('');
  refs.gallery.insertAdjacentHTML("beforeend", card);
  if (response.totalHits > 40) {
    refs.loadMoreBtn.classList.remove('is-hiden');
    lightbox.refresh();
          
  }
   
 
}


function onLoadMore()  {   
newsApiService.fetchPhoto()
  .then((response) => {
    onCreatCard(response);

    const totalPage = response.totalHits / 40;
    if (newsApiService.page >= totalPage) {
      refs.loadMoreBtn.classList.add('is-hiden');
      return Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
    }    
})
};


function clear() {
  refs.gallery.innerHTML = "";  
  
};

