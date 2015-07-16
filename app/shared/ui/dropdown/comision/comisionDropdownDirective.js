univerApp.directive("dropdown.comision", function() {
    return {
        restrict: "E",
        replace: true,
        templateUrl: "app/shared/ui/dropdown/comision/comisionDropdown.html",
        controller: function($scope, $rootScope) {

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

            $scope.selectComision = function(pComision, pIndice) {
                $rootScope.comisionSeleccionada = pComision;
                $scope.selectedDDComision = pIndice;
                $scope.comprobarDropDowns();

            };
          
            $scope.agregarNuevaComision = function() {
                if ($.isNumeric($scope.nuevaComision) && ($scope.nuevaComision >= 0)) {
                    if (!isInJson(comisionesJSON, $scope.nuevaComision)) {
                        contadorComision++;
                        comisionesJSON.push({
                            id: contadorComision,
                            name: $scope.nuevaComision
                        });
                        console.log(comisionesJSON);
                        $scope.comisiones = comisionesJSON;
                        $rootScope.comisionSeleccionada = {id: contadorComision, name: $scope.nuevaComision};
                        $scope.nuevaComision = "";
                        $scope.comprobarDropDowns();
                        setTimeout(function() {
                            $("#ID_DropdownComision").dropdown('set selected', contadorComision.toString());
                        }, 200);
                    }
                }
            };


            //Verifica si el elemento existe, si lo esta, solo se activa y de no estarlo se agrega y luego se activa
            $rootScope.setValorDropDownComision = function(pValue) {
                var filtroDropDown = comisionesJSON.filter(function(comisionesJSON) {
                    return comisionesJSON.name === pValue;
                });
                if ((filtroDropDown).length !== 0) {
                    $rootScope.comisionSeleccionada = {id: filtroDropDown[0].id, name: pValue};
                    $scope.comprobarDropDowns();
                    setTimeout(function() {
                        $("#ID_DropdownComision").dropdown('set selected', filtroDropDown[0].id);
                    }, 200);
                }
                else {
                    contadorComision++;
                    comisionesJSON.push({
                        id: contadorComision,
                        name: pValue
                    });
                    console.log(comisionesJSON);
                    $scope.comisiones = comisionesJSON;
                    $rootScope.comisionSeleccionada = {id: contadorComision, name: pValue};
                    $scope.nuevaComision = "";
                    $scope.comprobarDropDowns();
                    setTimeout(function() {
                        $("#ID_DropdownComision").dropdown('set selected', contadorComision.toString());
                    }, 200);
                }
            };



        }
    };
});
