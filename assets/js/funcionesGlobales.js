// The root URL for the RESTful services
//var rootURL = "http://190.171.60.53:8080/webresources";
var rootURL = "http://186.176.100.26:8080/webresources";
//var rootURL = "http://localhost:8080/LoanServicing/webresources";
var rootFileDirectory = "C:\\\\Users\\\\Oscar Montes\\\\Files\\\\";

var listaMeses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];



function getFechaActual(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd < 10 )
        dd = "0"+dd;
    if(mm < 10)
        mm = "0"+mm;
    return yyyy+"-"+mm+"-"+dd;
}


function getFechaActualFormatoVista(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd < 10 )
        dd = "0"+dd;
    if(mm < 10)
        mm = "0"+mm;
    return dd+"-"+mm+"-"+yyyy;
}

function getFechaFormatoVista(pFecha) {
    var year = pFecha.substring(0, 4);
    var month = pFecha.substring(5, 7);
    var day = pFecha.substring(8, 10);
    return day + "-" + month + "-" + year;
}


function getHoraActual(){
    var today = new Date();
    var horas = today.getHours();
    var minutos = today.getMinutes();
    if(horas < 10 )
        horas = "0"+horas;
    if(minutos < 10)
        minutos = "0"+minutos;
    return horas+":"+minutos;
}

function showDiffDays(pFechaOrigen,pFechaResta){
    var date1 = new Date(pFechaOrigen);    
    var date2 = new Date(pFechaResta);
    
    var diff = (date2 - date1)/1000;
    var diff = Math.abs(Math.floor(diff));
    
    var days = Math.floor(diff/(24*60*60));
    
   return days;
}



function reverse(array) {
    var copy = [].concat(array);
    return copy.reverse();
}

function esperaTiempoFuncion(pFuncion,pTiempoMilisegundos){
    setTimeout(function () {
        pFuncion();
    },pTiempoMilisegundos);
};

function currencyFormat(num) {
    return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}


function isInJson(JSON,tagName){
    var i = null;
    for (i = 0; JSON.length > i; i += 1) {
        if (JSON[i].name === tagName) {
            return true;
        }
    }
    return false;
};

function indice2dArreglo(pArreglo,pElemento){
    var fila = pArreglo.filter(function(value,index) {return value[0]==pElemento;});
    return fila;
};


function openInNewTab(pUrl) {
    var win = window.open(pUrl, '_blank');
    win.focus();
}

function xor(x,y){
    return true==(x!==y);
}




