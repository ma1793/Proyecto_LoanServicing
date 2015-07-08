univerApp.directive("dropdown.comision", function() {
    return {
        restrict: "E",
        replace: true,
        templateUrl: "app/shared/ui/dropdown/comision/comisionDropdown.html",
        controller: function ($scope,$rootScope) {
            
            /*UI Init*/
            uiInitDropdown();
            
            //Init***
            $rootScope.comisionSeleccionada = null;

            //Variables Dropdown
            var contadorComision = 3;

            //Valores Default Dropdown
            var comisionesJSON = [{
                    id: 1,
                    name: 4
                }, {
                    id: 2,
                    name: 5
                }, {
                    id: 3,
                    name: 6
                }];
            //Dropdown comisiones
            $scope.comisiones = comisionesJSON;
            $scope.selectedDDComision = -1;

            $scope.selectComision = function(pComision,pIndice) {
                $rootScope.comisionSeleccionada = pComision;
                $scope.selectedDDComision = pIndice;
                $scope.comprobarDropDowns();

            };
            $scope.agregarNuevaComision = function() {
                if ($.isNumeric($scope.nuevaComision) && ($scope.nuevaComision > 0)) {
                    if (!isInJson(comisionesJSON, $scope.nuevaComision)) {
                        $scope.setNuevoElemento();
                        setTimeout(function() {
                            $("#ID_DropdownComision").data().moduleDropdown.action.activate(undefined, contadorComision.toString());
                        }, 200);
                    }
                }
            };
            //Agregar el elemento al json del dropdown y cambia el elemento seleccionado
            $scope.setNuevoElemento = function() {
                contadorComision++;
                comisionesJSON.push({
                    id: contadorComision,
                    name: $scope.nuevaComision
                });
                $scope.comisiones = comisionesJSON;
                $rootScope.comisionSeleccionada = {id: contadorComision, name: $scope.nuevaComision};
                $scope.nuevaComision = "";
                $scope.comprobarDropDowns();
            };
            
            //Verifica si el elemento existe, si lo esta, solo se activa y de no estarlo se agrega y luego se activa
            $rootScope.setValorDropDown = function(pValue) {
                var filtroDropDown = comisionesJSON.filter(function(comisionesJSON) {
                    return comisionesJSON.name === pValue;
                });
                if ((filtroDropDown).length !== 0) {
                    $rootScope.comisionSeleccionada = pValue;
                    setTimeout(function() {
                            $("#ID_DropdownComision").data().moduleDropdown.action.activate(undefined, filtroDropDown[0].id);
                    }, 200);
                }
                else{
                    $scope.setNuevoElemento();
                    setTimeout(function() {
                            $("#ID_DropdownComision").data().moduleDropdown.action.activate(undefined, filtroDropDown[0].id);
                    }, 200);
                }
            };
            
            

        }    
    };
});
