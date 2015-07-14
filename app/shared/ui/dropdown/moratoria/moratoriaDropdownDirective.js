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
            $scope.agregarNuevaMoratoria = function() {
                if ($.isNumeric($scope.nuevaMoratoria) && ($scope.nuevaMoratoria > 0)) {
                    if (!isInJson(moratoriasJSON, $scope.nuevaMoratoria)) {
                        contadorMoratoria++;
                        moratoriasJSON.push({
                            id: contadorMoratoria,
                            name: $scope.nuevaMoratoria
                        });
                        $scope.moratorias = moratoriasJSON;
                        $rootScope.moratoriaSeleccionada = {id: contadorMoratoria, name: $scope.nuevaMoratoria};
                        $scope.nuevaMoratoria = "";
                        $scope.comprobarDropDowns();
                        setTimeout(function() {
                            $("#ID_DropdownMoratoria").dropdown('set selected',contadorMoratoria.toString());
                        }, 200);
                    }
                }
            };
            
         
            
            //Verifica si el elemento existe, si lo esta, solo se activa y de no estarlo se agrega y luego se activa
            $rootScope.setValorDropDownMoratoria = function(pValue) {
                var filtroDropDown = moratoriasJSON.filter(function(moratoriasJSON) {
                    return moratoriasJSON.name === pValue;
                });
                if ((filtroDropDown).length !== 0) {
                    $rootScope.moratoriaSeleccionada = {id: filtroDropDown[0].id, name: pValue};
                    $scope.comprobarDropDowns();
                    setTimeout(function() {
                        $("#ID_DropdownMoratoria").dropdown('set selected', filtroDropDown[0].id);
                    }, 200);
                }
                else {
                    contadorMoratoria++;
                    moratoriasJSON.push({
                        id: contadorMoratoria,
                        name: pValue
                    });
                    
                    $scope.moratorias = moratoriasJSON;
                    $rootScope.moratoriaSeleccionada = {id: contadorMoratoria, name: pValue};
                    $scope.nuevaMoratoria = "";
                    $scope.comprobarDropDowns();
                    setTimeout(function() {
                        $("#ID_DropdownMoratoria").dropdown('set selected',contadorMoratoria.toString());
                    }, 200);
                }
            };
            
        }
        
    };
});
