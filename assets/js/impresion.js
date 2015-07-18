
//Imprimir Desgloses
function agregarEspaciosNumeroImprimir(pNumero, pDescripcion, pTipo) {
    var espacios = "             ";
    var resultado = "";
    var cantidadCaracteres = pNumero.toString().length;
    if (pNumero % 1 === 0)
        espacios = espacios.substring(2 * cantidadCaracteres - 1, espacios.length);
    else
        espacios = espacios.substring(2 * cantidadCaracteres - 1, espacios.length);
    if (pTipo === 1) {
        resultado = pNumero.toString() + "%" + espacios + pDescripcion;
    } else {
        resultado = pNumero.toString() + "   " + espacios + pDescripcion;
    }
    return resultado;
}

function verificarNull(pValor) {
    var retorno = "";
    if (pValor === null || typeof pValor === "undefined") {
        return retorno;
    }
    else
        return pValor + "";

}

function imprimeDesglose(pClienteNombre, pMonto, pTasaAnual, pTasaAnualMoratoria, pComision, pComisionVal, pHonorariosGastos, pHonorariosGastosVal, pHonorariosTimbres, pApertura, pAperturaVal, pMeses, pMesesVal, pTraslado, pSaldo, pArrayCobrosAdicionales, pArrayCobrosLegales, pComentario) {
    var documentoImprimirDesglose = {
        content: [
            {
                style: 'tableExample',
                table: {
                    widths: [505, 'auto', 'auto'],
                    headerRows: 1,
                    // keepWithHeaderRows: 1,
                    body: [
                        [{
                                text: 'DESGLOSE DE GASTOS',
                                style: 'TituloHeader',
                                colSpan: 1,
                                alignment: 'center'
                            }],
                    ]
                }
            },
            {
                style: 'tableExample',
                table: {
                    widths: [400, 70, 'auto'],
                    headerRows: 2,
                    body: [
                        [{text: 'Cliente                                           ' + pClienteNombre, style: 'tableHeader', colSpan: 3}, {}, {}],
                        [{text: 'Monto del Prestamo', style: 'cuerpo'}, {text: pMonto, colSpan: 2, style: 'cuerpo'}, {}],
                        [{text: 'Tasa anual de interés', style: 'cuerpo'}, {text: pTasaAnual.toString() + '%', colSpan: 2, style: 'cuerpo'}, {}],
                        [{text: 'Tasa anual de interés con Moratoria', style: 'cuerpo'}, {text: pTasaAnualMoratoria.toString() + "%", colSpan: 2, style: 'cuerpo'}, {}],
                        [{text: '', colSpan: 3, margin: [0, 0, 0, 0]}, {}, {}],
                        [{text: agregarEspaciosNumeroImprimir(pComision, 'Comisión', 1), style: 'cuerpo'}, {text: pComisionVal, colSpan: 2, style: 'cuerpo'}, {}],
                        [{text: agregarEspaciosNumeroImprimir(pHonorariosGastos, 'Honorarios y gastos de inscripción de Fideicomiso ó Hipoteca', 1), style: 'cuerpo'}, {text: pHonorariosGastosVal, colSpan: 2, style: 'cuerpo'}, {}],
                        [{text: 'Honorarios y timbres(cancelación de hipoteca ó fideicomiso)', margin: [51, 0, 0, 15]}, {text: pHonorariosTimbres, colSpan: 2}, {}],
                        [{text: agregarEspaciosNumeroImprimir(pApertura, 'Apertura y Manejo de cuenta', 1), style: 'cuerpo'}, {text: pAperturaVal, colSpan: 2, style: 'cuerpo'}, {}],
                        [{text: agregarEspaciosNumeroImprimir(pMeses, 'Mes de intereses por adelantado', 2), style: 'cuerpo'}, {text: pMesesVal, colSpan: 2, style: 'cuerpo'}, {}],
                        [{text: 'Traslado de abogado', margin: [51, 0, 0, 0]}, {text: pTraslado, colSpan: 2}, {}],
                        [{text: '', colSpan: 3, margin: [0, 15, 0, 0]}, {}, {}],
                        [{text: 'Saldo a Girar', style: 'saldo'}, {text: pSaldo, colSpan: 2, style: 'saldo'}, {}],
                    ]
                },
                layout: {
                    hLineWidth: function(i, node) {
                        return (i === 0 || i === node.table.body.length) ? 1 : 1;
                    },
                    vLineWidth: function(i, node) {
                        return (i === 0 || i === node.table.widths.length) ? 0 : 0;
                    },
                    hLineColor: function(i, node) {
                        return (i === 0 || i === node.table.body.length) ? 'black' : 'white';
                    },
                    vLineColor: function(i, node) {
                        return (i === 0 || i === node.table.widths.length) ? 'black' : 'white';
                    }
                }
            },
            {
                text: 'NOTA IMPORTANTE:',
                style: 'header'

            },
            {
                text: verificarNull(pComentario),
                style: 'cuerpo2'

            }

        ],
        styles: {
            header: {
                fontSize: 12,
                bold: true,
                margin: [0, 45, 0, 5]
            },
            tableExample: {
                margin: [0, -5, 0, 15]
            },
            LetrasPequeñas: {
                fontSize: 9,
                color: 'black',
                margin: [0, -2, 0, -2]
            },
            TituloHeader: {
                bold: true,
                fontSize: 18,
                color: 'black',
                margin: [0, -3, 0, -3]
            },
            saldo: {
                bold: true,
                fontSize: 13,
                color: 'black',
                margin: [0, 15, 0, 15]
            },
            cuerpo: {
                fontSize: 12,
                color: 'black',
                margin: [0, 0, 0, 15]
            },
            cuerpo2: {
                fontSize: 10,
                color: 'black',
                margin: [0, 0, 0, 10]
            },
            tableHeader: {
                bold: true,
                fontSize: 12,
                color: 'black',
                margin: [0, 0, 0, 25]
            }
        }
    };

    var contador;
    var cantidadLegales = pArrayCobrosLegales.length;
    var existenCobrosLegales = 0; //cambia de valor si no existen cobros adicionales para asi colocar los legales en la posicion correcta

    //Cobros Adicionales Legales
    if (pArrayCobrosLegales.length > 0) {
        documentoImprimirDesglose.content[1].table.body.splice(8, 0, [{text: '', colSpan: 3, margin: [0, 0, 0, 0]}, {}, {}]);
        for (contador = 0; contador < cantidadLegales; contador++) {
            documentoImprimirDesglose.content[1].table.body.splice(9 + contador, 0, [{text: pArrayCobrosLegales[contador].Descripcion, margin: [51, 0, 0, 0]}, {text: currencyFormat(pArrayCobrosLegales[contador].Monto), colSpan: 2}, {}]);
        }
        documentoImprimirDesglose.content[1].table.body.splice(9 + cantidadLegales, 0, [{text: '', colSpan: 3, margin: [0, 0, 0, 15]}, {}, {}]);
    }
    else {
        existenCobrosLegales = 3; // El numero 2, representa los 2 espacios agregados al cobro adicional
    }

    //Cobros Adicionales 
    if (pArrayCobrosAdicionales.length > 0)
        for (contador = 0; contador < pArrayCobrosAdicionales.length; contador++) {
            documentoImprimirDesglose.content[1].table.body.splice(14 - existenCobrosLegales + cantidadLegales + contador, 0, [{text: pArrayCobrosAdicionales[contador].Descripcion, margin: [51, 0, 0, 0]}, {text: currencyFormat(pArrayCobrosAdicionales[contador].Monto), colSpan: 2}, {}]);
        }

    pdfMake.createPdf(documentoImprimirDesglose).open();
}

//Imprimir Caratula
function imprimeCaratula(pAcreedor, pDeudor, pFechaConstucion, pFechaVencimiento, pMonto, pInteresAnual, pInteresMoratorio, pPagoMensual, pNombre, pEmail, pEmpresa, pTelCasa, pTelCelular, pTelOficina, pTelFax, pDireccion, pComentario, pGarantias) {
    var documentoImprimirCaratula = {
        content: [
            {
                style: 'tableExample',
                table: {
                    widths: [505, 'auto', 'auto'],
                    headerRows: 1,
                    // keepWithHeaderRows: 1,
                    body: [
                        [{
                                text: 'CRÉDITO',
                                style: 'TituloHeader',
                                colSpan: 1,
                                alignment: 'center'
                            }]
                    ]
                }
            },
            {
                style: 'tableExample',
                table: {
                    widths: [410, 'auto', 'auto'],
                    headerRows: 2,
                    body: [
                        [{text: '', colSpan: 3, margin: [0, 10, 0, 0]}, {}, {}],
                        [{text: 'ACREEDOR', style: 'cuerpo'}, {text: pAcreedor + "", colSpan: 2, style: 'cuerpo'}, {}],
                        [{text: 'DEUDOR', style: 'cuerpo'}, {text: pDeudor, colSpan: 2, style: 'cuerpo'}, {}],
                        [{text: 'FECHA CONSTITUCIÓN', style: 'cuerpo'}, {text: pFechaConstucion, colSpan: 2, style: 'cuerpo'}, {}],
                        [{text: 'FECHA VENCIMIENTO', style: 'cuerpo'}, {text: pFechaVencimiento, colSpan: 2, style: 'cuerpo'}, {}],
                        [{text: 'MONTO CAPITAL', style: 'cuerpo'}, {text: pMonto, colSpan: 2, style: 'cuerpo'}, {}],
                        [{text: 'INTERÉS ANUAL', style: 'cuerpo'}, {text: pInteresAnual + "%", colSpan: 2, style: 'cuerpo'}, {}],
                        [{text: 'INTERÉS MORATORIO', style: 'cuerpo'}, {text: pInteresMoratorio + "%", colSpan: 2, style: 'cuerpo'}, {}],
                        [{text: 'PAGO MENSUAL', style: 'cuerpo'}, {text: pPagoMensual, colSpan: 2, style: 'cuerpo'}, {}],
                    ]
                },
                layout: {
                    hLineWidth: function(i, node) {
                        return (i === 0 || i === node.table.body.length) ? 0 : 0;
                    },
                    vLineWidth: function(i, node) {
                        return (i === 0 || i === node.table.widths.length) ? 0 : 0;
                    },
                    hLineColor: function(i, node) {
                        return (i === 0 || i === node.table.body.length) ? 'black' : 'white';
                    },
                    vLineColor: function(i, node) {
                        return (i === 0 || i === node.table.widths.length) ? 'black' : 'white';
                    }
                }
            },
            {
                style: 'tabla',
                table: {
                    widths: ['*', '*', '*', '*', '*', '*'],
                    body: [
                        ['PROVINCIA', 'CANTÓN', 'DISTRITO', 'PLANO', 'FINCA', 'MEDIDA']


                    ]
                }
            },
            {
                style: 'contacto',
                table: {
                    widths: [505, 'auto', 'auto'],
                    headerRows: 1,
                    // keepWithHeaderRows: 1,
                    body: [
                        [{
                                text: 'CONTACTO',
                                style: 'TituloHeader',
                                colSpan: 1,
                                alignment: 'center'
                            }],
                    ]
                }
            },
            {
                style: 'tabla',
                table: {
                    widths: [290, 140, '*'],
                    body: [
                        ['NOMBRE', 'EMAIL', 'EMPRESA'],
                        [pNombre, verificarNull(pEmail), verificarNull(pEmpresa)],
                    ]
                },
                layout: {
                    hLineWidth: function(i, node) {
                        return (i === 0 || i === node.table.body.length) ? 0 : 0;
                    },
                    vLineWidth: function(i, node) {
                        return (i === 0 || i === node.table.widths.length) ? 0 : 0;
                    },
                    hLineColor: function(i, node) {
                        return (i === 0 || i === node.table.body.length) ? 'black' : 'white';
                    },
                    vLineColor: function(i, node) {
                        return (i === 0 || i === node.table.widths.length) ? 'black' : 'white';
                    }
                }
            },
            {
                style: 'tabla',
                table: {
                    widths: [140, 140, 140, 140],
                    body: [
                        ['TEL. CASA', 'TEL. CELULAR', 'TEL. OFICINA', 'TEL.FAX'],
                        [verificarNull(pTelCasa), verificarNull(pTelCelular), verificarNull(pTelOficina), verificarNull(pTelFax)],
                    ]
                },
                layout: {
                    hLineWidth: function(i, node) {
                        return (i === 0 || i === node.table.body.length) ? 0 : 0;
                    },
                    vLineWidth: function(i, node) {
                        return (i === 0 || i === node.table.widths.length) ? 0 : 0;
                    },
                    hLineColor: function(i, node) {
                        return (i === 0 || i === node.table.body.length) ? 'black' : 'white';
                    },
                    vLineColor: function(i, node) {
                        return (i === 0 || i === node.table.widths.length) ? 'black' : 'white';
                    }
                }
            },
            {
                style: 'tabla',
                table: {
                    widths: ['*'],
                    body: [
                        ['DIRECCIÓN'],
                        [verificarNull(pDireccion)]
                    ]
                },
                layout: {
                    hLineWidth: function(i, node) {
                        return (i === 0 || i === node.table.body.length) ? 1 : 1;
                    },
                    vLineWidth: function(i, node) {
                        return (i === 0 || i === node.table.widths.length) ? 0 : 0;
                    },
                    hLineColor: function(i, node) {
                        return (i === node.table.body.length) ? 'black' : 'white';
                    },
                    vLineColor: function(i, node) {
                        return (i === 0 || i === node.table.widths.length) ? 'black' : 'white';
                    }
                }
            },
            {
                text: 'NOTA IMPORTANTE:',
                style: 'header'

            },
            {
                text: verificarNull(pComentario),
                style: 'cuerpo'

            },
        ],
        styles: {
            header: {
                fontSize: 12,
                bold: true,
                margin: [0, 45, 0, 5]
            },
            tableExample: {
                margin: [0, -1, 0, 0]
            },
            tabla: {
                fontSize: 10,
                margin: [0, 10, 0, 0]
            },
            contacto: {
                margin: [0, 15, 0, 0]
            },
            tableHeader: {
                bold: true,
                fontSize: 12,
                color: 'black',
                margin: [0, 0, 0, 0]
            },
            cuerpo: {
                fontSize: 10,
                color: 'black',
                margin: [0, 0, 0, 10]
            }
        }
    };

    var contador;

    var Provincias = "";
    var Cantones = "";
    var Distritos = "";
    var NumerosPlanos = "";
    var Fincas = "";
    var Medidas = "";
    for (contador = 0; contador < pGarantias.length; contador++) {
        Provincias += (pGarantias[contador].provincia.descripcion + "\n");
        Cantones += (pGarantias[contador].canton + "\n");
        Distritos += (pGarantias[contador].distrito + "\n");
        NumerosPlanos += (pGarantias[contador].numeroplano + "\n");
        Fincas += (pGarantias[contador].finca + "\n");
        Medidas += (pGarantias[contador].medidas + " m2" + "\n");
    }
    var ListaGarantias = [Provincias, Cantones, Distritos, NumerosPlanos, Fincas, Medidas];
    documentoImprimirCaratula.content[2].table.body.push(ListaGarantias);

    pdfMake.createPdf(documentoImprimirCaratula).open();
}

function agregarCheckCumpleRequisito(pArrayRequisitosDesglose, pRequisito) {
    var retornoVerificacion = 0;
    var contador;

    for (contador = 0; contador < pArrayRequisitosDesglose.length; contador++) {
        if (pArrayRequisitosDesglose[contador].requisito.descripcion == pRequisito)
            retornoVerificacion = 1;
    }
    if (retornoVerificacion == 0)
        return "(   )";
    else
        return "( * )";
}

//Imprimir Requisitos
function imprimeRequisitos(pTipoPersona, pArrayRequisitosTipoCliente, pArrayRequisitosDesglose) {
    var tipoPersona = "";
    if (pTipoPersona == 1)
        tipoPersona = "PERSONA FÍSICA";
    else
        tipoPersona = "PERSONA JURÍDICA";
    var documentoImprimirRequisitos = {
        content: [
            {
                style: 'tableExample',
                table: {
                    widths: [505, 'auto', 'auto'],
                    headerRows: 1,
                    body: [
                        [{
                                text: 'REQUISITOS PARA LA APROBACIÓN DE UN CRÉDITO HIPOTECARIO-FIDEICOMISO\n' + tipoPersona,
                                style: 'TituloHeader',
                                colSpan: 1,
                                alignment: 'center'
                            }],
                    ]
                }
            },
            {
                style: 'tabla',
                table: {
                    widths: [409, '*'],
                    body: [
                        [{text: 'REQUISITO', alignment: 'center'}, {text: 'CUMPLE', alignment: 'center'}]
                    ]
                }
            },
            {
                style: 'cuerpo',
                table: {
                    widths: [410, '*'],
                    body: [
                        [{text: ''}, {text: ''}],
                        [{text: ''}, {text: ''}]
                    ]
                },
                layout: {
                    hLineWidth: function(i, node) {
                        return (i !== 0 && i !== node.table.body.length) ? 0 : 0;
                    },
                    vLineWidth: function(i, node) {
                        return (i !== 0 && i !== node.table.widths.length) ? 1 : 0;
                    },
                    vLineColor: function(i, node) {
                        return (i === 0 || i === node.table.widths.length) ? 'white' : 'white';
                    }
                }
            },
            {
                style: 'tablaFin',
                table: {
                    widths: ['*'],
                    body: [
                        ['']
                    ]
                },
                layout: {
                    hLineWidth: function(i, node) {
                        return (i === 0 || i === node.table.body.length) ? 1 : 1;
                    },
                    vLineWidth: function(i, node) {
                        return (i === 0 || i === node.table.widths.length) ? 0 : 0;
                    },
                    hLineColor: function(i, node) {
                        return (i === node.table.body.length) ? 'black' : 'white';
                    },
                    vLineColor: function(i, node) {
                        return (i === 0 || i === node.table.widths.length) ? 'black' : 'white';
                    }
                }
            }

        ],
        styles: {
            header: {
                fontSize: 12,
                bold: true,
                margin: [0, 45, 0, 5]
            },
            tableExample: {
                margin: [0, -1, 0, 0]
            },
            tabla: {
                fontSize: 11,
                margin: [0, 50, 0, 0]
            },
            tablaFin: {
                margin: [0, -20, 0, 0]
            },
            tableHeader: {
                bold: true,
                fontSize: 12,
                color: 'black',
                margin: [0, 0, 0, 0]
            },
            cuerpoIzq: {
                fontSize: 10,
                color: 'black',
                margin: [20, 0, 0, 15]
            },
            cuerpo: {
                fontSize: 10,
                color: 'black',
                margin: [0, 0, 0, 15]
            }
        }
    };


    var contador;
    for (contador = 0; contador < pArrayRequisitosTipoCliente.length; contador++) {
        documentoImprimirRequisitos.content[2].table.body.splice(1 + contador, 0, [{text: pArrayRequisitosTipoCliente[contador].descripcion, style: 'cuerpoIzq'}, {text: agregarCheckCumpleRequisito(pArrayRequisitosDesglose, pArrayRequisitosTipoCliente[contador].descripcion), alignment: 'center'}]);
    }




    pdfMake.createPdf(documentoImprimirRequisitos).open();
}



function imprimeConsulta(pCliente,pMontoDesglose,pPagos,pMoratoria,pSobrante,pProximoPago) {
    var documentoImprimirConsulta = {
        content: [
            {
                style: 'tableExample',
                table: {
                    widths: [505, 'auto', 'auto'],
                    headerRows: 1,
                    // keepWithHeaderRows: 1,
                    body: [
                        [{
                                text: 'HISTÓRICO DE PAGOS',
                                style: 'TituloHeader',
                                colSpan: 1,
                                alignment: 'center'
                            }],
                    ]
                }
            },
            { 
			text: pCliente, 
			style: 'header', 
			alignment: 'center' 
            },
            { 
			text: "Monto Préstamo: "+currencyFormat(pMontoDesglose), 
			style: 'subHeader', 
			alignment: 'center' 
            },
            
            {
                style: 'contacto',
                table: {
                    widths: [505, 'auto', 'auto'],
                    headerRows: 1,
                    // keepWithHeaderRows: 1,
                    body: [
                        [{
                                text: 'Informe de Pagos',
                                style: 'TituloSubHeader',
                                colSpan: 1,
                                alignment: 'center'
                            }],
                    ]
                }
            },
            {
                style: 'tabla',
                table: {
                    widths: ['*', '*', '*', '*', '*', 125],
                    body: [
                        ['Detalle', 'Banco', 'Fecha de Pago', 'Monto','Sobrante','Observaciones']


                    ]
                },
                layout: {
                    hLineWidth: function(i, node) {
                        return (i === 0 || i === node.table.body.length) ? 2 : 1;
                    },
                    vLineWidth: function(i, node) {
                        return (i === 0 || i === node.table.widths.length) ? 2 : 1;
                    },
                    hLineColor: function(i, node) {
                        return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
                    },
                    vLineColor: function(i, node) {
                        return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
                    }
                }
            },
            {
                style: 'contacto',
                table: {
                    widths: [505, 'auto', 'auto'],
                    headerRows: 1,
                    // keepWithHeaderRows: 1,
                    body: [
                        [{
                                text: 'Morosidades',
                                style: 'TituloSubHeader',
                                colSpan: 1,
                                alignment: 'center'
                            }],
                    ]
                }
            },
            {
                style: 'tabla2',
                table: {
                    widths: ['*', '*', '*', '*', '*', '*','*','*'],
                    body: [
                        ['Detalle', 'Banco', 'Fecha de Cobro', 'Días de Atraso', 'Intereses', 'Monto en Mora','Sobrante','Pago Cliente']


                    ]
                },
                layout: {
                    hLineWidth: function(i, node) {
                        return (i === 0 || i === node.table.body.length) ? 2 : 1;
                    },
                    vLineWidth: function(i, node) {
                        return (i === 0 || i === node.table.widths.length) ? 2 : 1;
                    },
                    hLineColor: function(i, node) {
                        return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
                    },
                    vLineColor: function(i, node) {
                        return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
                    }
                }
            },
           
            {
                style: 'tablaFinal',
                table: {
                    widths: ['*', '*'],
                    body: [
                        ['Sobrante', 'Fecha Próximo Pago']
                    ]
                },
                layout: {
                    hLineWidth: function(i, node) {
                        return (i === 0 || i === node.table.body.length) ? 2 : 1;
                    },
                    vLineWidth: function(i, node) {
                        return (i === 0 || i === node.table.widths.length) ? 2 : 1;
                    },
                    hLineColor: function(i, node) {
                        return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
                    },
                    vLineColor: function(i, node) {
                        return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
                    }
                }
            }
            

        ],
        styles: {
            header: {
                fontSize: 12,
                bold: true,
                margin: [0, 10, 0, 0]
            },
            subHeader: {
                fontSize: 10,
                margin: [0, 10, 0, 0]
            },
            tableExample: {
                margin: [0, -5, 0, 15]
            },
            LetrasPequeñas: {
                fontSize: 9,
                color: 'black',
                margin: [0, -2, 0, -2]
            },
            TituloHeader: {
                bold: true,
                fontSize: 18,
                color: 'black',
                margin: [0, -3, 0, -3]
            },
            TituloSubHeader: {
                bold: true,
                fontSize: 12,
                color: 'black',
                margin: [0, 0, 0, 0]
            },
            tableHeader: {
                bold: true,
                fontSize: 12,
                color: 'black',
                margin: [0, 0, 0, 25]
            },
            contacto: {
                margin: [0, 30, 0, 0]
            },
            tabla: {
                fontSize: 10,
                margin: [0, 10, 0, 0]
            },
            tabla2: {
                fontSize: 9,
                margin: [0, 10, 0, 0]
            },
            tablaFinal: {
                fontSize: 11,
                margin: [70, 50, 70, 0]
            }

        }
    };
    
     var contador;

    var detalle = "";
    var banco = "";
    var fechaPago = "";
    var montoPago = "";
    var sobrante = "";
    var observaciones = "";
    for (contador = 0; contador < pPagos.length; contador++) {
        detalle += pPagos[contador].pago.detalle + "\n";
        banco += verificarNull(pPagos[contador].pago.banco)+"\n";
        fechaPago +=getFechaFormatoVista(pPagos[contador].pago.fechaPago) + "\n";
        montoPago += currencyFormat(pPagos[contador].pago.montoPago) + "\n";
        sobrante += currencyFormat(pPagos[contador].pago.sobrante) + "\n";
        observaciones += verificarNull(pPagos[contador].pago.observaciones) + "\n";
    }
    var listaPagos = [detalle,banco,fechaPago,montoPago,sobrante,observaciones];
    
    
    var detalle = "";
    var banco = "";
    var fechaCobro = "";
    var cantidadDias = "";
    var interesMora = "";
    var montoenmora = "";
    var sobrante = "";
    var pagoCliente = "";
    
    for (contador = 0; contador < pMoratoria.length; contador++) {
        detalle += pMoratoria[contador].interes.detalle + "\n";
        banco += verificarNull(pMoratoria[contador].interes.banco)+"\n";
        fechaCobro += getFechaFormatoVista(pMoratoria[contador].interes.fechaCobro) + "\n";
        cantidadDias +=pMoratoria[contador].interes.cantidadDias + "\n";
        interesMora += currencyFormat(pMoratoria[contador].interes.interesMora) + "\n";        
        montoenmora += currencyFormat(pMoratoria[contador].interes.montoenmora) + "\n";
        sobrante += currencyFormat(pMoratoria[contador].interes.sobrante) + "\n";
        pagoCliente += currencyFormat(pMoratoria[contador].interes.pagoCliente) + "\n";
    }
    var listaMoratoria = [detalle,banco,fechaCobro,cantidadDias,interesMora,montoenmora,sobrante,pagoCliente];
    
    
   
    documentoImprimirConsulta.content[4].table.body.push(listaPagos);
    documentoImprimirConsulta.content[6].table.body.push(listaMoratoria);
   
    documentoImprimirConsulta.content[7].table.body.push([currencyFormat(pSobrante),getFechaFormatoVista(pProximoPago)]);


    pdfMake.createPdf(documentoImprimirConsulta).open();
}
