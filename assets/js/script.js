var myGarden = []

// DOM objects stored as variables
var searchDisplayEl = $('#searchResults');

// function to take search and get api response 
var searchAPI = function(userSearch) {
    // update DOM to inform user application is searching
    searchDisplayEl.text('Please wait....');

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
                searchDisplayEl.text('There was an error processing your request. Please alert the dev team.');
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

var favesAppend = function() {
    $('#faves').children().remove()
    for (i = 0; i < myGarden.length; i++) {
        
        $('#faves').append(`
        <li>
            <button 
            class="garden-item modal-trigger" 
            href="${myGarden[i].id}"
            >${myGarden[i].name}</button>
        </li>`
    )
    }
    
};
// function to display search results from API request to the DOM
var displayResults = function(results) {
    // clear previous search/information from DOM
    searchDisplayEl.text('');
    // ensure there are results in the search
    if(results.data.length < 1) {
        searchDisplayEl.text('You search yielded no crops... please try searching by a different name.');
        return
    }

    for(var i = 0; i < results.data.length; i++) {
        // created and add content for card of each search result
        var colEl = $('<a>').addClass('modal-trigger col s12 m4 l3').attr('href', `#${results.data[i].id}`).attr('plantId', results.data[i].id);

        var cardEl = $('<div>').addClass('card');

        var imageDiv = $('<div>').addClass('card-image');
        if(results.data[i].attributes.main_image_path === "/assets/baren_field_square-4a827e5f09156962937eb100e4484f87e1e788f28a7c9daefe2a9297711a562a.jpg") {
            var imgSrc = "./assets/images/baren_field_square-4a827e5f09156962937eb100e4484f87e1e788f28a7c9daefe2a9297711a562a.jpg";
        } else {
            var imgSrc = results.data[i].attributes.main_image_path;
        }
        var imageEl = $('<img>').attr('src', imgSrc).attr('style', "height:250px");
        imageDiv.append(imageEl);
        var spanEl = $('<span>').addClass('card-title').text(results.data[i].attributes.name);
        imageDiv.append(spanEl);
        
        cardEl.append(imageDiv);
        
        colEl.append(cardEl);

        // add card to page
        searchDisplayEl.append(colEl);
       
        
    }
};

// makes the button element in the my garden section
$("body").on("click", "#fav-btn", function() {
    
    var plant = {name: `${$(this).attr('name')}`, id: `${$(this).attr('href')}`}
    if (!myGarden.includes(plant)) {
        myGarden.push(plant);
    }
    // appends the plant to the my garden section
    favesAppend();
    saveLocal();
    
});

var saveLocal = function() {
    localStorage.setItem("myGardenPlants", JSON.stringify(myGarden));
};

var getLocal = function() {
    myGarden = JSON.parse(localStorage.getItem("myGardenPlants"));
    if (!myGarden) {
        myGarden = []
    }
    favesAppend();
};

//clears the my garden section
$("#garden-clear").click(function() {
    $('#faves').children().remove();
});
    
// search button handler
$("#searchBtn").click(function(event) {
    // prevent default on submit
    event.preventDefault();

    // store the user's entry
    var userSearch = $('#userSearch').val();

    // pass the user's entry into the searchAPI function
    searchAPI(userSearch);

    // reset search input
    $('#UserSearch').val('');
});
  
function addModalId(id) {
    $('.modal').attr('id', id);
}

function modalInformationHandler(plantId) {
    var modalFetchUrl = "https://openfarm.cc/api/v1/crops/" + plantId
    fetch(modalFetchUrl)
    .then(function(response) {
        if (response.ok) {
            return response.json()
        } else {
            // return something if it failed
        }
    })
    .then(function(data) {
        modalTriggerHandler(plantId, data)
    })
}

function modalTriggerHandler(modalId, fetchData) {
    var modalContent = $('#' + modalId).children('.modal-content')
    var modalHeader = $(modalContent).children('#modalHeader')
    var modalSubHeader = $(modalContent).children('#modalSubHeader')
    var modalImg = $(modalContent).children('#modalImg')
    var modalText = $(modalContent).children('#modalP')
    $(modalHeader).text(fetchData.data.attributes.name)
    if (fetchData.data.attributes.common_names) {
        $(modalSubHeader).text('Common name(s): ' + fetchData.data.attributes.common_names.join(', '))
    } else {
        $(modalSubHeader).empty()
    }
   $(modalImg).attr('src', fetchData.data.attributes.main_image_path).addClass('modal-img')
   $(modalText).text('Description: ' + fetchData.data.attributes.description)
   $('#fav-btn').attr('href', '#' + modalId).attr('name', fetchData.data.attributes.name);
//    console.log(fetchData)
}

$(searchDisplayEl).on('click', 'a', function(event) { 
    var aTagId = $(this).attr('href')
    // console.log($(this).attr('href'))
    var modalId = aTagId.replace('#', '');
    addModalId(modalId);
    $('#' + modalId).modal();
    modalInformationHandler(modalId);
});


$(".garden-item").on('click', function(event) { 
    var aTagId = $(this).attr('href')
    // console.log($(this).attr('href'))
    var modalId = aTagId.replace('#', '');
    addModalId(modalId);
    $('#' + modalId).modal();
    modalInformationHandler(modalId);
});


getLocal();