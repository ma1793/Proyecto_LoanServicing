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
                if ($.isNumeric($scope.nuevoPlazo) && ($scope.nuevoPlazo >= 0)) {
                    if (!isInJson(plazosJSON, $scope.nuevoPlazo)) {
                        contadorPlazo++;
                        plazosJSON.push({
                            id: contadorPlazo,
                            name: $scope.nuevoPlazo
                        });
                        $scope.plazos = plazosJSON;
                        $rootScope.plazoSeleccionado = {id: contadorPlazo, name: $scope.nuevoPlazo};
                        $scope.nuevoPlazo = "";
                        $scope.comprobarDropDowns();
                        setTimeout(function() {
                            $("#ID_DropdownPlazo").dropdown('set selected', contadorPlazo.toString());
                        }, 200);
                    }
                }
            };
            
            
            //Verifica si el elemento existe, si lo esta, solo se activa y de no estarlo se agrega y luego se activa
            $rootScope.setValorDropDownPlazo = function(pValue) {
                var filtroDropDown = plazosJSON.filter(function(plazosJSON) {
                    return plazosJSON.name === pValue;
                });
                if ((filtroDropDown).length !== 0) {
                    $rootScope.plazoSeleccionado = {id: filtroDropDown[0].id, name: pValue};
                    $scope.comprobarDropDowns();
                    setTimeout(function() {
                            $("#ID_DropdownPlazo").dropdown('set selected', filtroDropDown[0].id);
                    }, 200);
                }
                else {
                    contadorPlazo++;
                    plazosJSON.push({
                        id: contadorPlazo,
                        name: pValue
                    });
                    $scope.plazos = plazosJSON;
                    $rootScope.plazoSeleccionado = {id: contadorPlazo, name: pValue};
                    $scope.nuevoPlazo = "";
                    $scope.comprobarDropDowns();
                    
                    setTimeout(function() {
                            $("#ID_DropdownPlazo").dropdown('set selected', contadorPlazo.toString());
                    }, 200);
                }
            };


        }        
    };
});
