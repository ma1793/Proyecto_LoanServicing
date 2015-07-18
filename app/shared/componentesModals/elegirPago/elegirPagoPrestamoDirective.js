univerApp.directive("elegir.pago.prestamo", function() {
    return {
        restrict: "E",
        replace: true,
        templateUrl: "app/shared/componentesModals/elegirPago/elegirPagoPrestamo.html",
        controller: function ($scope,$rootScope) {
            //UI Components ***
            uiInitCheckbox();
            $scope.tipoPago = 1;

            $scope.cambioTipoPago = function(pTipoPago) {
                $scope.tipoPago = pTipoPago;
                esperaTiempoFuncion(uiInitCheckbox,50);
            };
            
             $rootScope.finalizarModalPrestamosPago = function(){
                    if ($scope.tipoPago == 1) {
                        $rootScope.construirPagoCompletoJSON();
                    }
                    else if($scope.tipoPago == 2){
                         $rootScope.construirPagoSobranteJSON();
                    }
                    
            };

        }
    };
});
