univerApp.directive("elegir.fecha", function() {
    return {
        restrict: "E",
        replace: true,
        templateUrl: "app/shared/componentesModals/elegirFecha/elegirFecha.html",
        controller: function($scope, $rootScope) {
            
            //Init condicion de paso en el modal
            $rootScope.cumplePasoModal = false;
            
            $scope.comprobarInput = function(pEstadoFormulario) {
 
                var fechaProxPago = new Date($rootScope.caratulaSeleccionada.fechaProxPago);
   
                if(fechaProxPago < $scope.fechaPago ){
                    $rootScope.cumplePasoModal = true;
                    $rootScope.fechaPagoAntiguo = $scope.fechaPago.toJSON();
                }
                else
                    $rootScope.cumplePasoModal = false;
            };
            $scope.initSeleccionFecha = function(){
                $scope.fechaPago = null;
            };
            /**/
            $scope.initSeleccionFecha();
        
        }
    };
});