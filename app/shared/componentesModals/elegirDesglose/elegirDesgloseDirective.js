univerApp.directive("elegir.desglose", function() {
    return {
        restrict: "E",
        replace: true,
        templateUrl: "app/shared/componentesModals/elegirDesglose/elegirDesglose.html",
        controller: function($scope, $rootScope, desglosesRest) {
            //Init***

            //Init Global Desglose Seleccionado
            $rootScope.desgloseSeleccionado = [];

            //Init condicion de paso en el modal
            $rootScope.cumplePasoModal = false;

            $scope.desglosesCliente = [];
            $scope.selectedDesgloseIndex = -1;

            desglosesRest.getDesgloses(function(data) {
                $scope.desglosesCliente = data;
            }, $rootScope.clienteSeleccionado.idPersona);

            $scope.seleccionDesglose = function(pDesglose, pIndice) {
                $rootScope.desgloseSeleccionado = pDesglose;
                $scope.selectedDesgloseIndex = pIndice;
                $rootScope.cumplePasoModal = true;
            };
            

            $rootScope.eliminarElemento= function() {
                desglosesRest.getVerificarEliminarDesglose(function(data) {
                    if (data) {
                        desglosesRest.eliminarDesglose(function(data) {
                            desglosesRest.getDesgloses(function(data) {
                                $scope.desglosesCliente = data;
                            }, $rootScope.clienteSeleccionado.idPersona);
                            alert("El Desglose Seleccionado Ha Sido Eliminado");
                        }, $rootScope.desgloseSeleccionado.idDesgloceGasto);
                    }
                    else
                        alert("No Se Puede Eliminar El Desglose Seleccionado");
                }, $rootScope.desgloseSeleccionado.idDesgloceGasto);
            };
        }
    };
});
