// dom object
var recipeListEl = $('#recipe-list');

// get list of plants
var getIngredientList = function() {
    var queryString = document.location.search;

    var ingredientLIst = queryString.split("=")[1];

    ingredientLIst = ingredientLIst.substring(0, ingredientLIst.length -1);

    if(ingredientLIst) {
        // add list to DOM

        // pass to API function
        apiPull(ingredientLIst);
    } else {
        // redirect back to index
        document.location.replace('./index.html');
    }
};

// api call function
var apiPull = function(ingredientLIst) {
    var api = 'https://api.spoonacular.com/recipes/findByIngredients';
    var apiKey = '1fc9fe20885b43999c5970d525cd7ee6'

    fetch(`${api}?ingredients=${ingredientLIst}&number=10&apiKey=${apiKey}`).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                recipeListEl.text("Please wait...");
                displayRecipes(data);
            })
        } else {
            throw new Error("There was an error with the request.");
        }
    })
    .catch(function(error) {
        recipeListEl.text(error);
    });
};

// function to display recipes to page
var displayRecipes =  function(data) {
    // clear previous items
    recipeListEl.text('');

    for (var i = 0; i < data.length; i++) {
        // created and add content for card of each search result
        var colEl = $('<a>').addClass('modal-trigger col s12 m6 l4 xl3').attr('href', `#`);

        var cardEl = $('<div>').addClass('card');

        var imageDiv = $('<div>').addClass('card-image');
        var imageEl = $('<img>').attr('src', data[i].image);
        imageDiv.append(imageEl);
        var spanEl = $('<span>').addClass('card-title black-text').text(data[i].title);
        imageDiv.append(spanEl);
        
        cardEl.append(imageDiv);
        
        colEl.append(cardEl);

        // add card to page
        recipeListEl.append(colEl);
    }
};

getIngredientList()