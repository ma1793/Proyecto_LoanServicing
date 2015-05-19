univerApp.directive("elegir.pago.morosidad", function() {
    return {
        restrict: "E",
        replace: true,
        templateUrl: "app/shared/componentesModals/elegirPago/elegirPagoMorosidad.html",
        controller: function ($scope,$rootScope) {
            //UI Components ***
            uiInitCheckbox();
            $scope.tipoPago = 1;

            $scope.CambioTipoPago = function(pTipoPago) {
                $scope.tipoPago = pTipoPago;
                esperaTiempoFuncion(uiInitCheckbox,50);
            };

            $rootScope.FinalizarModalPrestamosPagoMorosidad = function(){
                    if ($scope.tipoPago == 1) {
                        $rootScope.ConstruirPagoMorosidadJSON();
                    }
                    else {
                        $rootScope.ContruirPagoSobranteJSON();
                    }
            };

        }
    };
});
