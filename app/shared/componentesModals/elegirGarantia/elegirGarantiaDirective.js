univerApp.directive("elegir.garantia", function() {
    return {
        restrict: "E",
        replace: true,
        templateUrl: "app/shared/componentesModals/elegirGarantia/elegirGarantia.html",
        controller: function($scope, $rootScope) {
            //UI Components ***
            uiInitCheckbox();


            $scope.tipoGarantia = 1;
            $scope.cambioOpcionAgregarGarantia = function(pTipoGarantia) {
                $scope.tipoGarantia = pTipoGarantia;
                esperaTiempoFuncion(uiInitCheckbox,50);
            };
            


        }
    };
});