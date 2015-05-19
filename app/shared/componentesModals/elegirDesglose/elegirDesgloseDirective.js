univerApp.directive("elegir.desglose", function() {
    return {
        restrict: "E",
        replace: true,
        templateUrl: "app/shared/componentesModals/elegirDesglose/elegirDesglose.html",
        controller: function ($scope,$rootScope,desglosesRest) {
        //Init***

        //Init Global Desglose Seleccionado
            $rootScope.desgloseSeleccionado =[];

        //Init condicion de paso en el modal
        $rootScope.cumplePasoModal = false;

            $scope.desglosesCliente = [];
            $scope.selectedDesgloseIndex = -1;

            desglosesRest.GetDesgloses(function(data){
                $scope.desglosesCliente =  data;
            },$rootScope.clienteSeleccionado.idPersona);

            $scope.SeleccionDesglose = function(pDesglose,pIndice){
                $rootScope.desgloseSeleccionado = pDesglose;
                $scope.selectedDesgloseIndex = pIndice;
                $rootScope.cumplePasoModal =  true;
            };


            $rootScope.EliminarDesglose =function(){
                desglosesRest.GetVerificarEliminarDesglose(function(data){
                    if(data){
                        desglosesRest.EliminarDesglose(function(data){
                           console.log(data);
                            alert("lo logro");
                        },$rootScope.desgloseSeleccionado.idDesgloceGasto);
                    }
                    else
                        alert("no se puede eliminar");
                }, $rootScope.desgloseSeleccionado.idDesgloceGasto);
            };
        }
    };
});
