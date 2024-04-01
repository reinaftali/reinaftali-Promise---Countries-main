document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const countryName = urlParams.get('country');
  
    if (countryName) {
      fetch(`https://restcountries.com/v3.1/name/${countryName}`)
        .then(response => response.json())
        .then(data => {
          const country = data[0];
          renderCountryDetails(country);
        })
        .catch(error => console.error('Error fetching country:', error));
    } else {
      console.error('No country name provided in the URL parameters.');
    }
  });
  
  function renderCountryDetails(country) {
    const countryDetailsSection = document.querySelector('.country-details');
  
    const currencies = country.currencies ? Object.values(country.currencies).map(currency => currency.name).join(', ') : 'None';
    const languages = country.languages ? Object.values(country.languages).join(', ') : 'None';
    const borders = country.borders ? country.borders.join(', ') : 'None';
  
    countryDetailsSection.innerHTML = `
      <div class="country-flag">
        <img src="${country.flags.svg}" alt="${country.name.common} Flag">
      </div>
      <div class="country-info">
        <h1>${country.name.common}</h1>
        <div class="col-2">
          <div>
            <ul>
              <li><strong>Native Name: </strong>${country.name.official}</li>
              <li><strong>Population: </strong>${country.population}</li>
              <li><strong>Region: </strong>${country.region}</li>
              <li><strong>Sub Region: </strong>${country.subregion}</li>
              <li><strong>Capital: </strong>${country.capital}</li>
            </ul>
          </div>
          <div>
            <ul>
              <li><strong>Top Level Domain: </strong>${country.tld.join(', ')}</li>
              <li><strong>Currencies: </strong>${currencies}</li>
              <li><strong>Languages: </strong>${languages}</li>
            </ul>
          </div>
        </div>
        <div class="col-3">
          <span><strong>Border Countries: </strong></span>
          <ul>
            ${borders.split(',').map(border => `<li>${border}</li>`).join('')}
          </ul>
        </div>
      </div>
    `;
  }