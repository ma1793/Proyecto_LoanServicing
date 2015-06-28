univerApp.directive("elegir.pago.morosidad", function() {
    return {
        restrict: "E",
        replace: true,
        templateUrl: "app/shared/componentesModals/elegirPago/elegirPagoMorosidad.html",
        controller: function ($scope,$rootScope) {
            //UI Components ***
            uiInitCheckbox();
            $scope.tipoPago = 1;

            $scope.cambioTipoPago = function(pTipoPago) {
                $scope.tipoPago = pTipoPago;
                esperaTiempoFuncion(uiInitCheckbox,50);
            };

            $rootScope.finalizarModalPrestamosPagoMorosidad = function(){
                    if ($scope.tipoPago == 1) {
                        $rootScope.construirPagoMorosidadJSON();
                    }
                    else {
                        $rootScope.construirPagoSobranteJSON();
                    }
            };

        }
    };
});
