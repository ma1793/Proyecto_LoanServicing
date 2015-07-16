univerApp.directive("dropdown.tasa.anual", function() {
    return {
        restrict: "E",
        replace: true,
        templateUrl: "app/shared/ui/dropdown/tasaAnual/tasaAnualDropdown.html",
        controller: function ($scope,$rootScope) {
            /*Init UI*/
            uiInitDropdown();

            
            //Init***
            $rootScope.tasaAnualSeleccionada = null;

            
            //Variables Dropdown
            var contadorTasaAnual = 3;

            //Valores Default Dropdown
            var tasasAnualesJSON = [{
                        id: 1,
                        name: 13
                    }, {
                        id: 2,
                        name: 14
                    }, {
                        id: 3,
                        name: 15
                    }];
            //Dropdown TasasAnuales
            $scope.tasasAnuales = tasasAnualesJSON;
            $scope.selectedDDTasaAnual= -1;

            $scope.selectTasaAnual = function(pTasaAnual,pIndice) {
                $rootScope.tasaAnualSeleccionada = pTasaAnual;
                $scope.selectedDDTasaAnual = pIndice;
                $scope.comprobarDropDowns();

            };
            $scope.agregarNuevaTasaAnual = function() {
                if ($.isNumeric($scope.nuevaTasaAnual) && ($scope.nuevaTasaAnual >= 0)) {
                    if (!isInJson(tasasAnualesJSON, $scope.nuevaTasaAnual)) {
                        contadorTasaAnual++;
                        tasasAnualesJSON.push({
                            id: contadorTasaAnual,
                            name: $scope.nuevaTasaAnual
                        });
                        
                        $scope.tasasAnuales = tasasAnualesJSON;
                        $rootScope.tasaAnualSeleccionada = {id: contadorTasaAnual, name: $scope.nuevaTasaAnual};
                        $scope.nuevaTasaAnual = "";
                        $scope.comprobarDropDowns();
                        setTimeout(function() {
                            $("#ID_TasaAnualInteres").dropdown('set selected',  contadorTasaAnual.toString());
                        }, 200);
                    }
                }
            };
            
          
            
            //Verifica si el elemento existe, si lo esta, solo se activa y de no estarlo se agrega y luego se activa
            $rootScope.setValorDropDownTasaAnual = function(pValue) {
                var filtroDropDown = tasasAnualesJSON.filter(function(tasasAnualesJSON) {
                    return tasasAnualesJSON.name === pValue;
                });
                if ((filtroDropDown).length !== 0) {
                    $rootScope.tasaAnualSeleccionada= {id: filtroDropDown[0].id, name: pValue};
                    $scope.comprobarDropDowns();
                    setTimeout(function() {
                            $("#ID_TasaAnualInteres").dropdown('set selected',  filtroDropDown[0].id);
                    }, 200);
                }
                else{
                    contadorTasaAnual++;
                    tasasAnualesJSON.push({
                        id: contadorTasaAnual,
                        name: pValue
                    });
                    $scope.tasasAnuales = tasasAnualesJSON;
                    $rootScope.tasaAnualSeleccionada = {id: contadorTasaAnual, name: pValue};
                    $scope.nuevaTasaAnual = "";
                    $scope.comprobarDropDowns();
                    setTimeout(function() {
                            $("#ID_TasaAnualInteres").dropdown('set selected',  contadorTasaAnual.toString());
                    }, 200);
                }
            };

        }


        
    };
});
