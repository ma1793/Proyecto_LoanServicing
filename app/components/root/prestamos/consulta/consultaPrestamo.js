'use strict';

angular.module('univerApp.root.prestamos.consulta', ['ui.router'])

    .controller('consultaPrestamoCtrl', ['$rootScope',function($rootScope) {


        uiInitAccordion();
        console.log(JSON.stringify($rootScope.informeSeleccionado));

    }]);