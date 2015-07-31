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
                $scope.fechaActual = getFechaActual();
                $scope.fechaActual = $scope.fechaActual + "T00:00:00";
                
                
               
                $scope.cantidadDiasAtraso= parseInt($scope.fechaActual.substring(8,10)) - parseInt($rootScope.caratulaSeleccionada.fechaProxPago.substring(8,10));
                $scope.numeroCuotasMora = $scope.numeroCuotasMora($scope.fechaActual);
                $scope.montoCuotasMora = $scope.montoCuotasMora($scope.numeroCuotasMora);
                $scope.montoCuotas = $scope.montoCuotas();                
                $scope.cobroInteres=$scope.cobroInteres($scope.cantidadDiasAtraso);
                $scope.sobranteMorosidad = $rootScope.caratulaSeleccionada.sobranteActual;
                $scope.saldoCancelar = $scope.saldoCancelar($scope.montoCuotas,$scope.montoCuotasMora, $scope.cobroInteres,$scope.sobranteMorosidad);
               
                $scope.montoPagoMorosidad = parseFloat($scope.saldoCancelar.toFixed(2));
                $scope.cumpleInputs = true; 


            };


            $scope.numeroCuotasMora = function(pFechaActual){
                var mesFechaProxPago = $rootScope.caratulaSeleccionada.fechaProxPago.substring(5,7);
                var yearFechaProxPago = $rootScope.caratulaSeleccionada.fechaProxPago.substring(0,4);
                
                return   (parseInt(pFechaActual.substring(0,4))-parseInt(yearFechaProxPago))*12+(parseInt(pFechaActual.substring(5,7))-parseInt(mesFechaProxPago));
            };


            $scope.montoCuotasMora = function(pNumeroCuotas){
                var montoCuotas = 0;
                var pagoMensualMoratoria = ($rootScope.desgloseSeleccionado.monto*$rootScope.desgloseSeleccionado.tasaAnualMoratoria)/(100*12);

                for(var contador = 1;contador <=pNumeroCuotas;contador++ ){
                    montoCuotas +=pagoMensualMoratoria;
                }
                return montoCuotas;
            };
            
            
            $scope.montoCuotas = function(){
                var pagoMensual=($rootScope.desgloseSeleccionado.monto*$rootScope.desgloseSeleccionado.tasaAnual)/(100*12);
                return pagoMensual;
            };

            $scope.cobroInteres = function(pDiasAtraso){
                var pagoMensualMoratoria = ($rootScope.desgloseSeleccionado.monto*$rootScope.desgloseSeleccionado.tasaAnualMoratoria)/(100*12);
                return (pagoMensualMoratoria/30)*pDiasAtraso;
            };


            $scope.saldoCancelar = function(pMontoCuotas,pMontoCuotasMora,pInteres,pSobrante){
                return (pMontoCuotas+pMontoCuotasMora+pInteres)-pSobrante;
            };


            $rootScope.construirPagoMorosidadJSON = function(){
                
                var pagoMorosidad  = {
                    "id": {
                        "idCaratulaPrestamo": $rootScope.caratulaSeleccionada.idCaratulaPrestamo
                    },
                    "interes": {
                        "fechaCobro": $scope.fechaActual,
                        "interesMora": $scope.cobroInteres,
                        "montoenmora": $scope.montoCuotas+$scope.montoCuotasMora,
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
