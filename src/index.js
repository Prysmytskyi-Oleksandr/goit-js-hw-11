
import debounce from 'lodash.debounce';
import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';


const DEBOUNCE_DELAY = 300;

const refs = {
    searchInput: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),    
}

refs.searchInput.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));
 
function onSearch(event) {
    event.preventDefault();
    const name = event.target.value.trim();

    if (name === "") {
        clear();
        return;
    }
  
    fetchCountries(name)
        .then(onCreatCard)
        .catch(onError);
    
};

function onCreatCard(country) {
    console.log(country) 
    
    if (country.length > 10) { 
        clear();
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        }

    else if (country.length === 1) {
        clear();
        const descrCountry = country.map(({ name, capital, population, flags, languages }) => {
            return `
    <div>
    <h1> <img src="${flags.svg}" alt="flag" width='30' height ='30' >${name.official}</h1>  
    <p>Сapital: ${capital}</p>
    <p>Population:${population}</p>
    <p>Languages: ${Object.values(languages)}</p>
    </div>
    `;
        }).join("");
        
    refs.countryInfo.insertAdjacentHTML('beforeend', descrCountry);
  }  


    else {
        clear();
        const listCountry = country.map(({ name, flags }) => {
            return `
    <li><img src="${flags.svg}" alt="flag" width='20' height ='20' >${name.official}</li>`;
        }).join("");
       refs.countryList.insertAdjacentHTML('beforeend', listCountry); }
}

function onError(error) {
    if (error) {
        Notiflix.Notify.failure("Oops, there is no country with that name");
    }
}


function clear() {
    refs.countryInfo.innerHTML = "";
    refs.countryList.innerHTML = "";    
};

