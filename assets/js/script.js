// DOM objects stored as variables
var searchDisplayEl = $("#searchResults");

// function to take search and get api response 
var searchAPI = function(userSearch) {
    // update DOM to inform user application is searching
    searchDisplayEl.text("Please wait....");

    // api address as variable
    var APIAddress = `https://openfarm.cc/api/v1/crops/?filter=${userSearch}`;
    
    // API Fetch
    fetch(APIAddress)
        .then(function(response) {
            // if response ok, json and send to displayResults function
            if(response.ok) {
                return response.json();
            // if error with response, update DOM
            } else {
                searchDisplayEl.text("There was an error processing your request. Please alert the dev team.");
                return
            }
        })
        .then(function(data) {
            displayResults(data);
        })
        .catch(function(error) {
            searchDisplayEl.text(`An error has occurred... ${error}`);
        });
};

// function to display search results from API request to the DOM
var displayResults = function(results) {
    // clear previous search/information from DOM
    searchDisplayEl.text("");
    // ensure there are results in the search
    if(results.data.length < 1) {
        searchDisplayEl.text("You search yielded no crops... please try searching by a different name.");
        return
    }

    for(var i = 0; i < results.data.length; i++) {
        searchDisplayEl.append($("<div>").text(results.data[i].attributes.name));
    }
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