univerApp.directive("dropdown.plazos", function() {
    return {
        restrict: "E",
        replace: true,
        templateUrl: "app/shared/ui/dropdown/plazos/plazosDropdown.html",
        controller: function ($scope,$rootScope) {
            /*Init UI*/
            uiInitDropdown();
            
            //Init***
            $rootScope.plazoSeleccionado = null;

            

            //Variables Dropdown
            var contadorPlazo = 3;

            //Valores Default Dropdown
            var plazosJSON = [{
                id: 1,
                name: 1
            }, {
                id: 2,
                name: 2
            }, {
                id: 3,
                name: 3
            }];
            //Dropdown Plazos
            $scope.plazos = plazosJSON;
            $scope.selectedDDPlazo= -1;

            $scope.selectPlazo = function(pPlazo,pIndice) {
                $rootScope.plazoSeleccionado = pPlazo;
                $scope.selectedDDPlazo = pIndice;
                $scope.comprobarDropDowns();

            };
            $scope.agregarNuevoPlazo = function() {
                if ($.isNumeric($scope.nuevoPlazo) && ($scope.nuevoPlazo > 0)) {
                    if (!isInJson(plazosJSON, $scope.nuevoPlazo)) {
                        $scope.setNuevoElemento();
                        setTimeout(function() {
                            $("#ID_DropdownPlazo").data().moduleDropdown.action.activate(undefined, contadorPlazo.toString());
                        }, 200);
                    }
                }
            };
            //Agregar el elemento al json del dropdown y cambia el elemento seleccionado
            $scope.setNuevoElemento = function() {
                contadorPlazo++;
                plazosJSON.push({
                    id: contadorPlazo,
                    name: $scope.nuevoPlazo
                });
                $scope.plazos = plazosJSON;
                $rootScope.plazoSeleccionado = {id: contadorPlazo, name: $scope.nuevoPlazo};
                $scope.nuevoPlazo = "";
                $scope.comprobarDropDowns();
            };
            
            //Verifica si el elemento existe, si lo esta, solo se activa y de no estarlo se agrega y luego se activa
            $rootScope.setValorDropDown = function(pValue) {
                var filtroDropDown = plazosJSON.filter(function(plazosJSON) {
                    return plazosJSON.name === pValue;
                });
                if ((filtroDropDown).length !== 0) {
                    $rootScope.plazoSeleccionado = pValue;
                    setTimeout(function() {
                            $("#ID_DropdownPlazo").data().moduleDropdown.action.activate(undefined, filtroDropDown[0].id);
                    }, 200);
                }
                else{
                    $scope.setNuevoElemento();
                    setTimeout(function() {
                            $("#ID_DropdownPlazo").data().moduleDropdown.action.activate(undefined, filtroDropDown[0].id);
                    }, 200);
                }
            };


        }        
    };
});
