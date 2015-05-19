univerApp.directive("pago.mensualidad", function() {
    return {
        restrict: "E",
        replace: true,
        templateUrl: "app/shared/componentesModals/elegirPagoAlquiler/tiposSeleccionPago/pagoMensualidad/pagoMensualidad.html",
        controller: function ($scope,$rootScope) {

            //Init condicion de paso en el modal
            $rootScope.cumplePasoModal = false;

            $scope.ComprobarFechaPago = function(pEstadoFormulario){
                $rootScope.cumplePasoModal = pEstadoFormulario;
            };



        }
    };
});
