univerApp.directive("elegir.cliente", function() {
    return {
        restrict: "E",
        replace: true,
        templateUrl: "app/shared/componentesModals/elegirCliente/elegirCliente.html",
        controller: function ($scope) {
            //UI Components ***
            uiInitCheckbox();


            $scope.tipoCliente = 1;
            $scope.CambioTipoCliente = function(pTipoCliente) {
                $scope.tipoCliente = pTipoCliente;
                esperaTiempoFuncion(uiInitCheckbox,50);
            };



        }
    };
});
