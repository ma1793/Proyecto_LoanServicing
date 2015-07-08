univerApp.directive("dropdown.banco", function() {
    return {
        restrict: "E",
        replace: true,
        templateUrl: "app/shared/ui/dropdown/banco/bancoDropdown.html",

        controller: function ($scope,$rootScope) {

            
            /*Init UI*/
            uiInitDropdown();

            //Variables Dropdown
            var contadorBanco = 3;
            $rootScope.bancoSeleccionado = null;

            //Valores Default Dropdown
            var bancosJSON = [{
                id: 1,
                name: "BCR"
            }, {
                id: 2,
                name: "BNCR"
            }, {
                id: 3,
                name: "BAC"
            }];
            //Dropdown Bancos
            $scope.bancos = bancosJSON;
            $scope.selectedDDBanco= -1;

            $scope.selectBanco = function(pBanco,pIndice) {
                $rootScope.bancoSeleccionado = pBanco;
                $scope.selectedItemBanco = pBanco.name;
                $scope.selectedDDBanco = pIndice;
                $scope.comprobarDropDowns();

            };
            $scope.agregarNuevoBanco = function() {
                if ($scope.nuevoBanco != "" && $scope.nuevoBanco != null) {
                    if (!isInJson(bancosJSON, $scope.nuevoBanco)) {
                        $scope.setNuevoElemento();
                        setTimeout(function() {
                            $("#ID_DropdownBanco").data().moduleDropdown.action.activate(undefined, contadorBanco.toString());
                        }, 300);
                    }
                    
                }
            };
            
            //Agregar el elemento al json del dropdown y cambia el elemento seleccionado
            $scope.setNuevoElemento = function() {
                contadorBanco++;
                bancosJSON.push({
                    id: contadorBanco,
                    name: $scope.nuevoBanco
                });
                $scope.bancos = bancosJSON;
                $rootScope.bancoSeleccionado = $scope.nuevoBanco;
                $scope.nuevoBanco = "";
                $scope.comprobarDropDowns();
            };
            
            //Verifica si el elemento existe, si lo esta, solo se activa y de no estarlo se agrega y luego se activa
            $rootScope.setValorDropDown = function(pValue) {
                var filtroDropDown = bancosJSON.filter(function(bancosJSON) {
                    return bancosJSON.name === pValue;
                });
                if ((filtroDropDown).length !== 0) {
                    $rootScope.bancoSeleccionado = pValue;
                    setTimeout(function() {
                            $("#ID_DropdownBanco").data().moduleDropdown.action.activate(undefined, filtroDropDown[0].id);
                    }, 200);
                }
                else{
                    $scope.setNuevoElemento();
                    setTimeout(function() {
                            $("#ID_DropdownBanco").data().moduleDropdown.action.activate(undefined, filtroDropDown[0].id);
                    }, 200);
                }
            };
            
            
            
            
        }
    };
});
