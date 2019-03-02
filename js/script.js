'use strict';

var url = 'https://restcountries.eu/rest/v2/name/';
var countriesList = document.getElementById('countries');



document.getElementById('search').addEventListener('click', searchCountries);

function searchCountries() {
    document.querySelector('.alert').classList.remove('show');
    var countryName = document.getElementById('country-name').value;
    if(!countryName.length) countryName = 'Poland';
    fetch(url + countryName)
        .then(function(resp) {
            return resp.json();
        })
        .then(showCountriesList)
        .catch(function(error) {
            document.querySelector('.alert').classList.add('show');
        });
};

function showCountriesList(resp) {
    countriesList.innerHTML = '';
    resp.forEach(function(item){
        
        // creating HTML elements
        var listElement = document.createElement('li');
        
        var headingWrapper = document.createElement('div');
        headingWrapper.classList.add('heading-wrapper');
        
        var flagBox = document.createElement('div');
        flagBox.classList.add('flag-box');
        var flagImage = document.createElement('img');
        flagImage.setAttribute('src', item.flag);
        flagBox.appendChild(flagImage);

        headingWrapper.appendChild(flagBox);

        var listElementHeading = document.createElement('h2');
        listElementHeading.innerText = item.name;
        var headingSpan = document.createElement('span');
        headingSpan.innerText = ' / ' + item.region +', ' + item.subregion;
        listElementHeading.appendChild(headingSpan);
        console.log(headingSpan);
        headingWrapper.appendChild(listElementHeading);
        listElement.appendChild(headingWrapper);
        
        var table = document.createElement('table');
        
        // getting data for table
        var countryInfo = {
            capital: ['Capital', item.capital],
            area: ['Land area', item.area + ' sq. km'],
            population: ['Population', item.population],
            currencies: ['Currency', item.currencies[0].code + ' (' + item.currencies[0].name + ')'], 
            languages: ['Language(s)', item.languages[0].iso639_1 + ' (' + item.languages[0].name + ')']
        };
        for (var i = 1; i < item.currencies.length; i++) {
            countryInfo.currencies[1] += ', ' + item.currencies[i].code + ' (' + item.currencies[i].name + ')';
        };
        for (var i = 1; i < item.languages.length; i++) {
            countryInfo.languages[1] += ', ' + item.languages[i].iso639_1 + ' (' + item.languages[i].name + ')';
        };



        // creating table rows
        for (var key in countryInfo) {
            var tableRow = document.createElement('tr');
            
            var firstColumnData = document.createElement('td');
            firstColumnData.innerText = countryInfo[key][0];
            tableRow.appendChild(firstColumnData);
            firstColumnData.classList.add('first-column');

            var secondColumnData = document.createElement('td');
            secondColumnData.innerText = countryInfo[key][1];
            tableRow.appendChild(secondColumnData);

            table.appendChild(tableRow);
        }
        listElement.appendChild(table);

        countriesList.appendChild(listElement);
    });
};
