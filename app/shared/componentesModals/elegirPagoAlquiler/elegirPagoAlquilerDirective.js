univerApp.directive("elegir.pago.alquiler", function() {
    return {
        restrict: "E",
        replace: true,
        templateUrl: "app/shared/componentesModals/elegirPagoAlquiler/elegirPagoAlquiler.html",
        controller: function ($scope,$rootScope) {
            //UI Components ***
            uiInitCheckbox();
            $scope.tipoPago = 1;

            $scope.CambioTipoPago = function(pTipoPago) {
                $scope.tipoPago = pTipoPago;
                esperaTiempoFuncion(uiInitCheckbox,50);
            };

            $rootScope.FinalizarModalAlquileresPago = function(){
                if ($scope.tipoPago == 1) {
                    //$rootScope.ConstruirPagoMensualidadJSON();
                }
                else {
                    //$rootScope.ContruirPagoDepositoJSON();
                }

            };

        }
    };
});
