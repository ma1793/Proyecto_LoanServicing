univerApp.directive("elegir.pago.prestamo", function() {
    return {
        restrict: "E",
        replace: true,
        templateUrl: "app/shared/componentesModals/elegirPago/elegirPagoPrestamo.html",
        controller: function ($scope) {
            //UI Components ***
            uiInitCheckbox();
            $scope.tipoPago = 1;

            $scope.CambioTipoPago = function(pTipoPago) {
                $scope.tipoPago = pTipoPago;
                esperaTiempoFuncion(uiInitCheckbox,50);
            };

        }
    };
});
