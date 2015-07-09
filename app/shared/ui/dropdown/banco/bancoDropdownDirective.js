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
                        contadorBanco++;
                        bancosJSON.push({
                            id: contadorBanco,
                            name: $scope.nuevoBanco
                        });
                        $scope.bancos = bancosJSON;
                        $rootScope.bancoSeleccionado = {id: contadorBanco, name:$scope.nuevoBanco};
                        $scope.nuevoBanco = "";
                        $scope.comprobarDropDowns();
                        setTimeout(function() {
                            $("#ID_DropdownBanco").dropdown('set selected', contadorBanco.toString());
                        }, 300);
                    }
                    
                }
            };
       
            
            //Verifica si el elemento existe, si lo esta, solo se activa y de no estarlo se agrega y luego se activa
            $rootScope.setValorDropDown = function(pValue) {
                var filtroDropDown = bancosJSON.filter(function(bancosJSON) {
                    return bancosJSON.name === pValue;
                });
                if ((filtroDropDown).length !== 0) {
                    $rootScope.bancoSeleccionado = {id: filtroDropDown[0].id, name: pValue};
                    $scope.comprobarDropDowns();
                    setTimeout(function() {
                            $("#ID_DropdownBanco").dropdown('set selected', filtroDropDown[0].id);
                    }, 200);
                }
                else{
                    contadorBanco++;
                    bancosJSON.push({
                        id: contadorBanco,
                        name: pValue
                    });
                    $scope.bancos = bancosJSON;
                    $rootScope.bancoSeleccionado = {id: contadorBanco, name:pValue};
                    $scope.nuevoBanco = "";
                    $scope.comprobarDropDowns();
                    setTimeout(function() {
                            $("#ID_DropdownBanco").dropdown('set selected', contadorBanco.toString());
                    }, 200);
                }
            };
            
            
            
            
        }
    };
});
