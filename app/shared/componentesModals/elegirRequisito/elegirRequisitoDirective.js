univerApp.directive("elegir.requisitos", function() {
    return {
        restrict: "E",
        replace: true,
        templateUrl: "app/shared/componentesModals/elegirRequisito/elegirRequisito.html",
        controller: function($scope, $rootScope,$filter,requisitosRest) {
            
            //UI Components ***
            uiInitCheckbox();
            
            /*Init Variables*/
            $rootScope.listaRequisitosPrestamo =[];
            $rootScope.listaRequisitosTipoCliente = [];
            $scope.tipoRequisito = 1;
            
            /*GET*/
            requisitosRest.getRequisitosTipoCliente(function(data) {
                    $rootScope.listaRequisitosTipoCliente = data;
            }, $rootScope.tipoClienteSeleccionado);
            

            $scope.cambioTipoRequisito = function(pTipoRequisito) {
                $scope.tipoRequisito = pTipoRequisito;
                esperaTiempoFuncion(uiInitCheckbox,50);
            };
            
            $rootScope.imprimirRequisitos = function() {
                $rootScope.listaRequisitosTipoCliente = $filter('orderBy')($rootScope.listaRequisitosTipoCliente, 'descripcion');
                imprimeRequisitos($rootScope.tipoClienteSeleccionado, $rootScope.listaRequisitosTipoCliente, $rootScope.listaRequisitosPrestamo);
            };
            

        }
    };
});