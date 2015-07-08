'use strict';

angular.module('univerApp.root.prestamos.desglose', ['ui.router'])

        .controller('desgloseCtrl', ['$scope', '$rootScope', 'desglosesRest', function($scope, $rootScope, desglosesRest) {

                /*Init UI*/
                uiInitAccordion();

                //Init condicion formulario
                $scope.cumpleDropdowns = false;
                $scope.cumpleInputs = false;
                $scope.cumpleFormulario = false;

                // Verificacion Formulario
                $scope.comprobarInput = function(pEstadoFormulario) {
                    console.log(pEstadoFormulario);
                    $scope.cumpleInputs = pEstadoFormulario;
                    $scope.comprobarCumpleFormulario();
                };

                $scope.comprobarDropDowns = function() {
                    if ($rootScope.mesSeleccionado != null) {
                        $scope.cumpleDropdowns = true;
                    }
                    $scope.comprobarCumpleFormulario();
                };

                $scope.comprobarCumpleFormulario = function() {
                    $scope.cumpleFormulario = $scope.cumpleInputs && $scope.cumpleDropdowns;
                };



                /*Init*/
                var saldoTotal = 0;
                $scope.comentarioDesglose = "";
                
                
                


                //******************************
                //Cobros legales adicionales

                $scope.cobrosLegalesAdicionales = [{Descripcion: '', Monto: ''}];

                $scope.addInputCobroLegalAdicional = function() {
                    $scope.cobrosLegalesAdicionales.push({Descripcion: '', Monto: ''});

                };

                $scope.removeInputCobroLegalAdicional = function(index) {
                    if ($scope.cobrosLegalesAdicionales.length > 1)
                        $scope.cobrosLegalesAdicionales.splice(index, 1);
                    else
                        $scope.cobrosLegalesAdicionales = [{Descripcion: '', Monto: ''}];
                };


                //*******************************

                //*******************************
                //Cobros Adicionales

                $scope.cobrosAdicionales = [{Descripcion: '', Monto: ''}];

                $scope.addInputCobroAdicional = function() {
                    $scope.cobrosAdicionales.push({Descripcion: '', Monto: ''});
                };

                $scope.removeInputCobroAdicional = function(index) {
                    if ($scope.cobrosAdicionales.length > 1)
                        $scope.cobrosAdicionales.splice(index, 1);
                    else
                        $scope.cobrosAdicionales = [{Descripcion: '', Monto: ''}];
                };
                //*******************************





                $scope.comision = function() {
                    if($rootScope.comisionSeleccionada != null)
                        return $scope.montoPrestamo * (($rootScope.comisionSeleccionada.name) / 100);
                    else
                        return 0;                    
                };
                
                $scope.honorarioGasto = function() {
                    if($rootScope.honorarioGastoSeleccionado != null)
                        return $scope.montoPrestamo * (($rootScope.honorarioGastoSeleccionado.name) / 100);
                    else
                        return 0;
                };
                $scope.apertura = function() {
                    if($rootScope.aperturaSeleccionada != null)
                        return $scope.montoPrestamo * (($rootScope.aperturaSeleccionada.name) / 100);
                    else
                        return 0;
                };
                $scope.mesInteres = function() {
                    if($rootScope.tasaAnualSeleccionada != null && $rootScope.mesSeleccionado != null)
                        return (($scope.montoPrestamo * (($rootScope.tasaAnualSeleccionada.name) / 100)) / 12) * ($rootScope.mesSeleccionado.name);
                    else
                        return 0;
                };

                $scope.construirCrearDesgloseJSON = function() {
                    var saldoDesglose = saldoTotal;
                    var contador;
                    var desgloseJSON = {
                        "persona": {
                            "idPersona": $rootScope.clienteSeleccionado.idPersona
                        },
                        "monto": $scope.montoPrestamo,
                        "tasaAnual": $rootScope.tasaAnualSeleccionada.name,
                        "tasaAnualMoratoria": $rootScope.moratoriaSeleccionada.name ,
                        "comision": $rootScope.comisionSeleccionada.name,
                        "honorarios": $rootScope.honorarioGastoSeleccionado.name,
                        "apertura": $rootScope.aperturaSeleccionada.name,
                        "cantidadMeses": $rootScope.mesSeleccionado.name,
                        "saldo": saldoDesglose,
                        "comentario": $scope.comentarioDesglose,
                        "trasladoabogado": $scope.traslado,
                        "honorariostimbres": $scope.honorariosTimbres,
                        "cobroadicionals": [],
                        "cobrolegaladicionals": []
                    };
                    if ($rootScope.tipoOperacionTramite === 2) {
                        desgloseJSON.idDesgloceGasto = $rootScope.VG_IdDesgloseSeleccionado;
                    }

                    for (contador = 0; contador < $scope.cobrosLegalesAdicionales.length; contador++) {
                        if ($.isNumeric($scope.cobrosLegalesAdicionales[contador].Monto)) {
                            if ($rootScope.tipoOperacionTramite === 2) {
                                desgloseJSON.cobrolegaladicionals.push({
                                    "descripcion": $scope.cobrosLegalesAdicionales[contador].Descripcion,
                                    "monto": $scope.cobrosLegalesAdicionales[contador].Monto

                                });
                            }
                            else {
                                desgloseJSON.cobrolegaladicionals.push({
                                    "idCobroLegalAdicional": $scope.cobrosLegalesAdicionales[contador].idCobroLegalAdicional,
                                    "descripcion": $scope.cobrosLegalesAdicionales[contador].Descripcion,
                                    "monto": $scope.cobrosLegalesAdicionales[contador].Monto

                                });
                            }
                        }
                    }
                    for (contador = 0; contador < $scope.cobrosAdicionales.length; contador++) {
                        if ($.isNumeric($scope.cobrosAdicionales[contador].Monto)) {
                            if ($rootScope.tipoOperacionTramite === 2) {
                                desgloseJSON.cobroadicionals.push({
                                    "descripcion": $scope.cobrosAdicionales[contador].Descripcion,
                                    "monto": $scope.cobrosAdicionales[contador].Monto
                                });
                            }
                            else {
                                desgloseJSON.cobroadicionals.push({
                                    "idCobroAdicional": $scope.cobrosAdicionales[contador].idCobroAdicional,
                                    "descripcion": $scope.cobrosAdicionales[contador].Descripcion,
                                    "monto": $scope.cobrosAdicionales[contador].Monto
                                });
                            }
                        }
                    }
                    R_crearDesgloce(desgloseJSON);


                };

               
                $scope.saldo = function() {
                    var contador;
                    var SumCobrosLegalesAdicionales = 0;
                    var SumCobrosAdicionales = 0;

            
                    for (contador = 0; contador < $scope.cobrosLegalesAdicionales.length; contador++) {
                        if ($.isNumeric($scope.cobrosLegalesAdicionales[contador].Monto) && $scope.cobrosLegalesAdicionales[contador].Descripcion != "")
                            SumCobrosLegalesAdicionales += $scope.cobrosLegalesAdicionales[contador].Monto;
           
                    }
                    for (contador = 0; contador < $scope.cobrosAdicionales.length; contador++) {
                        if ($scope.cobrosAdicionales[contador].Monto != null && $scope.cobrosAdicionales[contador].Descripcion != "")
                            SumCobrosAdicionales += $scope.cobrosAdicionales[contador].Monto;
                      
                    }

                    var resultado = $scope.montoPrestamo - ($scope.montoPrestamo * (($rootScope.comisionSeleccionada.name) / 100)
                            + $scope.montoPrestamo * (($rootScope.honorarioGastoSeleccionado.name) / 100)
                            + $scope.montoPrestamo * (($rootScope.aperturaSeleccionada.name) / 100)
                            + (($scope.montoPrestamo * (($rootScope.tasaAnualSeleccionada.name) / 100)) / 12) * ($rootScope.mesSeleccionado.name)

                            ) - ($scope.traslado + $scope.honorariosTimbres + SumCobrosLegalesAdicionales + SumCobrosAdicionales);

               
                    return 0;
                };




                $scope.crearDesgloseFormularioCompleto = function() {
                    $scope.construirCrearDesgloseJSON();
                    if (VG_PostDesglose === 1) {
                        modalConfirmarImpresion();
                    }
                };

                $rootScope.imprimirDesglose = function() {
                    imprimeDesglose($rootScope.nombreCompletoClienteSeleccionado, currencyFormat($scope.montoPrestamo), $rootScope.tasaAnualSeleccionada.name, $rootScope.moratoriaSeleccionada.name , $rootScope.comisionSeleccionada.name, currencyFormat($scope.comision()), $rootScope.honorarioGastoSeleccionado.name, currencyFormat($scope.honorarioGasto()), currencyFormat($scope.honorariosTimbres), $rootScope.aperturaSeleccionada.name, currencyFormat($scope.apertura()), $rootScope.mesSeleccionado.name, currencyFormat($scope.mesInteres()), currencyFormat($scope.traslado), currencyFormat(parseFloat(saldoTotal)), $scope.cobrosAdicionales, $scope.cobrosLegalesAdicionales, $scope.comentarioDesglose);
                   
                };

           




                $rootScope.setValoresDesglose = function() {
                    $scope.montoPrestamo = $rootScope.desgloseSeleccionado.monto;
                
                
                    if ($rootScope.desgloseSeleccionado.comentario != null && $rootScope.desgloseSeleccionado.comentario != "") {
                        $scope.comentarioDesglose = $rootScope.desgloseSeleccionado.comentario;
                        $('.ui.accordion.Comentario').accordion('open', 0);
                    }

                    $scope.traslado = $rootScope.desgloseSeleccionado.trasladoabogado;
                    $scope.honorariosTimbres = $rootScope.desgloseSeleccionado.honorariostimbres;

                    var contador;
                    if ($rootScope.desgloseSeleccionado.cobrolegaladicionals.length > 0) {
                        $scope.cobrosLegalesAdicionales = [];
                        $('.ui.accordion.CobrosAdicionalesLegales').accordion('open', 0);
                        for (contador = 0; contador < $rootScope.desgloseSeleccionado.cobrolegaladicionals.length; contador++) {
                            $scope.cobrosLegalesAdicionales.push({idCobroLegalAdicional: $rootScope.desgloseSeleccionado.cobrolegaladicionals[contador].idCobroLegalAdicional, Descripcion: $rootScope.desgloseSeleccionado.cobrolegaladicionals[contador].descripcion, Monto: $rootScope.desgloseSeleccionado.cobrolegaladicionals[contador].monto});
                        }
                    }
                    else {
                        $scope.cobrosLegalesAdicionales = [{Descripcion: '', Monto: null}];
                    }

                    if ($rootScope.desgloseSeleccionado.cobroadicionals.length > 0) {
                        $scope.cobrosAdicionales = [];
                        $('.ui.accordion.CobrosAdicionales').accordion('open', 0);
                        for (contador = 0; contador < $rootScope.desgloseSeleccionado.cobroadicionals.length; contador++) {
                            $scope.cobrosAdicionales.push({idCobroAdicional: $rootScope.desgloseSeleccionado.cobroadicionals[contador].idCobroAdicional, Descripcion: $rootScope.desgloseSeleccionado.cobroadicionals[contador].descripcion, Monto: $rootScope.desgloseSeleccionado.cobroadicionals[contador].monto});
                        }
                    }
                    else {
                        $scope.cobrosAdicionales = [{Descripcion: '', Monto: null}];
                    }


                };


                $rootScope.initLimpiarFormularioDesglose = function() {
                    $scope.montoPrestamo = "";
                    $scope.traslado = "";
                    $scope.honorariosTimbres = "";
                    $scope.comentarioDesglose = "";

                    $('.ui.dropdown').dropdown('restore defaults');
               
                    $scope.cobrosAdicionales = [{Descripcion: '', Monto: ''}];
                    $scope.cobrosLegalesAdicionales = [{Descripcion: '', Monto: ''}];

                };
                
                $rootScope.initLimpiarFormularioDesglose()




            }]);
