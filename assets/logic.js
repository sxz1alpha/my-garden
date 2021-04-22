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
        console.log(data);
    })
}

function modalTriggerHandler() {
    var modalId = $(this).attr("href").replace('#', '');
    console.log(modalId)
    
    addModalId(modalId);

    $('#' + modalId).modal();

    modalInformationHandler(modalId);
}

$('.modal-trigger').on('click', modalTriggerHandler())