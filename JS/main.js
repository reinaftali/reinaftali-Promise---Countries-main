document.addEventListener('DOMContentLoaded', function() {
  
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => {
        let countries = data;
  
        const renderCountries = (countriesData) => {
          const countriesGrid = document.getElementById('countries-grid');
          countriesGrid.innerHTML = ''; // Clear previous content
  
          countriesData.forEach(country => {
            const countryElement = document.createElement('a');
            countryElement.href = '#';
            countryElement.className = 'country scale-effect';
            countryElement.setAttribute('data-country-name', country.name.common);
            countryElement.onclick = () => {
              window.location.href = `details.html?country=${encodeURIComponent(country.name.common)}`;
            };
            countryElement.innerHTML = `
              <div class="country-flag">
                <img src="${country.flags.svg}" alt="${country.name.common} Flag" />
              </div>
              <div class="country-info">
                <h2 class="country-title">${country.name.common}</h2>
                <ul class="country-brief">
                  <li><strong>population: </strong>${country.population}</li>
                  <li><strong>Region: </strong>${country.region}</li>
                  <li><strong>capital: </strong>${country.capital}</li>
                </ul>
              </div>
            `;
            countriesGrid.appendChild(countryElement);
          });
        };
  
        // Sort countries alphabetically
        countries.sort((a, b) => {
          const countryA = a.name.common.toLowerCase();
          const countryB = b.name.common.toLowerCase();
          if (countryA < countryB) return -1;
          if (countryA > countryB) return 1;
          return 0;
        });
    
        // Render all countries initially
        renderCountries(countries);
  
        const filterCountriesByRegion = (region) => {
          if (region === 'all') {
            renderCountries(countries);
          } else {
            const regionLowerCase = region.toLowerCase();
            const filteredCountries = countries.filter(country => country.region.toLowerCase() === regionLowerCase);
            renderCountries(filteredCountries);
          }
          closeDropdown(); // Close the dropdown after filtering
        };
  
        const dropdownItems = document.querySelectorAll('.dropdown-content li');
        dropdownItems.forEach(item => {
          item.addEventListener('click', () => {
            const selectedRegion = item.dataset.region;
            filterCountriesByRegion(selectedRegion);
          });
        });
  
        // Dropdown
        const dropdownWrapper = document.querySelector('.dropdown-wrapper');
        const dropdownHeader = document.querySelector('.dropdown-header');
        const dropdownBody = document.querySelector('.dropdown-body');
  
        dropdownHeader.addEventListener('click', toggleDropdown);
  
        function toggleDropdown() {
          if (!dropdownWrapper.classList.contains('open')) {
            openDropdown();
          } else {
            closeDropdown();
          }
        }
  
        function openDropdown() {
          dropdownWrapper.classList.add('open');
          dropdownBody.classList.add('show');
          dropdownBody.classList.remove('hidden');
        }
  
        function closeDropdown() {
          dropdownWrapper.classList.remove('open');
          dropdownBody.classList.remove('show');
          dropdownBody.classList.add('hidden');
        }
  
        // Close the dropdown when clicking outside of it
        document.addEventListener('click', function(event) {
          if (!dropdownWrapper.contains(event.target)) {
            closeDropdown();
          }
        });
  
        // Search
        const searchInput = document.querySelector('.search-input');
        searchInput.addEventListener('input', function(event) {
          const searchTerm = event.target.value.trim().toLowerCase();
          let filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(searchTerm));
          renderCountries(filteredCountries);
        });
      })
      .catch(error => console.error('Error fetching countries:', error));
  });