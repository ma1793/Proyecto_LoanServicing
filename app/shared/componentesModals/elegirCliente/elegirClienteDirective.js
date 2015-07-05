univerApp.directive("elegir.cliente", function() {
    return {
        restrict: "E",
        replace: true,
        templateUrl: "app/shared/componentesModals/elegirCliente/elegirCliente.html",
        controller: function ($scope,$rootScope) {
            //UI Components ***
            uiInitCheckbox();


            $scope.tipoCliente = 1;
            $scope.cambioTipoCliente = function(pTipoCliente) {
                $rootScope.tipoClienteSeleccionado = pTipoCliente;
                $scope.tipoCliente = pTipoCliente;
                esperaTiempoFuncion(uiInitCheckbox,50);
            };



        }
    };
});
