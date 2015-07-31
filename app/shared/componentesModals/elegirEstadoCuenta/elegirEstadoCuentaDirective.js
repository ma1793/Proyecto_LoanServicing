univerApp.directive("elegir.estado.cuenta", function() {
    return {
        restrict: "E",
        replace: true,
        templateUrl: "app/shared/componentesModals/elegirEstadoCuenta/elegirEstadoCuenta.html",
        controller: function ($scope,$rootScope,pagosRest) {


      
            //Funciones Pago Morosidad
            $scope.initPagosMorosidad=function(){
                $scope.fechaActual = $rootScope.fechaEstadoCuenta;
                
                
                
                $scope.cantidadDiasAtraso= parseInt($scope.fechaActual.substring(8,10)) - parseInt($rootScope.caratulaSeleccionada.fechaProxPago.substring(8,10));
                $scope.numeroCuotasMora = $scope.numeroCuotasMora($scope.fechaActual);
                $scope.montoCuotasMora = $scope.montoCuotasMora($scope.numeroCuotasMora);
                $scope.montoCuotas = $scope.montoCuotas();                
                $scope.cobroInteres=$scope.cobroInteres($scope.cantidadDiasAtraso);
                $scope.sobranteMorosidad = $rootScope.caratulaSeleccionada.sobranteActual;
                $scope.saldoCancelar = $scope.saldoCancelar($scope.montoCuotas,$scope.montoCuotasMora, $scope.cobroInteres,$scope.sobranteMorosidad);
                
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

           

            //init**
            $scope.initPagosMorosidad();




        }
    };
});
