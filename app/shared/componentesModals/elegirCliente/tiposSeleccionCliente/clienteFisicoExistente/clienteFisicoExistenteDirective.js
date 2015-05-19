univerApp.directive("cliente.fisico.existente", function() {
    return {
        restrict: "E",
        replace: true,
        templateUrl: "app/shared/componentesModals/elegirCliente/tiposSeleccionCliente/clienteFisicoExistente/clienteFisicoExistente.html",
        controller: function($scope,$rootScope,clientesRest){
            //Init***

            //Init Global Cliente Seleccionado
            $rootScope.clienteSeleccionado = [];

            //Init condicion de paso en el modal
            $rootScope.cumplePasoModal = false;

            $scope.clientesFisicos = [];
            $scope.selectedClienteFisicoIndex = -1;
            /**/


            clientesRest.getClientesFisicos(function(data){
                console.log("entro data");
                console.log(data);
                $scope.clientesFisicos =  data;
            });

            $scope.SeleccionClienteFisico = function(pCliente,pIndice){
                $rootScope.clienteSeleccionado = pCliente;
                $scope.selectedClienteFisicoIndex = pIndice;
                $rootScope.nombreCompletoClienteSeleccionado = pCliente.nombre + " "+ pCliente.personafisica.primerApellido +" "+ pCliente.personafisica.segundoApellido;
                $rootScope.cumplePasoModal =  true;
            };



        }
    };
});
