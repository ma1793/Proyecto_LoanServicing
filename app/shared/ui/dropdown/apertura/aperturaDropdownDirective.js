univerApp.directive("dropdown.apertura", function() {
    return {
        restrict: "E",
        replace: true,
        templateUrl: "app/shared/ui/dropdown/apertura/aperturaDropdown.html",
        controller: function ($scope,$rootScope) {
            //Init***
            $rootScope.aperturaSeleccionada = null;

            uiInitDropdown();

            //Variables Dropdown
            var contadorApertura = 3;

            //Valores Default Dropdown
            var aperturasJSON = [{
                id: 1,
                name: 1
            }, {
                id: 2,
                name: 2
            }, {
                id: 3,
                name: 3
            }];
            //Dropdown Aperturas
            $scope.aperturas = aperturasJSON;
            $scope.selectedDDApertura= -1;

            $scope.selectApertura = function(pApertura,pIndice) {
                $rootScope.aperturaSeleccionada = pApertura;
                $scope.selectedDDApertura = pIndice;
                $scope.comprobarDropDowns();

            };
            $scope.agregarNuevaApertura = function() {
                if ($.isNumeric($scope.nuevaApertura) && ($scope.nuevaApertura >= 0)) {
                    if (!isInJson(aperturasJSON, $scope.nuevaApertura)) {
                        contadorApertura++;
                        aperturasJSON.push({
                            id: contadorApertura,
                            name: $scope.nuevaApertura
                        });
                        $scope.aperturas = aperturasJSON;
                        $rootScope.aperturaSeleccionada = {id: contadorApertura, name: $scope.nuevaApertura};
                        $scope.nuevaApertura = "";
                        $scope.comprobarDropDowns();
                        setTimeout(function() {
                            $("#ID_DropdownApertura").dropdown('set selected',contadorApertura.toString());
                        }, 200);
                    }
                }
            };

            //Verifica si el elemento existe, si lo esta, solo se activa y de no estarlo se agrega y luego se activa
            $rootScope.setValorDropDownApertura = function(pValue) {
                var filtroDropDown = aperturasJSON.filter(function(aperturasJSON) {
                    return aperturasJSON.name === pValue;
                });
                if ((filtroDropDown).length !== 0) {
                    $rootScope.aperturaSeleccionada = {id: filtroDropDown[0].id, name: pValue};
                    $scope.comprobarDropDowns();
                    setTimeout(function() {
                            $("#ID_DropdownApertura").dropdown('set selected',filtroDropDown[0].id);
                    }, 200);
                }
                else{
                    contadorApertura++;
                    aperturasJSON.push({
                        id: contadorApertura,
                        name: pValue
                    });
                    $scope.aperturas = aperturasJSON;
                    $rootScope.aperturaSeleccionada = {id: contadorApertura, name:pValue};
                    $scope.nuevaApertura = "";
                    $scope.comprobarDropDowns();
                    setTimeout(function() {
                            $("#ID_DropdownApertura").dropdown('set selected', contadorApertura.toString());
                    }, 200);
                }
            };
        
        
        }
    };
});
