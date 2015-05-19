univerApp.directive("pago.sobrante", function() {
    return {
        restrict: "E",
        replace: true,
        templateUrl: "app/shared/componentesModals/elegirPago/tiposSeleccionPago/pagoSobrante/pagoSobrante.html",
        controller: function ($scope,$rootScope) {

            //Init condicion de paso en el modal
            $rootScope.cumplePasoModal = false;

            $scope.ComprobarFechaPago = function(pEstadoFormulario){
                $rootScope.cumplePasoModal = pEstadoFormulario;
                console.log($rootScope.cumplePasoModal);

            };

            $scope.ComprobarMontoPago = function(pEstadoFormulario){
                $rootScope.cumplePasoModal = pEstadoFormulario;
                console.log($rootScope.cumplePasoModal);
            };

        }
    };
});
