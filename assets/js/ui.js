
// Variables


// Variable estado sidabar
var sidebarActivado = 0;


// UI- INIT ***
function uiInitSidebar(){
    $('.ui.sidebar').sidebar('setting', 'closable',false);

    $('.ui.accordion').accordion();
};

function uiInitMenu(){
    $('.ui.dropdown').dropdown({on: 'hover'});
};

function uiInitDropdown(){
    $('.ui.dropdown').dropdown({on: 'hover'});
};

function uiInitInicio(){
    $('.ui.checkbox').checkbox();
    $('.ui.rating').rating({clearable: true});
}
function uiInitSegmentoBasico(){
    $('.ui.checkbox').checkbox();
    $('.ui.accordion').accordion();
    $('.ui.dropdown').dropdown({on: 'hover'});


}

function uiInitCheckbox(){
    $('.ui.checkbox').checkbox();
}

function uiInitAccordion(){
    $('.ui.accordion').accordion();
}

function uiInitModal(){
    $('.ui.checkbox').checkbox();
}




//Sidebar
//Cerrar el sidebar cuando se da click en la pantalla luego de ser abierto
$(document).on("click", ".pusher,.top.fixed", function() {
    if(sidebarActivado == 1) {
        sidebarClose();
    }
});
function sidebarOpen() {
    $('#BTN_ID_MenuSidebar').transition('fade');
    $('.ui.sidebar').sidebar('show');
    setTimeout(function() {
        sidebarActivado = 1;
    }, 300);
}
function sidebarClose() {
    sidebarActivado = 0;
    $('.ui.sidebar').sidebar('hide');
    $('#BTN_ID_MenuSidebar').transition('fade');
    $('.ui.accordion.menu').accordion('close others');
}


//Modals

function modalOpen(){
    $('.ui.modal').modal({allowMultiple: true}).modal('setting', 'closable', false).modal('show');
}
function modalHide(){
    $('.ui.modal').modal('hide');
}
