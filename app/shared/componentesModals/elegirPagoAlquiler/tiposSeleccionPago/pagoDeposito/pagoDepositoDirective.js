univerApp.directive("pago.deposito", function() {
    return {
        restrict: "E",
        replace: true,
        templateUrl: "app/shared/componentesModals/elegirPagoAlquiler/tiposSeleccionPago/pagoDeposito/pagoDeposito.html",
        controller: function ($scope,$rootScope) {

            //Init condicion de paso en el modal
            $rootScope.cumplePasoModal = false;

            $scope.ComprobarFechaPago = function(pEstadoFormulario){
                $rootScope.cumplePasoModal = pEstadoFormulario;
            };



        }
    };
});
