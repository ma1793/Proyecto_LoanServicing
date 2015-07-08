'use strict';

angular.module('univerApp.root.prestamos.caratula', ['ui.router'])

        .controller('caratulaCtrl', ['$scope', '$rootScope','caratulasRest' , function($scope, $rootScope,caratulasRest) {

                //UI Components ***
                uiInitAccordion();


                var pagoMensual = 0;

                $scope.removeGarantia = function(index) {
                    $rootScope.listaGarantiasCaratula.splice(index, 1);
                };

                $scope.abrirModalGarantias = function() {
                    R_getGarantiasCliente($rootScope.clienteSeleccionado.idPersona);
                    
                    $rootScope.listaGarantiasCliente = listaGarantiasClienteJSON;
                    modalAgregarGarantias();
                };

               

                //Acreedor*****************************
                $scope.selectedDDAcreedor = -1;
                $scope.selectAcreedor = function(pAcreedor, pIndice) {
                    $scope.selectedItemAcreedor = pAcreedor;
                    $scope.selectedDDAcreedor = pIndice;
                };
                $scope.pagoMensual = function() {
                    var condicionError = 0;
                    if ($scope.verificarCamposCaratula()) {
                        $("#ID_ButtonFinalizacionCaratula").show();
                        condicionError = 1;
                    }
                    else
                        $("#ID_ButtonFinalizacionCaratula").hide();
                    if ($rootScope.desgloseSeleccionado != null) {
                        $scope.combrobarCambioCaratula();
                    }

                    pagoMensual = $rootScope.desgloseSeleccionado.monto * ($rootScope.desgloseSeleccionado.tasaAnual / 100) / 12;
                    return pagoMensual;

                };


                $scope.verificarExisteAgregarValorDropdown = function(pFiltroDropDown, pTipoContadorDropDown, pIdDropdown, pValor) {
                    if ((pFiltroDropDown).length !== 0) {
                        $rootScope.plazoSeleccionado  = pValor;
                        $rootScope.setActiveOpcionValorDropDown(pIdDropdown, pFiltroDropDown[0].id);
                    }
                   
                };

               


                $scope.agregarMesesFecha = function(pFecha, pMeses) {
                    var year = pFecha.substring(0, 4);
                    var month = pFecha.substring(5, 7);
                    var day = pFecha.substring(8, 10);

                    var nuevaFecha = new Date(year, month - 1, day);
                    nuevaFecha.setMonth(nuevaFecha.getMonth() + pMeses);

                    var dd = nuevaFecha.getDate();
                    var mm = nuevaFecha.getMonth() + 1;
                    var yyyy = nuevaFecha.getFullYear();
                    if (dd < 10)
                        dd = "0" + dd;
                    if (mm < 10)
                        mm = "0" + mm;
                    return yyyy + "-" + mm + "-" + dd;
                };

                $scope.construirCaratulaJSON = function() {
                    if ($scope.verificarCamposCaratula()) {
                        var contador;
                        var caratulaJSON = {
                            "@type": "caratulaprestamo",
                            "contacto": {
                                "persona": {
                                    "telOficina": parseInt($scope.telOficinaContacto),
                                    "nombre": $scope.nombreContacto,
                                    "telCelular": parseInt($scope.telCelularContacto),
                                    "telFax": parseInt($scope.telFaxContacto),
                                    "telCasa": parseInt($scope.telCasaContacto)
                                },
                                "primerApellido": $scope.primerApellidoContacto,
                                "segundoApellido": $scope.segundoApellidoContacto,
                                "empresa": $scope.empresaContacto,
                                "direccion": $scope.direccionContacto,
                                "comentario": $scope.comentarioCaratula,
                                "correo": $scope.emailContacto
                            },
                            "acreedor": {
                                "idAcreedor": $scope.selectedItemAcreedor.idAcreedor,
                                "cedula": $scope.selectedItemAcreedor.cedula
                            },
                            "desglocegasto": {
                                "idDesgloceGasto": $rootScope.desgloseSeleccionado.idDesgloceGasto
                            },
                            "fechaConstitucion": $scope.fechaConstitucion + "T00:00:00",
                            "fechaVencimiento": $scope.fechaVencimiento + "T00:00:00",
                            "fechaProxPago": $scope.agregarMesesFecha($scope.fechaConstitucion, $rootScope.desgloseSeleccionado.cantidadMeses) + "T00:00:00",
                            "plazo": $rootScope.plazoSeleccionado ,
                            "faltanteActual": $scope.faltanteActualCaratula,
                            "sobranteActual": $scope.V_SobranteActualCaratula,
                            "estadoMorosidad": $scope.estadoMorosidad,
                            "garantias": []
                        };
                        for (contador = 0; contador < $rootScope.listaGarantiasCaratula.length; contador++) {
                            if ($.isNumeric($rootScope.listaGarantiasCaratula[contador].idGarantia)) {
                                caratulaJSON.garantias.push(
                                        {
                                            "idGarantia": $rootScope.listaGarantiasCaratula[contador].idGarantia,
                                            "canton": $rootScope.listaGarantiasCaratula[contador].canton,
                                            "provincia": {
                                                "idProvincia": $rootScope.listaGarantiasCaratula[contador].provincia.idProvincia,
                                                "descripcion": $rootScope.listaGarantiasCaratula[contador].provincia.descripcion
                                            },
                                            "distrito": $rootScope.listaGarantiasCaratula[contador].distrito,
                                            "finca": $rootScope.listaGarantiasCaratula[contador].finca,
                                            "medidas": $rootScope.listaGarantiasCaratula[contador].medidas,
                                            "numeroplano": $rootScope.listaGarantiasCaratula[contador].numeroplano
                                        });
                            }
                            else {
                                caratulaJSON.garantias.push(
                                        {
                                            "canton": $rootScope.listaGarantiasCaratula[contador].canton,
                                            "provincia": {
                                                "idProvincia": $rootScope.listaGarantiasCaratula[contador].provincia.idProvincia,
                                                "descripcion": $rootScope.listaGarantiasCaratula[contador].provincia.descripcion
                                            },
                                            "distrito": $rootScope.listaGarantiasCaratula[contador].distrito,
                                            "finca": $rootScope.listaGarantiasCaratula[contador].finca,
                                            "medidas": $rootScope.listaGarantiasCaratula[contador].medidas,
                                            "numeroplano": $rootScope.listaGarantiasCaratula[contador].numeroplano
                                        });
                            }
                        }
                        if ($rootScope.tipoOperacionTramite == 2) {
                            caratulaJSON.NewFile = 'idCaratulaPrestamo';
                            caratulaJSON.idCaratulaPrestamo = $rootScope.caratulaSeleccionada.idCaratulaPrestamo;
                        }
                    }
                };


                $rootScope.setValoresCaratula = function() {

                    $scope.nombreContacto = $rootScope.caratulaSeleccionada.contacto.persona.nombre;
                    $scope.primerApellidoContacto = $rootScope.caratulaSeleccionada.contacto.primerApellido;
                    $scope.segundoApellidoContacto = $rootScope.caratulaSeleccionada.contacto.segundoApellido;
                    $scope.emailContacto = $rootScope.caratulaSeleccionada.contacto.correo;
                    $scope.empresaContacto = $rootScope.caratulaSeleccionada.contacto.empresa;
                    $scope.direccionContacto = $rootScope.caratulaSeleccionada.contacto.direccion;
                    $scope.telCasaContacto = $rootScope.caratulaSeleccionada.contacto.persona.telCasa;
                    $scope.telCelularContacto = $rootScope.caratulaSeleccionada.contacto.persona.telCelular;
                    $scope.telOficinaContacto = $rootScope.caratulaSeleccionada.contacto.persona.telOficina;
                    $scope.telFaxContacto = $rootScope.caratulaSeleccionada.contacto.persona.telFax;
                    $scope.fechaConstitucion = $rootScope.caratulaSeleccionada.fechaConstitucion;
                    $scope.fechaVencimiento = $rootScope.caratulaSeleccionada.fechaVencimiento;

                    if ($rootScope.caratulaSeleccionada.contacto.comentario != null && $rootScope.caratulaSeleccionada.contacto.comentario != "") {
                        $scope.comentarioCaratula = $rootScope.caratulaSeleccionada.contacto.comentario;
                        $('.ui.accordion.Caratula.Comentario').accordion('open', 0);

                    }
                    $scope.faltanteActualCaratula = $rootScope.caratulaSeleccionada.faltanteActual;
                    $scope.sobranteActualCaratula = $rootScope.caratulaSeleccionada.sobranteActual;

                    $scope.estadoMorosidad = $rootScope.caratulaSeleccionada.estadoMorosidad;
                   

                    $rootScope.setActiveOpcionValorDropDown("DD_ID_Acreedor", $rootScope.caratulaSeleccionada.acreedor.idAcreedor);
                    $scope.selectedItemAcreedor = $rootScope.caratulaSeleccionada.acreedor;

                    var contodor;
                    if ($rootScope.caratulaSeleccionada.garantias.length > 0) {
                        $rootScope.listaGarantiasCaratula = [];
                        for (contador = 0; contador < $rootScope.caratulaSeleccionada.garantias.length; contador++) {
                            $rootScope.listaGarantiasCaratula.push(
                                    {
                                        "provincia": {
                                            "idProvincia": $rootScope.caratulaSeleccionada.garantias[contador].provincia.idProvincia,
                                            "descripcion": $rootScope.caratulaSeleccionada.garantias[contador].provincia.descripcion
                                        },
                                        "canton": $rootScope.caratulaSeleccionada.garantias[contador].canton,
                                        "distrito": $rootScope.caratulaSeleccionada.garantias[contador].distrito,
                                        "finca": $rootScope.caratulaSeleccionada.garantias[contador].finca,
                                        "medidas": $rootScope.caratulaSeleccionada.garantias[contador].medidas,
                                        "numeroplano": $rootScope.caratulaSeleccionada.garantias[contador].numeroplano
                                    }
                            );
                        }
                    }
                };

                $scope.construirPrimerPagoJSON = function() {
                    var primerPagoJSON = {
                        "id": {
                            "idCaratulaPrestamo": VG_IdCaratulaPOST
                        },
                        "pago": {
                            "fechaPago": $scope.fechaConstitucion + "T00:00:00",
                            "montoPago": $rootScope.desgloseSeleccionado.cantidadMeses * pagoMensual,
                            "faltante": 0.00,
                            "sobrante": 0.00,
                            "detalle": $rootScope.desgloseSeleccionado.cantidadMeses + " meses"
                        }
                    };
                };
                
                

                $scope.crearCaratula = function() {
                    if ($rootScope.VG_TextoBotonFinalizar === "IMPRIMIR") {
                        imprimeCaratula($scope.selectedItemAcreedor.cedula, $rootScope.nombreCompletoClienteSeleccionado, getFechaActualFormatoVista($scope.fechaConstitucion), getFechaActualFormatoVista($scope.fechaVencimiento), currencyFormat($rootScope.desgloseSeleccionado.monto), $rootScope.desgloseSeleccionado.tasaAnual + "", $rootScope.desgloseSeleccionado.tasaAnualMoratoria + "", currencyFormat(pagoMensual), $scope.nombreContacto + " " + $scope.primerApellidoContacto + " " + $scope.segundoApellidoContacto, $scope.emailContacto, $scope.empresaContacto, $scope.telCasaContacto, $scope.telCelularContacto, $scope.telCelularContacto, $scope.telFaxContacto, $scope.direccionContacto, $scope.comentarioCaratula, $rootScope.listaGarantiasCaratula);
                    }
                    else if ($rootScope.VG_TextoBotonFinalizar === "GUARDAR") {
                        $scope.construirCaratulaJSON();
                        if (VG_PostCaratula === 1) {
                            if ($rootScope.VG_IdOperacionPrestamoSeleccion === 4)
                                $scope.construirPrimerPagoJSON();
                        }
                    }
                };
                $rootScope.initFormularioCaratula = function() {

                    $scope.nombreContacto = "";
                    $scope.primerApellidoContacto = "";
                    $scope.segundoApellidoContacto = "";
                    $scope.emailContacto = "";
                    $scope.empresaContacto = "";
                    $scope.direccionContacto = "";
                    $scope.telCasaContacto = "";
                    $scope.telCelularContacto = "";
                    $scope.telOficinaContacto = "";
                    $scope.telFaxContacto = "";
                    $scope.fechaConstitucion = getFechaActual();
                    $scope.fechaVencimiento = "";
                    $rootScope.listaGarantiasCaratula = [];
                    $scope.comentarioCaratula = "";

                    $scope.faltanteActualCaratula = 0;
                    $scope.sobranteActualCaratula = 0;

                    $scope.estadoMorosidad = false;

                    $('.ui.dropdown').dropdown('restore defaults');
                    $scope.selectedDDAcreedor = -1;
                    $scope.selectedDDPlazo = -1;
                    $scope.selectedItemAcreedor = null;
                    $rootScope.plazoSeleccionado  = null;

                    $('.ui.accordion.Caratula.Comentario').accordion('close', 0);
                    $('.ui.accordion.Caratula.Garantias').accordion('open', 0);

                };


                $rootScope.imprimirCaratula = function() {
                    imprimeCaratula($scope.selectedItemAcreedor.cedula, $rootScope.nombreCompletoClienteSeleccionado, getFechaActualFormatoVista($scope.fechaConstitucion), getFechaActualFormatoVista($scope.fechaVencimiento), currencyFormat($rootScope.desgloseSeleccionado.monto), $rootScope.desgloseSeleccionado.tasaAnual + "", $rootScope.desgloseSeleccionado.tasaAnualMoratoria + "", currencyFormat(pagoMensual), $scope.nombreContacto + " " + $scope.primerApellidoContacto + " " + $scope.segundoApellidoContacto, $scope.emailContacto, $scope.empresaContacto, $scope.telCasaContacto, $scope.telCelularContacto, $scope.telCelularContacto, $scope.telFaxContacto, $scope.direccionContacto, $scope.comentarioCaratula, $rootScope.listaGarantiasCaratula);
                    
                };




            }]);
