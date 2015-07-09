univerApp.directive("dropdown.meses", function() {
    return {
        restrict: "E",
        replace: true,
        templateUrl: "app/shared/ui/dropdown/meses/mesesDropdown.html",
        controller: function ($scope,$rootScope) {
            /*Init UI*/
            uiInitDropdown();
            
            //Init***
            $rootScope.mesSeleccionado = null;


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
                        contadorMes++;
                        mesesJSON.push({
                            id: contadorMes,
                            name: $scope.nuevoMes
                        });
                        console.log(mesesJSON);
                        console.log( $scope.nuevoMes);
                        $scope.meses = mesesJSON;
                        $rootScope.mesSeleccionado = {id: contadorMes, name: $scope.nuevoMes};
                        $scope.nuevoMes = "";
                        $scope.comprobarDropDowns();
                        setTimeout(function() {
                            $("#ID_DropdownMes").dropdown('set selected', contadorMes.toString());
                        }, 200);
                    }
                }
            };
          
            
            //Verifica si el elemento existe, si lo esta, solo se activa y de no estarlo se agrega y luego se activa
            $rootScope.setValorDropDownMeses = function(pValue) {
                var filtroDropDown = mesesJSON.filter(function(mesesJSON) {
                    return mesesJSON.name === pValue;
                });
                if ((filtroDropDown).length !== 0) {
                    $rootScope.mesSeleccionado = {id: filtroDropDown[0].id, name: pValue};
                    $scope.comprobarDropDowns();
                    setTimeout(function() {
                            $("#ID_DropdownMes").dropdown('set selected', filtroDropDown[0].id);
                    }, 200);
                }
                else{
                    contadorMes++;
                    mesesJSON.push({
                        id: contadorMes,
                        name: pValue
                    });
                    $scope.meses = mesesJSON;
                    $rootScope.mesSeleccionado = {id: contadorMes, name: pValue};
                    $scope.nuevoMes = "";
                    $scope.comprobarDropDowns();
                    setTimeout(function() {
                            $("#ID_DropdownMes").dropdown('set selected',contadorMes.toString());
                    }, 200);
                }
            };
            

        }


        
    };
});
