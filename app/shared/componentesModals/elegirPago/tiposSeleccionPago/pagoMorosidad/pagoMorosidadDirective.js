univerApp.directive("pago.morosidad", function() {
    return {
        restrict: "E",
        replace: true,
        templateUrl: "app/shared/componentesModals/elegirPago/tiposSeleccionPago/pagoMorosidad/pagoMorosidad.html",
        controller: function ($scope,$rootScope,pagosRest) {


            //Init condicion de paso en el modal
            $scope.cumpleDropdowns =  false;
            $scope.cumpleInputs =  false;
            $rootScope.cumplePasoModal = false;


            // Verificacion Formulario
            $scope.comprobarDropDowns = function(){
                if($rootScope.bancoSeleccionado != null ){
                    $scope.cumpleDropdowns = true;
                }
                $scope.comprobarCumpleFormulario();
            };

            $scope.comprobarCumpleFormulario = function(){
                $rootScope.cumplePasoModal = $scope.cumpleInputs && $scope.cumpleDropdowns;
            };

            $scope.comprobarMontoPago = function(pEstadoFormulario){
                $scope.cumpleInputs = pEstadoFormulario;
                $scope.comprobarCumpleFormulario();
            };

            //Funciones Pago Morosidad
            $scope.initPagosMorosidad=function(){
                $scope.montoPagoMorosidad = 0;
                
                if($rootScope.pagoMorosidadActivado){
                    $scope.fechaActual =getFechaActual();
                    $scope.fechaActual = $scope.fechaActual +"T00:00:00";
                }
                else{
                    $scope.fechaActual = $rootScope.fechaPagoAntiguo;
                }
               
                $scope.cantidadDiasAtraso= parseInt($scope.fechaActual.substring(8,10));;
                $scope.numeroCuotas = $scope.numeroCuotas($scope.fechaActual);
                $scope.montoCuotas = $scope.montoCuotas($scope.numeroCuotas);
                $scope.cobroInteres=$scope.cobroInteres($scope.cantidadDiasAtraso);
                $scope.faltanteMorosidad = $rootScope.caratulaSeleccionada.faltanteActual;
                $scope.sobranteMorosidad = $rootScope.caratulaSeleccionada.sobranteActual;
                $scope.saldoCancelar = $scope.saldoCancelar($scope.montoCuotas, $scope.cobroInteres,$scope.faltanteMorosidad,$scope.sobranteMorosidad);
            };


            $scope.numeroCuotas = function(pFechaActual){
                var mesFechaProxPago = $rootScope.caratulaSeleccionada.fechaProxPago.substring(5,7);
                return parseInt(pFechaActual.substring(5,7))-parseInt(mesFechaProxPago) + 1;
            };


            $scope.montoCuotas = function(pNumeroCuotas){
                var montoCuotas = 0;
                var pagoMensual=($rootScope.desgloseSeleccionado.monto*$rootScope.desgloseSeleccionado.tasaAnual)/(100*12);
                var pagoMensualMoratoria = ($rootScope.desgloseSeleccionado.monto*$rootScope.desgloseSeleccionado.tasaAnualMoratoria)/(100*12);

                for(var contador = 1;contador <pNumeroCuotas;contador++ ){
                    montoCuotas +=pagoMensualMoratoria;
                }
                montoCuotas+=pagoMensual;
                return montoCuotas;
            };

            $scope.cobroInteres = function(pDiasAtraso){
                var pagoMensual=($rootScope.desgloseSeleccionado.monto*$rootScope.desgloseSeleccionado.tasaAnual)/(100*12);
                var pagoMensualMoratoria = ($rootScope.desgloseSeleccionado.monto*$rootScope.desgloseSeleccionado.tasaAnualMoratoria)/(100*12);
                return ((pagoMensualMoratoria - pagoMensual)/30)*pDiasAtraso;
            };


            $scope.saldoCancelar = function(pMesAtraso,pInteres,pFaltante,pSobrante){
                return (pMesAtraso+pInteres+pFaltante)-pSobrante;
            };

            $rootScope.construirPagoMorosidadJSON = function(){
                
                var pagoMorosidad  = {
                    "id": {
                        "idCaratulaPrestamo": $rootScope.caratulaSeleccionada.idCaratulaPrestamo
                    },
                    "interes": {
                        "fechaCobro": $scope.fechaActual,
                        "interesMora": $scope.cobroInteres,
                        "montoenmora": $scope.montoCuotas,
                        "faltante": $scope.faltanteMorosidad,
                        "sobrante": $scope.sobranteMorosidad,
                        "detalle": listaMeses[parseInt($scope.fechaActual.substring(5,7))-1],
                        "cantidadDias": $scope.cantidadDiasAtraso,
                        "pagoCliente": $scope.montoPagoMorosidad,
                        "banco":$rootScope.bancoSeleccionado.name
                    }
                };

                 pagosRest.postPagoMorosidad(function(data) {
                     $rootScope.informeSeleccionado = data;
                 },pagoMorosidad);


            };

            //init**
            $scope.initPagosMorosidad();




        }
    };
});
