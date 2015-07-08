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
            $scope.agregarNuevoTasaAnual = function() {
                if ($.isNumeric($scope.nuevaTasaAnual) && ($scope.nuevaTasaAnual > 0)) {
                    if (!isInJson(tasasAnualesJSON, $scope.nuevaTasaAnual)) {
                        $scope.setNuevoElemento();
                        setTimeout(function() {
                            $("#ID_TasaAnualInteres").data().moduleDropdown.action.activate(undefined, contadorTasaAnual.toString());
                        }, 200);
                    }
                }
            };
            
             //Agregar el elemento al json del dropdown y cambia el elemento seleccionado
            $scope.setNuevoElemento = function() {
                contadorTasaAnual++;
                tasasAnualesJSON.push({
                    id: contadorTasaAnual,
                    name: $scope.nuevaTasaAnual
                });
                $scope.tasasAnuales = tasasAnualesJSON;
                $rootScope.tasaAnualSeleccionada = {id: contadorTasaAnual, name: $scope.nuevaTasaAnual};
                $scope.nuevaTasaAnual = "";
                $scope.comprobarDropDowns();
            };
            
            //Verifica si el elemento existe, si lo esta, solo se activa y de no estarlo se agrega y luego se activa
            $rootScope.setValorDropDown = function(pValue) {
                var filtroDropDown = tasasAnualesJSON.filter(function(tasasAnualesJSON) {
                    return tasasAnualesJSON.name === pValue;
                });
                if ((filtroDropDown).length !== 0) {
                    $rootScope.tasaAnualSeleccionada= pValue;
                    setTimeout(function() {
                            $("#ID_TasaAnualInteres").data().moduleDropdown.action.activate(undefined, filtroDropDown[0].id);
                    }, 200);
                }
                else{
                    $scope.setNuevoElemento();
                    setTimeout(function() {
                            $("#ID_TasaAnualInteres").data().moduleDropdown.action.activate(undefined, filtroDropDown[0].id);
                    }, 200);
                }
            };

        }


        
    };
});
