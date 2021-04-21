// DOM objects stored as variables
var searchDisplayEl = $("#searchResults");

// function to take search and get api response 
var searchAPI = function(userSearch) {
    // update DOM to inform user application is searching
    searchDisplayEl.text("Please wait....");

    // api address as variable
    var APIAddress = `https://openfarm.cc/api/v1/crops/?filter=${userSearch}`;
    
    fetch(APIAddress)
        .then(function(response) {
            if(response.ok) {
                displayResults(response.json());
            } else {
                searchDisplayEl.text("There was an error processing your request. Please alert the dev team.")
            }
        })
        .catch(function(error) {
            searchDisplayEl.text(`An error has occurred... ${error}`);
        });
};

// function to display search results from API request to the DOM
var displayResults = function(results) {
    console.log(results);
};

// search button handler
$("#searchBtn").click(function(event) {
    // prevent default on submit
    event.preventDefault();

    // store the user's entry
    var userSearch = $("#userSearch").val();

    // pass the user's entry into the searchAPI function
    searchAPI(userSearch);
});