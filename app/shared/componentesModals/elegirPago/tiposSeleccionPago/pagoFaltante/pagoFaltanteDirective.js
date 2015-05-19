univerApp.directive("pago.faltante", function() {
    return {
        restrict: "E",
        replace: true,
        templateUrl: "app/shared/componentesModals/elegirPago/tiposSeleccionPago/pagoFaltante/pagoFaltante.html",
        controller: function ($scope,$rootScope) {

            //Init condicion de paso en el modal
            $rootScope.cumplePasoModal = false;

            $scope.ComprobarFechaPago = function(pEstadoFormulario){
                $rootScope.cumplePasoModal = pEstadoFormulario;
                console.log($rootScope.cumplePasoModal);

            };

        }
    };
});
