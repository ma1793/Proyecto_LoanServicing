univerApp.directive("dropdown.meses", function() {
    return {
        restrict: "E",
        replace: true,
        templateUrl: "app/shared/ui/dropdown/meses/mesesDropdown.html",
        controller: function ($scope,$rootScope) {
            //Init***
            $rootScope.mesSeleccionado = null;

            uiInitDropdown();

            //Variables Dropdown
            var contadorMes = 3;

            //Valores Default Dropdown
            var mesesJSON = [{
                id: 1,
                name: 1
            }, {
                id: 2,
                name: 2
            }, {
                id: 3,
                name: 3
            }];
            //Dropdown Meses
            $scope.meses = mesesJSON;
            $scope.selectedDDMes= -1;

            $scope.selectMes = function(pMes,pIndice) {
                $rootScope.mesSeleccionado = pMes;
                $scope.selectedDDMes = pIndice;
                $scope.comprobarDropDowns();

            };
            $scope.agregarNuevoMes = function() {
                if ($.isNumeric($scope.nuevoMes) && ($scope.nuevoMes > 0)) {
                    if (!isInJson(mesesJSON, $scope.nuevoMes)) {
                        contadorMes = contadorMes + 1;
                        mesesJSON.push({
                            id: contadorMes,
                            name: $scope.nuevoMes
                        });
                        $scope.meses = mesesJSON;
                        $rootScope.mesSeleccionado = {id: contadorMes,name: $scope.nuevoMes};
                        $scope.nuevoMes = "";
                        $scope.comprobarDropDowns();
                        setTimeout(function() {
                            $("#ID_DropdownMes").data().moduleDropdown.action.activate(undefined, contadorMes.toString());
                        }, 200);
                    }
                }
            };

        }


        
    };
});
