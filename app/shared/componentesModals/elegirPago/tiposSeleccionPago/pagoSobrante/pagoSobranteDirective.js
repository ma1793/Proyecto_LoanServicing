univerApp.directive("pago.sobrante", function() {
    return {
        restrict: "E",
        replace: true,
        templateUrl: "app/shared/componentesModals/elegirPago/tiposSeleccionPago/pagoSobrante/pagoSobrante.html",
        controller: function ($scope,$rootScope,pagosRest) {

            //Init condicion de paso en el modal
            $scope.cumpleDropdowns =  false;
            $scope.cumpleInputs =  false;
            $rootScope.cumplePasoModal = false;

            // Verificacion Formulario
            $scope.comprobarInput = function(pEstadoFormulario) {
                $scope.cumpleInputs = pEstadoFormulario;
                $scope.comprobarCumpleFormulario();
            };
            
            $scope.comprobarDropDowns = function(){
                if($rootScope.bancoSeleccionado != null){
                    $scope.cumpleDropdowns = true;
                }
                $scope.comprobarCumpleFormulario();
            };
            
            $scope.comprobarCumpleFormulario = function(){
                $rootScope.cumplePasoModal = $scope.cumpleInputs && $scope.cumpleDropdowns;
            };
            
            //Construir JSON
            $rootScope.construirPagoSobranteJSON = function() {
                var pagoSobrante = {
                    "id": {
                        "idCaratulaPrestamo": $rootScope.caratulaSeleccionada.idCaratulaPrestamo
                    },
                    "pago": {
                        "fechaPago": $scope.fechaPago.toJSON(),
                        "montoPago": $scope.montoPagoSobrante,
                        "faltante": 0.00,
                        "sobrante": 0.00,
                        "banco": $rootScope.bancoSeleccionado.name,
                        "detalle": listaMeses[$scope.fechaPago.getMonth()]
                    }
                };
                 pagosRest.postPagoSobrante(function(data) {
                     $rootScope.informeSeleccionado = data;
                 },pagoSobrante);

            };




        }
    };
});
