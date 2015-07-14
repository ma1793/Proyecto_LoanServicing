'use strict';

angular.module('univerApp.root.prestamos.caratula', ['ui.router'])

        .controller('caratulaCtrl', ['$scope', '$rootScope', 'caratulasRest','ModalService','$state', function($scope, $rootScope, caratulasRest,ModalService,$state) {

                //UI Components ***
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
                    if ($scope.acreedorSeleccionado != null && $rootScope.plazoSeleccionado != null ) {
                        $scope.cumpleDropdowns = true;
                    }
                   
                    $scope.comprobarCumpleFormulario();
                };

                $scope.comprobarCumpleFormulario = function() {
                    $scope.cumpleFormulario = $scope.cumpleInputs && $scope.cumpleDropdowns;
                    setTimeout(function() {$scope.$apply();});
                };


                //Garantia*****************************

                $rootScope.abrirModalGarantias = function() {
                    ModalService.showModal({
                        templateUrl: "app/components/root/estructuraModal/estructuraModalView.html",
                        controller: "estructuraModalCtrl",
                        inputs: {
                            steps: [['Garantía', 'Selección de Garantía', 'active', '<elegir.garantia/>']],
                            titulo: "Agregar  Garántías a Carátula de Préstamo "
                        }
                    });
                    esperaTiempoFuncion(modalOpen, 300);
                };
                
                $scope.removeGarantia = function(index) {
                    $rootScope.listaGarantiasCaratula.splice(index, 1);
                };
              

               
             

                //Acreedor*****************************
                $scope.selectedDDAcreedor = -1;
                $scope.selectAcreedor = function(pAcreedor, pIndice) {
                    $scope.acreedorSeleccionado = pAcreedor;
                    $scope.selectedDDAcreedor = pIndice;
                };
                $scope.pagoMensual = function() {
                    return $rootScope.desgloseSeleccionado.monto * ($rootScope.desgloseSeleccionado.tasaAnual / 100) / 12;
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
                            "idAcreedor": $scope.acreedorSeleccionado.idAcreedor,
                            "cedula": $scope.acreedorSeleccionado.cedula
                        },
                        "desglocegasto": {
                            "idDesgloceGasto": $rootScope.desgloseSeleccionado.idDesgloceGasto
                        },
                        "fechaConstitucion": $scope.fechaConstitucion.toJSON(),
                        "fechaVencimiento": $scope.fechaVencimiento.toJSON() ,
                        "fechaProxPago": $scope.agregarMesesFecha($scope.fechaConstitucion.toJSON(), $rootScope.desgloseSeleccionado.cantidadMeses) + "T00:00:00",
                        "plazo": $rootScope.plazoSeleccionado.name,
                        "faltanteActual": $scope.faltanteActualCaratula,
                        "sobranteActual": $scope.sobranteActualCaratula,
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
                        console.log($rootScope.caratulaSeleccionada.contacto.idContacto);
                        caratulaJSON.idCaratulaPrestamo = $rootScope.caratulaSeleccionada.idCaratulaPrestamo;
                        caratulaJSON.contacto.idContacto = $rootScope.caratulaSeleccionada.contacto.idContacto; 
                        caratulaJSON.contacto.persona.idPersona = $rootScope.caratulaSeleccionada.contacto.idContacto; 

                        
                    }
                    console.log(JSON.stringify(caratulaJSON));
                    return caratulaJSON;

                };



                $scope.construirPrimerPagoJSON = function(pIdCaratulaPost) {
                    var primerPagoJSON = {
                        "id": {
                            "idCaratulaPrestamo": pIdCaratulaPost
                        },
                        "pago": {
                            "fechaPago": $scope.fechaConstitucion.toJSON(),
                            "montoPago": $rootScope.desgloseSeleccionado.cantidadMeses * $scope.pagoMensual(),
                            "faltante": 0.00,
                            "sobrante": 0.00,
                            "detalle": $rootScope.desgloseSeleccionado.cantidadMeses + " meses"
                        }
                    };
                    console.log(JSON.stringify(primerPagoJSON));
                    caratulasRest.postPrimerPago(function(data) {
                          $rootScope.abrirDialog("Imprimir Elemento","¿Desea Imprimir el Formulario?","print");
                          $state.go('root.tareas');
                    },primerPagoJSON);
                    
                };



                $scope.crearCaratulaFormularioCompleto = function() {
                    var idCaratula;
                    
                    caratulasRest.postCrearCaratula(function(data) {
                        console.log("id caratula");
                        idCaratula = data.idCaratulaPrestamo;
                        console.log(idCaratula);
                        if ($rootScope.tipoOperacionTramite == 1) {
                            $scope.construirPrimerPagoJSON(idCaratula);
                            
                        }
                        else {
                            $rootScope.abrirDialog("Imprimir Elemento","¿Desea Imprimir el Formulario?","print");
                          $state.go('root.tareas');
                        }
                    }, $scope.construirCaratulaJSON());
                    
                    
                };


                $rootScope.imprimirElemento = function() {
                    imprimeCaratula($scope.acreedorSeleccionado.cedula, $rootScope.nombreCompletoClienteSeleccionado, getFechaFormatoVista($scope.fechaConstitucion.toJSON()), getFechaFormatoVista($scope.fechaVencimiento), currencyFormat($rootScope.desgloseSeleccionado.monto), $rootScope.desgloseSeleccionado.tasaAnual + "", $rootScope.desgloseSeleccionado.tasaAnualMoratoria + "", currencyFormat($scope.pagoMensual()), $scope.nombreContacto + " " + $scope.primerApellidoContacto + " " + $scope.segundoApellidoContacto, $scope.emailContacto, $scope.empresaContacto, $scope.telCasaContacto, $scope.telCelularContacto, $scope.telCelularContacto, $scope.telFaxContacto, $scope.direccionContacto, $scope.comentarioCaratula, $rootScope.listaGarantiasCaratula);
                };


                $scope.setValoresCaratula = function() {

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

                    
                    $scope.fechaConstitucion = new Date($rootScope.caratulaSeleccionada.fechaConstitucion);
                    $scope.fechaVencimiento = new Date($rootScope.caratulaSeleccionada.fechaVencimiento);

                    caratulasRest.getAcreedores(function(data) {
                        $scope.listaAcreedores = data;
                        setTimeout(function() {
                        $("#ID_DropdownAcreedor").dropdown('set selected',$rootScope.caratulaSeleccionada.acreedor.idAcreedor);
                        },200);   
                        $scope.acreedorSeleccionado = $rootScope.caratulaSeleccionada.acreedor;
                    });
                    
                    if ($rootScope.caratulaSeleccionada.contacto.comentario != null && $rootScope.caratulaSeleccionada.contacto.comentario != "") {
                        $scope.comentarioCaratula = $rootScope.caratulaSeleccionada.contacto.comentario;
                        $('.ui.accordion.Caratula.Comentario').accordion('open', 0);
                    }
                    else
                        $scope.comentarioCaratula = "";
                    
                    
                    $scope.faltanteActualCaratula = $rootScope.caratulaSeleccionada.faltanteActual;
                    $scope.sobranteActualCaratula = $rootScope.caratulaSeleccionada.sobranteActual;
                    $scope.estadoMorosidad = $rootScope.caratulaSeleccionada.estadoMorosidad;
                    
                    
                    
                    var contador;
                   
                   $rootScope.listaGarantiasCaratula = [];
                    if ($rootScope.caratulaSeleccionada.garantias.length > 0) {
                        for (contador = 0; contador < $rootScope.caratulaSeleccionada.garantias.length; contador++) {
                            $rootScope.listaGarantiasCaratula.push(
                                    {
                                        "idGarantia":$rootScope.caratulaSeleccionada.garantias[contador].idGarantia,
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
                        $('.ui.accordion.Caratula.Garantias').accordion('open', 0);
                    }
                    
                    setTimeout(function() {
                        $rootScope.setValorDropDownPlazo($rootScope.caratulaSeleccionada.plazo);
                    }, 300);  

                };

                $scope.initFormularioCaratula = function() {
                    if ($rootScope.tipoOperacionTramite === 2) {
                        $scope.setValoresCaratula();
                    }else{
                        $rootScope.listaGarantiasCaratula = [];
                        $scope.faltanteActualCaratula = 0;
                        $scope.sobranteActualCaratula = 0;
                        $scope.estadoMorosidad = 0;
                        
                        $('.ui.accordion.Caratula.Garantias').accordion('open', 0); 
                        caratulasRest.getAcreedores(function(data) {
                            $scope.listaAcreedores = data;
                        });
                    }
                    
                };

                angular.element(document).ready(function() {
                    $scope.initFormularioCaratula();
                    setTimeout(function() {$scope.$apply();});
                    setTimeout(function () {$scope.comprobarInput($scope.formularioCaratulaPrestamo.$valid);},1000);

                });






            }]);
