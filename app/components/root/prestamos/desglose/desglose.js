'use strict';

angular.module('univerApp.root.prestamos.desglose', ['ui.router'])

        .controller('desgloseCtrl', [function() {

                /*Init UI*/
        
        
                /*Init*/
                $scope.comentarioDesglose = "";
                var saldoTotal = 0;

                //DropDown Comision ********************************************************
                DD_ComisionesJSON = [{
                        id: 1,
                        name: 4
                    }, {
                        id: 2,
                        name: 5
                    }, {
                        id: 3,
                        name: 6
                    }];
                $scope.DD_Comisiones = DD_ComisionesJSON;
                $scope.selectedDDComision = -1;
                $scope.selectComision = function(DD_Comision, pIndice) {
                    $scope.selectedItemComision = DD_Comision.name;
                    $scope.selectedDDComision = pIndice;
                };

                $scope.agregarNuevaComision = function() {
                    if ($.isNumeric($scope.nuevaComision) && ($scope.nuevaComision >= 0 && $scope.nuevaComision < 100)) {
                        contadorComision = contadorComision + 1;
                        DD_ComisionesJSON.push({
                            id: contadorComision,
                            name: $scope.nuevaComision
                        });
                        $scope.DD_Comisiones = DD_ComisionesJSON;
                        $scope.selectedItemComision = $scope.nuevaComision;
                        setTimeout(function() {
                            $("#ID_DropdownComision")
                                    .data()
                                    .moduleDropdown
                                    .action
                                    .activate(undefined, contadorComision.toString());
                        }, 100);
                    }
                    else {
                    }
                };

                //**************************************************************************


                //DropDown Honorarios y Gastos *******************************************
                var DD_HonorariosGastosJSON = [{
                        id: 1,
                        name: 1
                    }, {
                        id: 2,
                        name: 1.5
                    }, {
                        id: 3,
                        name: 2
                    }];

                $scope.DD_Honorarios_Gastos = DD_HonorariosGastosJSON;
                $scope.selectedDDHonorariosGastos = -1;
                $scope.selectHonorariosGastos = function(DD_Honorario_Gasto, pIndice) {
                    $scope.selectedItemHonorariosGastos = DD_Honorario_Gasto.name;
                    $scope.selectedDDHonorariosGastos = pIndice;
                };
                $scope.agregarNuevoHonorarioGasto = function() {
                    if ($.isNumeric($scope.nuevoHonorarioGasto) && ($scope.nuevoHonorarioGasto >= 0 && $scope.nuevoHonorarioGasto < 100)) {
                        contadorHonorarioGasto = contadorHonorarioGasto + 1;
                        DD_HonorariosGastosJSON.push({
                            id: contadorHonorarioGasto,
                            name: $scope.nuevoHonorarioGasto
                        });
                        $scope.DD_Honorarios_Gastos = DD_HonorariosGastosJSON;
                        $scope.selectedItemHonorariosGastos = $scope.nuevoHonorarioGasto;
                        setTimeout(function() {
                            $("#ID_DropdownHonorariosGastos")
                                    .data()
                                    .moduleDropdown
                                    .action
                                    .activate(undefined, contadorHonorarioGasto.toString())
                                    ;
                        }, 100);
                    }
                    else {
                    }
                };

                //**************************************************************************

                //DropDown Apertura y Manejo de Cuenta
                var DD_AperturasJSON = [{
                        id: 1,
                        name: 1
                    }, {
                        id: 2,
                        name: 2
                    }, {
                        id: 3,
                        name: 3
                    }];

                $scope.DD_Aperturas = DD_AperturasJSON;
                $scope.selectedDDAperturas = -1;
                $scope.selectApertura = function(DD_Apertura, pIndice) {
                    $scope.selectedItemApertura = DD_Apertura.name;
                    $scope.selectedDDAperturas = pIndice;
                };

                $scope.agregarNuevaApertura = function() {
                    if ($.isNumeric($scope.nuevaApertura) && ($scope.nuevaApertura >= 0 && $scope.nuevaApertura < 100)) {
                        contadorApertura = contadorApertura + 1;
                        DD_AperturasJSON.push({
                            id: contadorApertura,
                            name: $scope.nuevaApertura
                        });
                        $scope.DD_Aperturas = DD_AperturasJSON;
                        $scope.selectedItemApertura = $scope.nuevaApertura;
                        setTimeout(function() {
                            $("#ID_DropdownAperturas")
                                    .data()
                                    .moduleDropdown
                                    .action
                                    .activate(undefined, contadorApertura.toString())
                                    ;
                        }, 100);
                    }
                    else {
                    }
                };
                //************************************






                //***********************************
                //DropDown Interes

                var DD_InteresesJSON = [{
                        id: 1,
                        name: 13
                    }, {
                        id: 2,
                        name: 14
                    }, {
                        id: 3,
                        name: 15
                    }];
                var DD_InteresesJSONDefault = DD_InteresesJSON;
                $scope.DD_Intereses = DD_InteresesJSON;
                $scope.selectedDDInteres = -1;
                $scope.selectInteres = function(DD_Interes, pIndice) {
                    $scope.selectedItemTasaAnualInteres = DD_Interes.name;
                    $scope.selectedDDInteres = pIndice;
                };


                $scope.agregarNuevaTasaAnualInteres = function() {
                    if ($.isNumeric($scope.V_NuevoTasaAnualInteres) && ($scope.V_NuevoTasaAnualInteres >= 0 && $scope.V_NuevoTasaAnualInteres < 100)) {
                        contadorTasaAnualInteres = contadorTasaAnualInteres + 1;
                        DD_InteresesJSON.push({
                            id: contadorTasaAnualInteres,
                            name: $scope.V_NuevoTasaAnualInteres
                        });
                        $scope.DD_Intereses = DD_InteresesJSON;
                        $scope.selectedItemTasaAnualInteres = $scope.V_NuevoTasaAnualInteres;
                        setTimeout(function() {
                            $("#ID_DropdownTasaAnualInteres")
                                    .data()
                                    .moduleDropdown
                                    .action
                                    .activate(undefined, contadorTasaAnualInteres.toString())
                                    ;
                        }, 100);
                    }
                    else {
                    }
                };
                //******************************




                //*******************************
                //DropDown Moratoria
                var DD_MoratoriasJSON = [{
                        id: 1,
                        name: 14
                    }, {
                        id: 2,
                        name: 15
                    }, {
                        id: 3,
                        name: 16
                    }, {
                        id: 4,
                        name: 17
                    }, {
                        id: 5,
                        name: 18
                    }];
                $scope.DD_Moratorias = DD_MoratoriasJSON;
                $scope.selectedDDMoratoria = -1;
                $scope.selectMoratoria = function(DD_Moratoria, pIndice) {
                    $scope.selectedItemMoratoria = DD_Moratoria.name;
                    $scope.selectedDDMoratoria = pIndice;
                };


                $scope.agregarNuevaMoratoria = function() {
                    if ($.isNumeric($scope.V_NuevaMoratoria) && ($scope.V_NuevaMoratoria >= 0 && $scope.V_NuevaMoratoria < 100)) {
                        contadorMoratoria = contadorMoratoria + 1;
                        DD_MoratoriasJSON.push({
                            id: contadorMoratoria,
                            name: $scope.V_NuevaMoratoria
                        });
                        $scope.DD_Moratorias = DD_MoratoriasJSON;
                        $scope.selectedItemMoratoria = $scope.V_NuevaMoratoria;
                        setTimeout(function() {
                            $("#ID_DropdownMoratoria")
                                    .data()
                                    .moduleDropdown
                                    .action
                                    .activate(undefined, contadorMoratoria.toString())
                                    ;
                        }, 100);
                    }
                    else {
                    }
                };

                //******************************




                //******************************
                //DropDown Meses
               


                //******************************



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





                $scope.V_Comision = function() {

                    return  $scope.montoPrestamo * (($scope.selectedItemComision) / 100);
                };
                $scope.V_Honorarios_Gastos = function() {
                    return $scope.montoPrestamo * (($scope.selectedItemHonorariosGastos) / 100);
                };
                $scope.V_Apertura = function() {
                    return $scope.montoPrestamo * (($scope.selectedItemApertura) / 100);
                };
                $scope.V_Mes_Interes = function() {
                    return (($scope.montoPrestamo * (($scope.selectedItemTasaAnualInteres) / 100)) / 12) * ($scope.selectedItemMes);
                };

                $scope.construirCrearDesgloseJSON = function() {
                    var saldoDesglose = saldoTotal;
                    var contador;
                    var desgloseJSON = {
                        "persona": {
                            "idPersona": $rootScope.clienteSeleccionado.idPersona
                        },
                        "monto": $scope.montoPrestamo,
                        "tasaAnual": $scope.selectedItemTasaAnualInteres,
                        "tasaAnualMoratoria": $scope.selectedItemMoratoria,
                        "comision": $scope.selectedItemComision,
                        "honorarios": $scope.selectedItemHonorariosGastos,
                        "apertura": $scope.selectedItemApertura,
                        "cantidadMeses": $scope.selectedItemMes,
                        "saldo": saldoDesglose,
                        "comentario": $scope.comentarioDesglose,
                        "trasladoabogado": $scope.V_Traslado,
                        "honorariostimbres": $scope.V_Honorarios_Timbres,
                        "cobroadicionals": [],
                        "cobrolegaladicionals": []
                    };
                    if ($rootScope.VG_OpcionDesglose === "VER DESGLOSE") {
                        desgloseJSON.idDesgloceGasto = $rootScope.VG_IdDesgloseSeleccionado;
                    }

                    for (contador = 0; contador < $scope.cobrosLegalesAdicionales.length; contador++) {
                        if ($.isNumeric($scope.cobrosLegalesAdicionales[contador].Monto)) {
                            if ($rootScope.VG_OpcionDesglose !== "VER DESGLOSE") {
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
                            if ($rootScope.VG_OpcionDesglose !== "VER DESGLOSE") {
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

                $scope.comprobarCambioDesglose = function(pSaldo) {
                    var saldoRedondeado = pSaldo.toFixed(2);
                    var contador;
                    if ($rootScope.VG_IdOperacionPrestamoSeleccion === 1 && $rootScope.desgloseSeleccionado != null) {
                        if (saldoRedondeado != $rootScope.desgloseSeleccionado.saldo || $scope.montoPrestamo != $rootScope.desgloseSeleccionado.monto || $rootScope.desgloseSeleccionado.cantidadMeses != $scope.selectedItemMes || $rootScope.desgloseSeleccionado.apertura != $scope.selectedItemApertura || $rootScope.desgloseSeleccionado.honorarios != $scope.selectedItemHonorariosGastos || $rootScope.desgloseSeleccionado.comision != $scope.selectedItemComision || $rootScope.desgloseSeleccionado.tasaAnual != $scope.selectedItemTasaAnualInteres || $rootScope.desgloseSeleccionado.tasaAnualMoratoria != $scope.selectedItemMoratoria || $rootScope.desgloseSeleccionado.trasladoabogado != $scope.V_Traslado || $rootScope.desgloseSeleccionado.honorariostimbres != $scope.V_Honorarios_Timbres || $rootScope.desgloseSeleccionado.comentario != $scope.comentarioDesglose) {
                            $rootScope.textoBotonFinalizar = "GUARDAR";
                        }
                        else {
                            $rootScope.textoBotonFinalizar = "IMPRIMIR";
                            if (($rootScope.desgloseSeleccionado.cobroadicionals.length === 0 && ($scope.cobrosAdicionales[0].Descripcion != "" || $scope.cobrosAdicionales[0].Monto != null)) || ($rootScope.desgloseSeleccionado.cobrolegaladicionals.length === 0 && ($scope.cobrosLegalesAdicionales[0].Descripcion != "" || $scope.cobrosLegalesAdicionales[0].Monto != null))) {
                                $rootScope.textoBotonFinalizar = "GUARDAR";
                            }
                            else
                            {
                                if (($rootScope.desgloseSeleccionado.cobroadicionals.length === 0 && ($scope.cobrosAdicionales[0].Descripcion == "" && $scope.cobrosAdicionales[0].Monto == null)) || ($rootScope.desgloseSeleccionado.cobrolegaladicionals.length === 0 && ($scope.cobrosLegalesAdicionales[0].Descripcion == "" && $scope.cobrosLegalesAdicionales[0].Monto == null)))
                                    $rootScope.textoBotonFinalizar = "IMPRIMIR";
                                else
                                {
                                    if ($scope.cobrosAdicionales.length !== $rootScope.desgloseSeleccionado.cobroadicionals.length || $scope.cobrosLegalesAdicionales.length !== $rootScope.desgloseSeleccionado.cobrolegaladicionals.length)
                                        $rootScope.textoBotonFinalizar = "GUARDAR";
                                    else {
                                        for (contador = 0; contador < $scope.cobrosLegalesAdicionales.length; contador++) {
                                            if ($scope.cobrosLegalesAdicionales[contador].Monto !== $rootScope.desgloseSeleccionado.cobrolegaladicionals[contador].monto || $scope.cobrosLegalesAdicionales[contador].Descripcion !== $rootScope.desgloseSeleccionado.cobrolegaladicionals[contador].descripcion)
                                                $rootScope.textoBotonFinalizar = "GUARDAR";
                                        }
                                        for (contador = 0; contador < $scope.cobrosAdicionales.length; contador++) {
                                            if ($scope.cobrosAdicionales[contador].Monto !== $rootScope.desgloseSeleccionado.cobroadicionals[contador].monto || $scope.cobrosAdicionales[contador].Descripcion !== $rootScope.desgloseSeleccionado.cobroadicionals[contador].descripcion)
                                                $rootScope.textoBotonFinalizar = "GUARDAR";
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if (saldoRedondeado > 0) {
                        saldoTotal = saldoRedondeado;
                        $("#ID_ButtonFinalizacionDesglose").show();
                        return saldoRedondeado;
                    }
                    else {
                        $("#ID_ButtonFinalizacionDesglose").hide();
                        return 0;
                    }
                };

                $scope.saldo = function() {
                    var contador;
                    var SumCobrosLegalesAdicionales = 0;
                    var SumCobrosAdicionales = 0;
                    var cobroAdicionalErroneo = 0;

                    if (typeof $scope.selectedItemMoratoria === "undefined")
                        cobroAdicionalErroneo = 1;
                    for (contador = 0; contador < $scope.cobrosLegalesAdicionales.length; contador++) {
                        if ($.isNumeric($scope.cobrosLegalesAdicionales[contador].Monto) && $scope.cobrosLegalesAdicionales[contador].Descripcion != "")
                            SumCobrosLegalesAdicionales += $scope.cobrosLegalesAdicionales[contador].Monto;
                        else {
                            if (($scope.cobrosLegalesAdicionales.length == 1 && FG_XOR($scope.cobrosLegalesAdicionales[0].Descripcion == "", !$.isNumeric($scope.cobrosLegalesAdicionales[0].Monto))) || ($scope.cobrosLegalesAdicionales.length != 1 && ($scope.cobrosLegalesAdicionales[contador].Descripcion == "" || !$.isNumeric($scope.cobrosLegalesAdicionales[contador].Monto))) || typeof $scope.cobrosLegalesAdicionales[contador].Monto === "undefined")
                                cobroAdicionalErroneo = 1;
                        }
                    }
                    for (contador = 0; contador < $scope.cobrosAdicionales.length; contador++) {
                        if ($scope.cobrosAdicionales[contador].Monto != null && $scope.cobrosAdicionales[contador].Descripcion != "")
                            SumCobrosAdicionales += $scope.cobrosAdicionales[contador].Monto;
                        else
                        if (($scope.cobrosAdicionales.length == 1 && FG_XOR($scope.cobrosAdicionales[0].Descripcion == "", !$.isNumeric($scope.cobrosAdicionales[0].Monto))) || ($scope.cobrosAdicionales.length != 1 && ($scope.cobrosAdicionales[contador].Descripcion == "" || !$.isNumeric($scope.cobrosAdicionales[contador].Monto))) || typeof $scope.cobrosAdicionales[contador].Monto === "undefined")
                            cobroAdicionalErroneo = 1;
                    }

                    var resultado = $scope.montoPrestamo - ($scope.montoPrestamo * (($scope.selectedItemComision) / 100)
                            + $scope.montoPrestamo * (($scope.selectedItemHonorariosGastos) / 100)
                            + $scope.montoPrestamo * (($scope.selectedItemApertura) / 100)
                            + (($scope.montoPrestamo * (($scope.selectedItemTasaAnualInteres) / 100)) / 12) * ($scope.selectedItemMes)

                            ) - ($scope.V_Traslado + $scope.V_Honorarios_Timbres + SumCobrosLegalesAdicionales + SumCobrosAdicionales);

                    if (resultado != null && cobroAdicionalErroneo == 0)
                        return $scope.comprobarCambioDesglose(resultado);
                    else {
                        $("#ID_ButtonFinalizacionDesglose").hide();
                        return 0;
                    }

                    return 0;
                };




                $scope.crearDesgloseFormularioCompleto = function() {
                    if ($rootScope.textoBotonFinalizar === "IMPRIMIR") {
                        imprimeDesglose($rootScope.nombreCompletoClienteSeleccionado, currencyFormat($scope.montoPrestamo), $scope.selectedItemTasaAnualInteres, $scope.selectedItemMoratoria, $scope.selectedItemComision, currencyFormat($scope.V_Comision()), $scope.selectedItemHonorariosGastos, currencyFormat($scope.V_Honorarios_Gastos()), currencyFormat($scope.V_Honorarios_Timbres), $scope.selectedItemApertura, currencyFormat($scope.V_Apertura()), $scope.selectedItemMes, currencyFormat($scope.V_Mes_Interes()), currencyFormat($scope.V_Traslado), currencyFormat(parseFloat(saldoTotal)), $scope.cobrosAdicionales, $scope.cobrosLegalesAdicionales, $scope.comentarioDesglose);
                    }
                    else if ($rootScope.textoBotonFinalizar === "GUARDAR") {
                        $scope.construirCrearDesgloseJSON();
                        if (VG_PostDesglose === 1) {
                            modalConfirmarImpresion();
                        }
                    }
                };

                $rootScope.imprimirDesglose = function() {
                    imprimeDesglose($rootScope.nombreCompletoClienteSeleccionado, currencyFormat($scope.montoPrestamo), $scope.selectedItemTasaAnualInteres, $scope.selectedItemMoratoria, $scope.selectedItemComision, currencyFormat($scope.V_Comision()), $scope.selectedItemHonorariosGastos, currencyFormat($scope.V_Honorarios_Gastos()), currencyFormat($scope.V_Honorarios_Timbres), $scope.selectedItemApertura, currencyFormat($scope.V_Apertura()), $scope.selectedItemMes, currencyFormat($scope.V_Mes_Interes()), currencyFormat($scope.V_Traslado), currencyFormat(parseFloat(saldoTotal)), $scope.cobrosAdicionales, $scope.cobrosLegalesAdicionales, $scope.comentarioDesglose);
                    
                };

                $rootScope.verificarExisteValorDropDown = function(pDropDownJSON, pValue) {
                    return pDropDownJSON.filter(function(pDropDownJSON) {
                        return pDropDownJSON.name === pValue;
                    }
                    );
                };

                $rootScope.setActiveOpcionValorDropDown = function(pIdDropdown, pIdIndiceValor) {
                    setTimeout(function() {
                        $("#" + pIdDropdown)
                                .data()
                                .moduleDropdown
                                .action
                                .activate(undefined, pIdIndiceValor.toString())
                                ;
                    }, 100);
                };



                $scope.verificarExisteAgregarValorDropdown = function(pFiltroDropDown, pTipoContadorDropDown, pIdDropdown, pValor) {
                    if ((pFiltroDropDown).length !== 0) {
                        switch (pTipoContadorDropDown) {
                            case "contadorMes":
                                $scope.selectedItemMes = pValor;
                                break;
                            case "contadorComision":
                                $scope.selectedItemComision = pValor;
                                break;
                            case "contadorHonorarioGasto":
                                $scope.selectedItemHonorariosGastos = pValor;
                                break;
                            case "contadorApertura":
                                $scope.selectedItemApertura = pValor;
                                break;
                            case "contadorTasaAnualInteres":
                                $scope.selectedItemTasaAnualInteres = pValor;
                                break;
                            case "contadorMoratoria":
                                $scope.selectedItemMoratoria = pValor;
                                break;
                        }
                        $rootScope.setActiveOpcionValorDropDown(pIdDropdown, pFiltroDropDown[0].id);
                    }
                    else {
                        switch (pTipoContadorDropDown) {
                            case "contadorMes":
                                contadorMes++;
                                DD_MesesJSON.push({
                                    id: contadorMes,
                                    name: pValor
                                });
                                $scope.DD_Meses = DD_MesesJSON;
                                $scope.selectedItemMes = pValor;
                                $rootScope.setActiveOpcionValorDropDown(pIdDropdown, contadorMes);
                                break;
                            case "contadorComision":
                                contadorComision++;
                                DD_ComisionesJSON.push({
                                    id: contadorComision,
                                    name: pValor
                                });
                                $scope.DD_Comisiones = DD_ComisionesJSON;
                                $scope.selectedItemComision = pValor;
                                $rootScope.setActiveOpcionValorDropDown(pIdDropdown, contadorComision);
                                break;
                            case "contadorHonorarioGasto":
                                contadorHonorarioGasto++;
                                DD_HonorariosGastosJSON.push({
                                    id: contadorHonorarioGasto,
                                    name: pValor
                                });
                                $scope.DD_Honorarios_Gastos = DD_HonorariosGastosJSON;
                                $scope.selectedItemHonorariosGastos = pValor;
                                $rootScope.setActiveOpcionValorDropDown(pIdDropdown, contadorHonorarioGasto);
                                break;
                            case "contadorApertura":
                                contadorApertura++;
                                DD_AperturasJSON.push({
                                    id: contadorApertura,
                                    name: pValor
                                });
                                $scope.DD_Aperturas = DD_AperturasJSON;
                                $scope.selectedItemApertura = pValor;
                                $rootScope.setActiveOpcionValorDropDown(pIdDropdown, contadorApertura);
                                break;
                            case "contadorTasaAnualInteres":
                                contadorTasaAnualInteres++;
                                DD_InteresesJSON.push({
                                    id: contadorTasaAnualInteres,
                                    name: pValor
                                });
                                $scope.DD_Intereses = DD_InteresesJSON;
                                $scope.selectedItemTasaAnualInteres = pValor;
                                $rootScope.setActiveOpcionValorDropDown(pIdDropdown, contadorTasaAnualInteres);
                                break;
                            case "contadorMoratoria":
                                contadorMoratoria++;
                                DD_MoratoriasJSON.push({
                                    id: contadorMoratoria,
                                    name: pValor
                                });
                                $scope.DD_Moratorias = DD_MoratoriasJSON;
                                $scope.selectedItemMoratoria = pValor;
                                $rootScope.setActiveOpcionValorDropDown(pIdDropdown, contadorMoratoria);
                                break;
                        }


                    }

                };


                $rootScope.setValoresDesglose = function() {
                    $scope.montoPrestamo = $rootScope.desgloseSeleccionado.monto;
                    var V_FiltroMesesDropDown = $rootScope.verificarExisteValorDropDown(DD_MesesJSON, $rootScope.desgloseSeleccionado.cantidadMeses);
                    var V_FiltroComisionesDropDown = $rootScope.verificarExisteValorDropDown(DD_ComisionesJSON, $rootScope.desgloseSeleccionado.comision);
                    var V_FiltroHonorariosGastosDropDown = $rootScope.verificarExisteValorDropDown(DD_HonorariosGastosJSON, $rootScope.desgloseSeleccionado.honorarios);
                    var V_FiltroAperturasDropDown = $rootScope.verificarExisteValorDropDown(DD_AperturasJSON, $rootScope.desgloseSeleccionado.apertura);
                    var V_FiltroInteresesDropDown = $rootScope.verificarExisteValorDropDown(DD_InteresesJSON, $rootScope.desgloseSeleccionado.tasaAnual);
                    var V_FiltroMoratoriasDropDown = $rootScope.verificarExisteValorDropDown(DD_MoratoriasJSON, $rootScope.desgloseSeleccionado.tasaAnualMoratoria);

                    $scope.verificarExisteAgregarValorDropdown(V_FiltroMesesDropDown, "contadorMes", "ID_DropdownMeses", $rootScope.desgloseSeleccionado.cantidadMeses);
                    $scope.verificarExisteAgregarValorDropdown(V_FiltroComisionesDropDown, "contadorComision", "ID_DropdownComision", $rootScope.desgloseSeleccionado.comision);
                    $scope.verificarExisteAgregarValorDropdown(V_FiltroHonorariosGastosDropDown, "contadorHonorarioGasto", "ID_DropdownHonorariosGastos", $rootScope.desgloseSeleccionado.honorarios);
                    $scope.verificarExisteAgregarValorDropdown(V_FiltroAperturasDropDown, "contadorApertura", "ID_DropdownAperturas", $rootScope.desgloseSeleccionado.apertura);
                    $scope.verificarExisteAgregarValorDropdown(V_FiltroInteresesDropDown, "contadorTasaAnualInteres", "ID_DropdownTasaAnualInteres", $rootScope.desgloseSeleccionado.tasaAnual);
                    $scope.verificarExisteAgregarValorDropdown(V_FiltroMoratoriasDropDown, "contadorMoratoria", "ID_DropdownMoratoria", $rootScope.desgloseSeleccionado.tasaAnualMoratoria);


                    if ($rootScope.desgloseSeleccionado.comentario != null && $rootScope.desgloseSeleccionado.comentario != "") {
                        $scope.comentarioDesglose = $rootScope.desgloseSeleccionado.comentario;
                        $('.ui.accordion.Comentario').accordion('open', 0);
                    }

                    $scope.V_Traslado = $rootScope.desgloseSeleccionado.trasladoabogado;
                    $scope.V_Honorarios_Timbres = $rootScope.desgloseSeleccionado.honorariostimbres;

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
                    $scope.V_Traslado = "";
                    $scope.V_Honorarios_Timbres = "";
                    $scope.comentarioDesglose = "";

                    $('.ui.dropdown').dropdown('restore defaults');
                    $scope.selectedDDInteres = -1;
                    $scope.selectedDDMoratoria = -1;
                    $scope.selectedDDAperturas = -1;
                    $scope.selectedDDHonorariosGastos = -1;
                    $scope.selectedDDComision = -1;
                    $scope.selectedDDMeses = -1;


                    //$scope.DD_Intereses = DD_InteresesJSON;
                    $scope.cobrosAdicionales = [{Descripcion: '', Monto: ''}];
                    $scope.cobrosLegalesAdicionales = [{Descripcion: '', Monto: ''}];

                };




            }]);
