univerApp.directive("pago.completo", function() {
    return {
        restrict: "E",
        replace: true,
        templateUrl: "app/shared/componentesModals/elegirPago/tiposSeleccionPago/pagoCompleto/pagoCompleto.html",
        controller: function ($scope,$rootScope) {

            //Init condicion de paso en el modal
            $rootScope.cumplePasoModal = false;

            $scope.ComprobarFechaPago = function(pEstadoFormulario){
                $rootScope.cumplePasoModal = pEstadoFormulario;
            };



        }
    };
});
