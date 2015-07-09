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
                    $scope.cumpleInputs = pEstadoFormulario;
                    $scope.comprobarCumpleFormulario();
                };

                $scope.comprobarDropDowns = function() {
                    if ($rootScope.mesSeleccionado != null && $rootScope.comisionSeleccionada != null && $rootScope.honorarioGastoSeleccionado != null && $rootScope.aperturaSeleccionada != null && $rootScope.moratoriaSeleccionada != null && $rootScope.tasaAnualSeleccionada != null) {
                        $scope.cumpleDropdowns = true;
                    }
                    $scope.comprobarCumpleFormulario();
                };

                $scope.comprobarCumpleFormulario = function() {
                    $scope.cumpleFormulario = $scope.cumpleInputs && $scope.cumpleDropdowns;
                    setTimeout(function(){ $scope.$apply();});
                };



                
                
                
                


                //******************************
                //Cobros legales adicionales

                $scope.cobrosLegalesAdicionales = [];

                $scope.addInputCobroLegalAdicional = function() {
                    $scope.cobrosLegalesAdicionales.push({Descripcion: '', Monto: null});
                    setTimeout(function () {$scope.comprobarInput($scope.formularioDesglosePrestamo.$valid);},300);
                };
                $scope.addPrimerElementoCobroLegalAdicional = function(){
                    var operacion = 1;
                    if($scope.cobrosLegalesAdicionales.length === 0){
                         $scope.cobrosLegalesAdicionales.push({Descripcion: '', Monto: null});
                         operacion = 2;
                     }
                    if ($scope.cobrosLegalesAdicionales.length === 1 && $scope.cobrosLegalesAdicionales[0].Monto == null && $scope.cobrosLegalesAdicionales[0].Descripcion == "" && operacion === 1)
                        $scope.cobrosLegalesAdicionales.splice(0, 1);
                     setTimeout(function () {$scope.comprobarInput($scope.formularioDesglosePrestamo.$valid);},300);

                };
                

                $scope.removeInputCobroLegalAdicional = function(index) {
                    $scope.cobrosLegalesAdicionales.splice(index, 1);
                    if($scope.cobrosLegalesAdicionales.length === 0)
                        $('.ui.accordion.CobrosAdicionalesLegales').accordion('close', 0);          
                    setTimeout(function(){$scope.comprobarInput($scope.formularioDesglosePrestamo.$valid);},300);

                };


                //*******************************

                //*******************************
                //Cobros Adicionales

                $scope.cobrosAdicionales = [];

                $scope.addInputCobroAdicional = function() {
                    $scope.cobrosAdicionales.push({Descripcion: '', Monto: null});
                    setTimeout(function () {$scope.comprobarInput($scope.formularioDesglosePrestamo.$valid);},300);

                };
                
                $scope.addPrimerElementoCobroAdicional = function(){
                    var operacion = 1;
                    if($scope.cobrosAdicionales.length === 0){
                         $scope.cobrosAdicionales.push({Descripcion: '', Monto: null});
                         operacion = 2;
                     }
                    if ($scope.cobrosAdicionales.length === 1 && $scope.cobrosAdicionales[0].Monto == null && $scope.cobrosAdicionales[0].Descripcion == "" && operacion === 1)
                        $scope.cobrosAdicionales.splice(0, 1);
                    setTimeout(function () {$scope.comprobarInput($scope.formularioDesglosePrestamo.$valid);},300);

                };

                $scope.removeInputCobroAdicional = function(index) {
                    $scope.cobrosAdicionales.splice(index, 1);
                    if($scope.cobrosAdicionales.length === 0)
                        $('.ui.accordion.CobrosAdicionales').accordion('close', 0);  
                    setTimeout(function () {$scope.comprobarInput($scope.formularioDesglosePrestamo.$valid);},300);

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
                    var saldoDesglose = $scope.saldoTotal;
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
                        desgloseJSON.idDesgloceGasto = $rootScope.desgloseSeleccionado.idDesgloceGasto;
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
                    console.log(desgloseJSON);
                    desglosesRest.postCrearDesglose(function(data) {
                        $rootScope.abrirDialog("Elemento Posteado Correctamente","¿Desea Volver a la Página Principal?","home");
                    }, desgloseJSON);
            


                };

               
                $scope.saldo = function() {
                    var contador;
                    var sumCobrosLegalesAdicionales = 0;
                    var sumCobrosAdicionales = 0;


                    if ($scope.cumpleFormulario) {
                        for (contador = 0; contador < $scope.cobrosLegalesAdicionales.length; contador++) {
                            if ($.isNumeric($scope.cobrosLegalesAdicionales[contador].Monto) && $scope.cobrosLegalesAdicionales[contador].Descripcion != "")
                                sumCobrosLegalesAdicionales += $scope.cobrosLegalesAdicionales[contador].Monto;

                        }
                        for (contador = 0; contador < $scope.cobrosAdicionales.length; contador++) {
                            if ($scope.cobrosAdicionales[contador].Monto != null && $scope.cobrosAdicionales[contador].Descripcion != "")
                                sumCobrosAdicionales += $scope.cobrosAdicionales[contador].Monto;

                        }

                        var resultado = $scope.montoPrestamo - ($scope.montoPrestamo * (($rootScope.comisionSeleccionada.name) / 100)
                                + $scope.montoPrestamo * (($rootScope.honorarioGastoSeleccionado.name) / 100)
                                + $scope.montoPrestamo * (($rootScope.aperturaSeleccionada.name) / 100)
                                + (($scope.montoPrestamo * (($rootScope.tasaAnualSeleccionada.name) / 100)) / 12) * ($rootScope.mesSeleccionado.name)

                                ) - ($scope.traslado + $scope.honorariosTimbres + sumCobrosLegalesAdicionales + sumCobrosAdicionales);

                        $scope.saldoTotal = resultado;
                        return resultado;
                    }
                    else {
                        $scope.saldoTotal = 0;
                        return 0;
                    }
                };




                $scope.crearDesgloseFormularioCompleto = function() {
                    $scope.construirCrearDesgloseJSON();
              
                };

                $rootScope.imprimirDesglose = function() {
                    imprimeDesglose($rootScope.nombreCompletoClienteSeleccionado, currencyFormat($scope.montoPrestamo), $rootScope.tasaAnualSeleccionada.name, $rootScope.moratoriaSeleccionada.name, $rootScope.comisionSeleccionada.name, currencyFormat($scope.comision()), $rootScope.honorarioGastoSeleccionado.name, currencyFormat($scope.honorarioGasto()), currencyFormat($scope.honorariosTimbres), $rootScope.aperturaSeleccionada.name, currencyFormat($scope.apertura()), $rootScope.mesSeleccionado.name, currencyFormat($scope.mesInteres()), currencyFormat($scope.traslado), currencyFormat(parseFloat($scope.saldoTotal)), $scope.cobrosAdicionales, $scope.cobrosLegalesAdicionales, $scope.comentarioDesglose);
                    console.log("casa");    
                };






                $scope.setValoresDesglose = function() {
                    $scope.saldoTotal = 0;
                    $scope.montoPrestamo = $rootScope.desgloseSeleccionado.monto;

                    if ($rootScope.desgloseSeleccionado.comentario != null && $rootScope.desgloseSeleccionado.comentario != "") {
                        $scope.comentarioDesglose = $rootScope.desgloseSeleccionado.comentario;
                        $('.ui.accordion.Comentario').accordion('open', 0);
                    }
                    $scope.traslado = $rootScope.desgloseSeleccionado.trasladoabogado;
                    $scope.honorariosTimbres = $rootScope.desgloseSeleccionado.honorariostimbres;

                    
                    var contador;
                    $scope.cobrosLegalesAdicionales = [];
                    if ($rootScope.desgloseSeleccionado.cobrolegaladicionals.length > 0) {
                        for (contador = 0; contador < $rootScope.desgloseSeleccionado.cobrolegaladicionals.length; contador++) {
                            $scope.cobrosLegalesAdicionales.push({idCobroLegalAdicional: $rootScope.desgloseSeleccionado.cobrolegaladicionals[contador].idCobroLegalAdicional, Descripcion: $rootScope.desgloseSeleccionado.cobrolegaladicionals[contador].descripcion, Monto: $rootScope.desgloseSeleccionado.cobrolegaladicionals[contador].monto});
                        }
                        $('.ui.accordion.CobrosAdicionalesLegales').accordion('open', 0);
                    }

                    $scope.cobrosAdicionales = [];
                    if ($rootScope.desgloseSeleccionado.cobroadicionals.length > 0) {
                        for (contador = 0; contador < $rootScope.desgloseSeleccionado.cobroadicionals.length; contador++) {
                            $scope.cobrosAdicionales.push({idCobroAdicional: $rootScope.desgloseSeleccionado.cobroadicionals[contador].idCobroAdicional, Descripcion: $rootScope.desgloseSeleccionado.cobroadicionals[contador].descripcion, Monto: $rootScope.desgloseSeleccionado.cobroadicionals[contador].monto});
                        }
                        $('.ui.accordion.CobrosAdicionales').accordion('open', 0);
                    }
                    setTimeout(function(){ $scope.$apply();});
                    setTimeout(function() {
                        $rootScope.setValorDropDownTasaAnual($rootScope.desgloseSeleccionado.tasaAnual);
                        $rootScope.setValorDropDownMoratoria($rootScope.desgloseSeleccionado.tasaAnualMoratoria);
                        $rootScope.setValorDropDownComision($rootScope.desgloseSeleccionado.comision);
                        $rootScope.setValorDropDownApertura($rootScope.desgloseSeleccionado.apertura);
                        $rootScope.setValorDropDownHonorariosGastos($rootScope.desgloseSeleccionado.honorarios);
                        $rootScope.setValorDropDownMeses($rootScope.desgloseSeleccionado.cantidadMeses);
                    }, 1000);  
                    setTimeout(function () {$scope.comprobarInput($scope.formularioDesglosePrestamo.$valid);},300);
                };

                $scope.initFormularioDesglose = function() {
                    if($rootScope.tipoOperacionTramite === 2){
                        $scope.setValoresDesglose();
                    }  
                };
                
                
                angular.element(document).ready(function() {
                    $scope.initFormularioDesglose();
                    setTimeout(function(){ $scope.$apply();});
                });     



            }]);
