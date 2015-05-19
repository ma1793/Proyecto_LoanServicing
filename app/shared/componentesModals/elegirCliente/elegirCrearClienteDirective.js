univerApp.directive("elegir.crear.cliente", function() {
    return {
        restrict: "E",
        replace: true,
        templateUrl: "app/shared/componentesModals/elegirCliente/elegirCrearCliente.html",
        controller: function ($scope,$rootScope) {
            //UI Components ***
            uiInitCheckbox();

            $scope.tipoCliente = 1;
            $scope.opcionCliente = 1;
            $scope.CambioTipoCliente = function(pTipoCliente) {
                $scope.tipoCliente = pTipoCliente;
                esperaTiempoFuncion(uiInitCheckbox,50);
            };
            $scope.CambioOpcionCliente = function(pOpcionCliente) {
                $scope.opcionCliente = pOpcionCliente;
                esperaTiempoFuncion(uiInitCheckbox,50);
            };

            $rootScope.FinalizarModalAlquileresCrearContrato = function(){
                if ($scope.tipoCliente == 1) {
                    if($scope.opcionCliente == 1){
                        $rootScope.ContruirClienteFisicoJSON();
                    }
                    else{

                    }
                }
                else if($scope.tipoCliente == 2){
                    if($scope.opcionCliente == 1){
                        $rootScope.ContruirClienteJuridicoJSON();
                    }
                    else{

                    }
                }
            };

        }
    };
});
