'use strict';

angular.module('univerApp.root.alquileres.consulta', ['ui.router'])

    .controller('consultaAlquilerCtrl', ['$rootScope',function($rootScope) {

        console.log("entro iniciar");
        uiInitAccordion();
        console.log(JSON.stringify($rootScope.informeSeleccionado));

    }]);