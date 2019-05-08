'use strict';

const apiKey = 'bcq3DfNaarB4lSrBJbxNRkw9f3Pj0XCjG4zXPzOZ';
const searchUrl = 'developer.nps.gov/api/v1/parks';

const stateCodes = {
  'Alabama' : 'AL',
  'Alaska' : 'AK',
  'Arizona' : 'AZ',
  'Arkansas' : 'AR',
  'California' : 'CA',
  'Colorado' : 'CO',
  'Connecticut' :	'CT',
  'Delaware' : 'DE',
  'Florida' : 'FL',
  'Georgia' : 'GA',
  'Hawaii' : 'HI',
  'Idaho' : 'ID',
  'Illinois' : 'IL',
  'Indiana' : 'IN',
  'Iowa' : 'IA',
  'Kansas' : 'KS',
  'Kentucky' : 'KY',
  'Louisiana' : 'LA',
  'Maine' : 'ME',
  'Maryland' : 'MD',
  'Massachusetts' : 'MA',
  'Michigan' : 'MI',
  'Minnesota' : 'MN',
  'Mississippi' : 'MS',
  'Missouri' : 'MO',
  'Montana' : 'MT',
  'Nebraska' : 'NE',
  'Nevada' : 'NV',
  'New Hampshire' : 'NH',
  'New Jersey' : 'NJ',
  'New Mexico' : 'NM',
  'New York' : 'NY',
  'North Carolina' : 'NC',
  'North Dakota' : 'ND',
  'Ohio' : 'OH',
  'Oklahoma' : 'OK',
  'Oregon' : 'OR',
  'Pennsylvania' : 'PA',
  'Rhode Island' : 'RI',
  'South Carolina' : 'SC',
  'South Dakota' : 'SD',
  'Tennessee' : 'TN',
  'Texas' : 'TX',
  'Utah' : 'UT',
  'Vermont' : 'VT',
  'Virginia' : 'VA',
  'Washington' : 'WA',
  'West Virginia' : 'WV',
  'Wisconsin' : 'WI',
  'Wyoming': 'WY',
  'American Samoa' : 'AS',
  'District of Columbia' : 'DC',
  'Federated States of Micronesia' : 'FM',
  'Guam' : 'GU',
  'Marshall Islands' : 'MH',
  'Northern Mariana Islands' : 'MP',
  'Palau' : 'PW ',
  'Puerto Rico' : 'PR ',
  'Virgin Islands' : 'VI'
};

function createParkElements(obj) {
  return `<h3>${obj.fullName}</h3>
    <h4>${obj.states}</h4>
    <p>${obj.description}</p>
    <p>${obj.url}</p>`;
}

function render(str) {
  $('#results-list').html(str);
  $('#results').removeClass('hidden');
}

function getParks(searchTerm, maxResults) {
  const params = {
    key: apiKey,
    state: searchTerm,
    limit: maxResults
  };
  let stateCodeStr = 'stateCode=';
  for (let i = 0; i < searchTerm.length; i++) {
    stateCodeStr += `${searchTerm[i]}%2C`;
  }
  let parkList = '';
  fetch(`https://developer.nps.gov/api/v1/parks?${stateCodeStr}&limit=${maxResults - 1}&api_key=${params.key}`)
    .then(response => {
      return response.json();
    })
    .then(response => {
      console.log(response.data);
      response.data.map(obj => {
        console.log(obj);
        parkList += createParkElements(obj);
      });
    })
    .then(() => {
      console.log('Render');
      render(parkList);
    });
}

function LetterCapitalize(str) { 
  return str.split(' ').map((word, i) => { 
    return word.charAt(0).toUpperCase() + word.slice(1); }).join(' '); 
}

function verifyInput(searchTerm) {
  let term = LetterCapitalize(searchTerm);
  try {
    if (!(term in stateCodes)) {
      throw 'Enter valid state';
    }
  } catch(error) {
    alert(error);
  }
  return stateCodes[term];
}

function parseSearchTerm(searchTerm) {
    
    return searchTerm.split(',').map((state) => {
    state = state.trim();
    return verifyInput(state);
  });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    let searchTerm = $('#js-search-term').val();

    searchTerm = parseSearchTerm(searchTerm);
    const maxResults = $('#js-max-results').val();
    getParks(searchTerm, maxResults);
  });
}

$(watchForm);