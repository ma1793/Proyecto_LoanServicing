univerApp.directive("cliente.jurico.existente", function() {
    return {
        restrict: "E",
        replace: true,
        templateUrl: "app/shared/componentesModals/elegirCliente/tiposSeleccionCliente/clienteJuridicoExistente/clienteJuridicoExistente.html",
        controller: function($scope,$rootScope,clientesRest){
            //Init***

            //Init Global Cliente Seleccionado
            $rootScope.clienteSeleccionado = [];

            //Init condicion de paso en el modal
            $rootScope.cumplePasoModal = false;

            $scope.clientesJuridicos = [];
            $scope.selectedClienteJuridicoIndex = -1;
            /**/

            clientesRest.getClientesJuridicos(function(data){
                $scope.clientesJuridicos =  data;
            });

            $scope.seleccionClienteJuridico = function(pCliente,pIndice){
                $rootScope.clienteSeleccionado = pCliente;
                $scope.selectedClienteJuridicoIndex = pIndice;
                $rootScope.nombreCompletoClienteSeleccionado = pCliente.nombre;
                $rootScope.cumplePasoModal =  true;
            };

        }
    };
});
