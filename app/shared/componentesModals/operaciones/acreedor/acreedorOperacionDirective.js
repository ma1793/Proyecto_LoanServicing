univerApp.directive("operacion.acreedor", function() {
    return {
        restrict: "E",
        replace: true,
        templateUrl: "app/shared/componentesModals/operaciones/acreedor/acreedorOperacion.html",
        controller: function ($scope,$rootScope,caratulasRest) {
            //UI Components ***
            uiInitCheckbox();

            $scope.operacionAcreedor = 1;
         
            $scope.cambioOpcionAcreedor = function(pOperacion) {
                $scope.operacionAcreedor = pOperacion;
                esperaTiempoFuncion(uiInitCheckbox,50);
            };
            
            caratulasRest.getAcreedores(function(data) {
                $scope.listaAcreedores = data;
            });
            
            $scope.selectedAcreedorIndex = -1;
            $rootScope.acreedorSeleccionado = null;
            
            $scope.seleccionAcreedor = function(pAcreedor,pIndice){
                $rootScope.acreedorSeleccionado = pAcreedor;
                $scope.selectedAcreedorIndex = pIndice;
            };
            

                

            $rootScope.finalizarModal= function(){
                
            };

        }
    };
});
