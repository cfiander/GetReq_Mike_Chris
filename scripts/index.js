'use strict'

const apiKey = 'bcq3DfNaarB4lSrBJbxNRkw9f3Pj0XCjG4zXPzOZ';
const searchUrl = 'developer.nps.gov/api/v1/parks';

function formatQueryParams() {
    const queryItems = 
}


function getParks() {
    const params = {
        key: apiKey,
        state: 
        limit: 
    }
}

function watchForm() {
    $('form').submit(event => {
      event.preventDefault();
      const searchTerm = $('#js-search-term').val();
      const maxResults = $('#js-max-results').val();
      getYouTubeVideos(searchTerm, maxResults);
    });
  }