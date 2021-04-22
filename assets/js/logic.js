function modalTriggerHandler() {
    var modalId = $(this).attr("href").replace('#', '');
    console.log(modalId)
    
}

$('.modal-trigger').on('click', modalTriggerHandler())