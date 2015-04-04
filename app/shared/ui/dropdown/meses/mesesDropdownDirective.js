univerApp.directive("dropdown.meses", function() {
    return {
        restrict: "E",
        replace: true,
        templateUrl: "app/shared/ui/dropdown/meses/mesesDropdown.html",
        controller: function ($scope,$rootScope,desglosesRest) {
            //Init***

            //Init Global Desglose Seleccionado
            $rootScope.desgloseSeleccionado =[];

            //Init condicion de paso en el modal
            $rootScope.cumplePasoModal = false;

            $scope.desglosesCliente = [];
            $scope.selectedDesgloseIndex = -1;
            /**/

            desglosesRest.getDesgloses(function(data){
                console.log("entro desglose");
                console.log($rootScope.clienteSeleccionado);
                $scope.desglosesCliente =  data;
            },$rootScope.clienteSeleccionado.idPersona);

            $scope.SeleccionDesglose = function(pDesglose,pIndice){
                $rootScope.desgloseSeleccionado = pDesglose;
                $scope.selectedDesgloseIndex = pIndice;
                $rootScope.cumplePasoModal =  true;
            };
        }
    };
});
