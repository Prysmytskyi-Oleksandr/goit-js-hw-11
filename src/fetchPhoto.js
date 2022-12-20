
export default class NewsApiService {
        constructor() {
                this.searchQuery = '';
                this.page = 1;
        }
        
        fetchPhoto() {
                const URL = 'https://pixabay.com/api/';
                const KEY = '31945832-e9d492592ba6e12edc092d436';
               
               
return fetch(`${URL}?key=${KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`)
.then(response => response.json()).then((response) => {
        this.page += 1;
        return response;
                                });                         
        }
        
 
        get query() { return this.searchQuery };
        set query(newQuery) { this.searchQuery = newQuery };

        resetPage() {this.page = 1 };       

}
