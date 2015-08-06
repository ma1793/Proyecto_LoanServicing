univerApp.directive("elegir.estado.cuenta", function() {
    return {
        restrict: "E",
        replace: true,
        templateUrl: "app/shared/componentesModals/elegirEstadoCuenta/elegirEstadoCuenta.html",
        controller: function ($scope,$rootScope,pagosRest) {


      
            //Funciones Pago Morosidad
            $scope.initPagosMorosidad=function(){
                $scope.fechaActual = $rootScope.fechaEstadoCuenta;
                $scope.fechaActualFormatoVista =  getFechaFormatoVista($scope.fechaActual);
                
                $scope.cantidadDiasAtraso= 0;
                $scope.numeroCuotasMora = $scope.numeroCuotasMora($scope.fechaActual);
                $scope.montoCuotasMora = $scope.montoCuotasMora($scope.numeroCuotasMora);
                $scope.cobroInteres=$scope.cobroInteres($scope.cantidadDiasAtraso);
                $scope.sobranteMorosidad = $rootScope.caratulaSeleccionada.sobranteActual;
                $scope.saldoCancelar = $scope.saldoCancelar($scope.montoCuotasMora, $scope.cobroInteres,$scope.sobranteMorosidad);
                
            };
            
           


             $scope.numeroCuotasMora = function(pFechaActual){
                var numeroCuotas = 0;
                var diaFechaProxPago = $rootScope.caratulaSeleccionada.fechaProxPago.substring(8,10);
                var mesFechaProxPago = $rootScope.caratulaSeleccionada.fechaProxPago.substring(5,7);
                var yearFechaProxPago = $rootScope.caratulaSeleccionada.fechaProxPago.substring(0,4);
                
                var mesesDiferencia = (parseInt(pFechaActual.substring(0,4))-parseInt(yearFechaProxPago))*12+(parseInt(pFechaActual.substring(5,7))-parseInt(mesFechaProxPago));
                if(mesesDiferencia === 1){
                    if((parseInt(pFechaActual.substring(8,10)) - parseInt(diaFechaProxPago) ) < 0){
                        $scope.cantidadDiasAtraso= showDiffDays($scope.fechaActual.substring(0,10),$rootScope.caratulaSeleccionada.fechaProxPago.substring(0,10)); 
                        numeroCuotas = 0;
                        
                    }else{
                        $scope.cantidadDiasAtraso= Math.abs(parseInt($scope.fechaActual.substring(8,10)) - parseInt($rootScope.caratulaSeleccionada.fechaProxPago.substring(8,10)));
                        numeroCuotas = 1;
                    }
                }
                else{
                    numeroCuotas = mesesDiferencia;
                    $scope.cantidadDiasAtraso= Math.abs(parseInt($scope.fechaActual.substring(8,10)) - parseInt($rootScope.caratulaSeleccionada.fechaProxPago.substring(8,10)));
                }
                return numeroCuotas;
            };


            $scope.montoCuotasMora = function(pNumeroCuotas){
                var montoCuotas = 0;
                var pagoMensualMoratoria = ($rootScope.desgloseSeleccionado.monto*$rootScope.desgloseSeleccionado.tasaAnualMoratoria)/(100*12);

                for(var contador = 1;contador <=pNumeroCuotas;contador++ ){
                    montoCuotas +=pagoMensualMoratoria;
                }
                return montoCuotas;
            };
            
            
           
            $scope.cobroInteres = function(pDiasAtraso){
                var pagoMensualMoratoria = ($rootScope.desgloseSeleccionado.monto*$rootScope.desgloseSeleccionado.tasaAnualMoratoria)/(100*12);
                return (pagoMensualMoratoria/30)*pDiasAtraso;
            };


            $scope.saldoCancelar = function(pMontoCuotasMora,pInteres,pSobrante){
                return (pMontoCuotasMora+pInteres)-pSobrante;
            };

           

            //init**
            $scope.initPagosMorosidad();




        }
    };
});
