$(document).ready(function(){

    // instantiate MVC classes
    var model = new $.Model();
    var view = new $.View($("#console"));
    var controller = new $.Controller(model, view);

    // manually call default view constructor
    view.initializeView();

});
