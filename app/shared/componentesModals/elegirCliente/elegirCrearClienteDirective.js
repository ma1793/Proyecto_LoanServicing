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
            $scope.cambioTipoCliente = function(pTipoCliente) {
                $rootScope.tipoClienteSeleccionado = pTipoCliente;
                $scope.tipoCliente = pTipoCliente;
                esperaTiempoFuncion(uiInitCheckbox,50);
            };
            $scope.cambioOpcionCliente = function(pOpcionCliente) {
                $scope.opcionCliente = pOpcionCliente;
                esperaTiempoFuncion(uiInitCheckbox,50);
            };

            $rootScope.finalizarModalCrearCliente = function(){
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
