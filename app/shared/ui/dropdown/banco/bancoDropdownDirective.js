univerApp.directive("dropdown.banco", function() {
    return {
        restrict: "E",
        replace: true,
        templateUrl: "app/shared/ui/dropdown/banco/bancoDropdown.html",

        controller: function ($scope,$rootScope) {

            $rootScope.bancoSeleccionado = null;

            uiInitDropdown();

            //Variables Dropdown
            var contadorBanco = 3;

            //Valores Default Dropdown
            var bancosJSON = [{
                id: 1,
                name: "BCR"
            }, {
                id: 2,
                name: "BNCR"
            }, {
                id: 3,
                name: "BAC"
            }];
            //Dropdown Bancos
            $scope.bancos = bancosJSON;
            $scope.selectedDDBanco= -1;

            $scope.select_Banco = function(pBanco,pIndice) {
                $rootScope.bancoSeleccionado = pBanco;
                $scope.selectedItemBanco = pBanco.name;
                $scope.selectedDDBanco = pIndice;
                $scope.ComprobarDropDowns();

            };
            $scope.AgregarNuevoBanco = function() {
                if($scope.nuevoBanco != "" && $scope.nuevoBanco != null ) {
                    contadorBanco = contadorBanco + 1;
                    bancosJSON.push({
                        id: contadorBanco,
                        name: $scope.nuevoBanco
                    });
                    $scope.bancos = bancosJSON;
                    $rootScope.bancoSeleccionado = $scope.nuevoBanco;
                    $scope.nuevoBanco = "";
                    $scope.ComprobarDropDowns();
                    setTimeout(function () {
                        $("#ID_DropdownBanco").data().moduleDropdown.action.activate(undefined, contadorBanco.toString());
                    }, 100);
                }
            };

        }
    };
});
