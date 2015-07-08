univerApp.directive("dropdown.moratoria", function() {
    return {
        restrict: "E",
        replace: true,
        templateUrl: "app/shared/ui/dropdown/moratoria/moratoriaDropdown.html",
        controller: function ($scope,$rootScope) {
            /*Init UI*/
            uiInitDropdown();
            
            //Init***
            $rootScope.moratoriaSeleccionada = null;

            

            //Variables Dropdown
            var contadorMoratoria = 5;

            //Valores Default Dropdown
            var moratoriasJSON = [{
                        id: 1,
                        name: 14
                    }, {
                        id: 2,
                        name: 15
                    }, {
                        id: 3,
                        name: 16
                    }, {
                        id: 4,
                        name: 17
                    }, {
                        id: 5,
                        name: 18
                    }];
            //Dropdown Moratorias
            $scope.moratorias = moratoriasJSON;
            $scope.selectedDDMoratoria= -1;

            $scope.selectMoratoria = function(pMoratoria,pIndice) {
                $rootScope.moratoriaSeleccionada = pMoratoria;
                $scope.selectedDDMoratoria = pIndice;
                $scope.comprobarDropDowns();

            };
            $scope.agregarNuevoMoratoria = function() {
                if ($.isNumeric($scope.nuevaMoratoria) && ($scope.nuevaMoratoria > 0)) {
                    if (!isInJson(moratoriasJSON, $scope.nuevaMoratoria)) {
                        $scope.setNuevoElemento();
                        setTimeout(function() {
                            $("#ID_DropdownMoratoria").data().moduleDropdown.action.activate(undefined, contadorMoratoria.toString());
                        }, 200);
                    }
                }
            };
            
             //Agregar el elemento al json del dropdown y cambia el elemento seleccionado
            $scope.setNuevoElemento = function() {
                contadorMoratoria++;
                moratoriasJSON.push({
                    id: contadorMoratoria,
                    name: $scope.nuevaMoratoria
                });
                $scope.moratorias = moratoriasJSON;
                $rootScope.moratoriaSeleccionada = {id: contadorMoratoria, name: $scope.nuevaMoratoria};
                $scope.nuevaMoratoria = "";
                $scope.comprobarDropDowns();
            };
            
            //Verifica si el elemento existe, si lo esta, solo se activa y de no estarlo se agrega y luego se activa
            $rootScope.setValorDropDown = function(pValue) {
                var filtroDropDown = moratoriasJSON.filter(function(moratoriasJSON) {
                    return moratoriasJSON.name === pValue;
                });
                if ((filtroDropDown).length !== 0) {
                    $rootScope.moratoriaSeleccionada = pValue;
                    setTimeout(function() {
                            $("#ID_DropdownMoratoria").data().moduleDropdown.action.activate(undefined, filtroDropDown[0].id);
                    }, 200);
                }
                else{
                    $scope.setNuevoElemento();
                    setTimeout(function() {
                            $("#ID_DropdownMoratoria").data().moduleDropdown.action.activate(undefined, filtroDropDown[0].id);
                    }, 200);
                }
            };
            
        }
        
    };
});
