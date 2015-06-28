univerApp.directive("elegir.caratula", function() {
    return {
        restrict: "E",
        replace: true,
        templateUrl: "app/shared/componentesModals/elegirCaratula/elegirCaratula.html",
        controller: function ($scope,$rootScope,caratulasRest) {
            //Init***

            //Init Global Caratula Seleccionada
            $rootScope.caratulaSeleccionada =[];

            //Init condicion de paso en el modal
            $rootScope.cumplePasoModal = false;

            $scope.caratulasDesglose = [];
            $scope.selectedCaratulaIndex = -1;
            /**/

            caratulasRest.getCaratulas(function(data){
                $scope.caratulasDesglose =  data;
            },$rootScope.desgloseSeleccionado.idDesgloceGasto);

            $scope.seleccionCaratula = function(pCaratula,pIndice){
                $rootScope.caratulaSeleccionada = pCaratula;
                $scope.selectedCaratulaIndex   = pIndice;
                $rootScope.cumplePasoModal =  true;
            };
        }
    };
});
