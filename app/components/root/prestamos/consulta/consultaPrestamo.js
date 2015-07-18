'use strict';

angular.module('univerApp.root.prestamos.consulta', ['ui.router','ngLoadingSpinner'])

        .controller('consultaPrestamoCtrl', ['$scope','$rootScope', 'pagosRest', function($scope,$rootScope, pagosRest) {

                /*Init UI*/
                uiInitAccordion();
        
               
        
                /*GET*/
                if ($rootScope.tipoConsultaSeleccionada === 1) {
                    pagosRest.getEstadoCuenta(function(data) {
                        $rootScope.informeSeleccionado = data;
                        setTimeout(function() {
                            if ($rootScope.informeSeleccionado.interesesprestamos.length > 0)
                                $('.ui.accordion.tabla').accordion('open', 0);
                            ajustarTablaScroll('.ui.table.Morosidad');
                            ajustarTablaScroll('.ui.table.Informe');
                            $('.ui.table.Informe').floatThead('reflow');
                            $('.ui.table.Morosidad').floatThead('reflow');
                            $scope.$apply();
                        }, 200);
                        console.log(JSON.stringify($rootScope.informeSeleccionado));
                    }, $rootScope.caratulaSeleccionada.idCaratulaPrestamo);
                }


                $scope.eliminarUltimoPago = function(pUltimoPago,pUltimoPagoId){
                    var ultimoPago = {
                        "id": {
                            "idPagosPrestamo": pUltimoPagoId.idPagosPrestamo,
                            "idCaratulaPrestamo": pUltimoPagoId.idCaratulaPrestamo
                        },
                        "pago": {
                            "idPago": pUltimoPago.idPago,
                            "fechaPago": pUltimoPago.fechaPago,
                            "montoPago": pUltimoPago.montoPago,
                            "observaciones": pUltimoPago.observaciones,
                            "sobrante": pUltimoPago.sobrante,
                            "banco": pUltimoPago.banco,
                            "detalle": pUltimoPago.detalle,
                            "pagosprestamos": []
                        }
                    };
                    pagosRest.postPagoEliminar(function(data) {
                        $rootScope.informeSeleccionado = data;
                        alert("Ultimo Pago Eliminado Correctamente");
                        ajustarTablaScroll('.ui.table.Morosidad');
                        ajustarTablaScroll('.ui.table.Informe');
                        $('.ui.table.Informe').floatThead('reflow');
                        $('.ui.table.Morosidad').floatThead('reflow');                       
                    },ultimoPago);
                };     
                
                $scope.fechaFormatoVista = function(pFecha) {
                    return getFechaFormatoVista(pFecha);

                };
                
                $scope.imprimirCaratula = function(){
                  imprimeConsulta($rootScope.nombreCompletoClienteSeleccionado,$rootScope.desgloseSeleccionado.monto, $rootScope.informeSeleccionado.pagosprestamos,$rootScope.informeSeleccionado.interesesprestamos,$rootScope.informeSeleccionado.sobranteActual,$rootScope.informeSeleccionado.fechaProxPago);  
                };
                

                angular.element(document).ready(function() {
                    $('.ui.accordion.tabla.ultimoPago').accordion('open', 0);
                });




            }]);