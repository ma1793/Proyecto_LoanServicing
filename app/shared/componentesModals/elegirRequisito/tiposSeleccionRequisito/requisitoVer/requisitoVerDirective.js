univerApp.directive("elegir.requisitos.ver", function() {
    return {
        restrict: "E",
        replace: true,
        templateUrl: "app/shared/componentesModals/elegirRequisito//tiposSeleccionRequisito/requisitoVer/requisitoVer.html",
        controller: function($scope, $rootScope,requisitosRest) {
            
            /*Init Variables*/
            $scope.requisitoSeleccionado = [];
            $scope.selectedRequisitoIndex = -1;
            
            /*GET*/
            requisitosRest.getRequisitos(function(data){
                $rootScope.listaRequisitosPrestamo =  data;
            },$rootScope.desgloseSeleccionado.idDesgloceGasto);
            
            
            
            
            $scope.selectValueRequisito = function(pIndice) {
                $scope.selectedRequisitoIndex = pIndice;
            };

           
            $scope.elegirOperacionRequisitos = function(pRequisito) {
                $scope.requisitoSeleccionado = pRequisito;
                var tagURL = "/files/getFile/";
                var fileURL = $scope.requisitoSeleccionado.serverLocation;
                openInNewTab(rootURL + tagURL + fileURL);
            };

            $scope.eliminarRequisitoVer = function(pRequisito, pIndice) {
                requisitosRest.deleteRequisitoSeleccionado(function(data) {
                        $rootScope.listaRequisitosPrestamo = data;
                }, pRequisito);
                
               
            };

            $scope.hoverEnterBotonEliminarRequisitoVer = function(pIndice) {
                $('#ID_Requisito_' + pIndice).css({"background-color": "rgba(255, 102, 102, 0.85)", "color": "white"});

            };

            $scope.hoverLeaveBotonEliminarRequisitoVer = function(pIndice) {
                $('#ID_Requisito_' + pIndice).css({"background-color": "white", "color": "rgba(0, 0, 0, 0.4)"});
            };

         

        }
    };
});