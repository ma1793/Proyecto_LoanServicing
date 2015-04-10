univerApp.directive("elegir.contrato", function() {
    return {
        restrict: "E",
        replace: true,
        templateUrl: "app/shared/componentesModals/elegirContrato/elegirContrato.html",
        controller: function ($scope,$rootScope,contratosRest) {
            //Init***

            //Init Global Contrato Seleccionado
            $rootScope.contratoSeleccionado =[];

            //Init condicion de paso en el modal
            $rootScope.cumplePasoModal = false;

            $scope.contratosCliente = [];
            $scope.selectedContratoIndex = -1;
            /**/

            contratosRest.getContratos(function(data){
                console.log("entro contrato");
                console.log($rootScope.clienteSeleccionado);
                $scope.contratosCliente =  data;
            },$rootScope.clienteSeleccionado.idPersona);

            $scope.SeleccionContrato = function(pContrato,pIndice){
                $rootScope.contratoSeleccionado = pContrato;
                $scope.selectedContratoIndex = pIndice;
                $rootScope.cumplePasoModal =  true;
            };
        }
    };
});