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
            $scope.ComprobarDropDowns = function(){
                if($rootScope.bancoSeleccionado != null){
                    $scope.cumpleDropdowns = true;
                }
                $scope.ComprobarCumpleFormulario();
            };

            $scope.ComprobarCumpleFormulario = function(){
                $rootScope.cumplePasoModal = $scope.cumpleInputs && $scope.cumpleDropdowns;
            };

            $scope.ComprobarMontoPago = function(pEstadoFormulario){
                $scope.cumpleInputs = pEstadoFormulario;
                $scope.ComprobarCumpleFormulario();
            };

            //Funciones Pago Morosidad
            $scope.InitPagosMorosidad=function(){
                $scope.montoPagoMorosidad = 0;

                $scope.fechaActual =getFechaActual();
                $scope.cantidadDiasAtraso= parseInt($scope.fechaActual.substring(8,10));;
                $scope.numeroCuotas = $scope.NumeroCuotas($scope.fechaActual);
                $scope.montoCuotas = $scope.MontoCuotas($scope.numeroCuotas);
                $scope.cobroInteres=$scope.CobroInteres($scope.cantidadDiasAtraso);
                $scope.faltanteMorosidad = $rootScope.caratulaSeleccionada.faltanteActual;
                $scope.sobranteMorosidad = $rootScope.caratulaSeleccionada.sobranteActual;
                $scope.saldoCancelar = $scope.SaldoCancelar($scope.montoCuotas, $scope.cobroInteres,$scope.faltanteMorosidad,$scope.sobranteMorosidad);
            };


            $scope.NumeroCuotas = function(pFechaActual){
                var mesFechaProxPago = $rootScope.caratulaSeleccionada.fechaProxPago.substring(5,7);
                return parseInt(pFechaActual.substring(5,7))-parseInt(mesFechaProxPago) + 1;
            };


            $scope.MontoCuotas = function(pNumeroCuotas){
                var montoCuotas = 0;
                var pagoMensual=($rootScope.desgloseSeleccionado.monto*$rootScope.desgloseSeleccionado.tasaAnual)/(100*12);
                var pagoMensualMoratoria = ($rootScope.desgloseSeleccionado.monto*$rootScope.desgloseSeleccionado.tasaAnualMoratoria)/(100*12);

                for(var contador = 1;contador <pNumeroCuotas;contador++ ){
                    montoCuotas +=pagoMensualMoratoria;
                }
                montoCuotas+=pagoMensual;
                return montoCuotas;
            };

            $scope.CobroInteres = function(pDiasAtraso){
                var pagoMensual=($rootScope.desgloseSeleccionado.monto*$rootScope.desgloseSeleccionado.tasaAnual)/(100*12);
                var pagoMensualMoratoria = ($rootScope.desgloseSeleccionado.monto*$rootScope.desgloseSeleccionado.tasaAnualMoratoria)/(100*12);
                return ((pagoMensualMoratoria - pagoMensual)/30)*pDiasAtraso;
            };


            $scope.SaldoCancelar = function(pMesAtraso,pInteres,pFaltante,pSobrante){
                return (pMesAtraso+pInteres+pFaltante)-pSobrante;
            };

            $rootScope.ConstruirPagoMorosidadJSON = function(){
                var pagoMorosidad  = {
                    "id": {
                        "idCaratulaPrestamo": $rootScope.caratulaSeleccionada.idCaratulaPrestamo
                    },
                    "interes": {
                        "fechaCobro": $scope.fechaActual+"T00:00:00",
                        "interesMora": $scope.cobroInteres,
                        "montoenmora": $scope.montoCuotas,
                        "faltante": $scope.faltanteMorosidad,
                        "sobrante": $scope.sobranteMorosidad,
                        "detalle": listaMeses[parseInt($scope.fechaActual.substring(5,7))-1],
                        "cantidadDias": $scope.cantidadDiasAtraso,
                        "pagoCliente": $scope.montoPagoMorosidad,
                        "banco":$rootScope.bancoSeleccionado
                    }
                };

                console.log(JSON.stringify(pagoMorosidad));
                 pagosRest.postPagoMorosidad(function(data) {
                     $rootScope.informeSeleccionado = data;
                 },pagoMorosidad);

                console.log(JSON.stringify($rootScope.informeSeleccionado));

            };

            //init**
            $scope.InitPagosMorosidad();




        }
    };
});
