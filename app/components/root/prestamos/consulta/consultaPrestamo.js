'use strict';

angular.module('univerApp.root.prestamos.consulta', ['ui.router'])

        .controller('consultaPrestamoCtrl', ['$scope','$rootScope', 'pagosRest', function($scope,$rootScope, pagosRest) {

                /*Init UI*/
                uiInitAccordion();
        
                /*GET*/
                pagosRest.getEstadoCuenta(function(data) {
                    $rootScope.informeSeleccionado = data;
                    console.log($rootScope.informeSeleccionado);
                }, $rootScope.caratulaSeleccionada.idCaratulaPrestamo);


                angular.element(document).ready(function() {
                    $('.ui.accordion.tabla').accordion('open', 0);
                    ajustarTablaScroll('.ui.table.Morosidad');
                    ajustarTablaScroll('.ui.table.Informe');

                    $('.ui.table.Informe').floatThead('reflow');
                    $('.ui.table.Morosidad').floatThead('reflow');
                });




            }]);