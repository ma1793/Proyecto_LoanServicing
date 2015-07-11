univerApp.directive("dropdown.honorarios.gastos", function() {
    return {
        restrict: "E",
        replace: true,
        templateUrl: "app/shared/ui/dropdown/honorariosGastos/honorariosGastosDropdown.html",
        controller: function ($scope,$rootScope) {
            //Init***
            $rootScope.honorarioGastoSeleccionado = null;

            uiInitDropdown();

            //Variables Dropdown
            var contadorHonorarioGasto = 3;

            //Valores Default Dropdown
            var honorariosGastosJSON = [{
                id: 1,
                name: 1
            }, {
                id: 2,
                name: 2
            }, {
                id: 3,
                name: 3
            }];
        
            //Dropdown HonorarioGastos
            $scope.honorariosGastos = honorariosGastosJSON;
            $scope.selectedDDHonorarioGasto= -1;

            $scope.selectHonorarioGasto = function(pHonorarioGasto,pIndice) {
                $rootScope.honorarioGastoSeleccionado = pHonorarioGasto;
                $scope.selectedDDHonorarioGasto = pIndice;
                $scope.comprobarDropDowns();
            };
            
            $scope.agregarNuevoHonorarioGasto = function() {
                if ($.isNumeric($scope.nuevoHonorarioGasto) && ($scope.nuevoHonorarioGasto > 0)) {
                    if (!isInJson(honorariosGastosJSON, $scope.nuevoHonorarioGasto)) {
                        contadorHonorarioGasto++;
                        honorariosGastosJSON.push({
                            id: contadorHonorarioGasto,
                            name: $scope.nuevoHonorarioGasto 
                        });
                        $scope.honorariosGastos = honorariosGastosJSON;
                        $rootScope.honorarioGastoSeleccionado = {id: contadorHonorarioGasto, name: $scope.nuevoHonorarioGasto };
                        $scope.nuevoHonorarioGasto = "";
                        $scope.comprobarDropDowns();
                        setTimeout(function() {
                            $("#ID_DropdownHonorariosGastos").dropdown('set selected', contadorHonorarioGasto.toString());
                        }, 200);
                    }
                }
            };
           
            //Verifica si el elemento existe, si lo esta, solo se activa y de no estarlo se agrega y luego se activa
            $rootScope.setValorDropDownHonorariosGastos = function(pValue) {
                var filtroDropDown = honorariosGastosJSON.filter(function(honorariosGastosJSON) {
                    return honorariosGastosJSON.name === pValue;
                });
                if ((filtroDropDown).length !== 0) {
                    $rootScope.honorarioGastoSeleccionado = {id: filtroDropDown[0].id, name: pValue};
                    $scope.comprobarDropDowns();
                    setTimeout(function() {
                            $("#ID_DropdownHonorariosGastos").dropdown('set selected', filtroDropDown[0].id);
                    }, 200);
                }
                else {
                    contadorHonorarioGasto++;
                    honorariosGastosJSON.push({
                        id: contadorHonorarioGasto,
                        name: pValue
                    });
                    $scope.honorariosGastos = honorariosGastosJSON;
                    $rootScope.honorarioGastoSeleccionado = {id: contadorHonorarioGasto, name: pValue};
                    $scope.nuevoHonorariosGastos = "";
                    $scope.comprobarDropDowns();
                    setTimeout(function() {
                        $("#ID_DropdownHonorariosGastos").dropdown('set selected', contadorHonorarioGasto.toString());
                    }, 200);
                }
            };
            
            

        }


        
    };
});
