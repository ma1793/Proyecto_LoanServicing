univerApp.directive("pago.faltante", function() {
    return {
        restrict: "E",
        replace: true,
        templateUrl: "app/shared/componentesModals/elegirPago/tiposSeleccionPago/pagoFaltante/pagoFaltante.html",
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
                if($scope.montoPagoFaltante > 0)
                    $rootScope.cumplePasoModal = $scope.cumpleInputs && $scope.cumpleDropdowns;
            };
            
            $scope.InitPagoFaltante = function() {  

                $scope.montoPagoFaltante = $rootScope.caratulaSeleccionada.faltanteActual;

            };

            $rootScope.construirPagoFaltanteJSON = function() {
          
          
                var pagoFaltante = {
                    "id": {
                        "idCaratulaPrestamo": $rootScope.caratulaSeleccionada.idCaratulaPrestamo
                    },
                    "pago": {
                        "fechaPago": $scope.fechaPago.toJSON(),
                        "montoPago": $scope.montoPagoFaltante,
                        "faltante": 0.00,
                        "sobrante": 0.00,
                        "banco": $rootScope.bancoSeleccionado.name,
                        "detalle": listaMeses[$scope.fechaPago.getMonth()]
                    }
                };
                 pagosRest.postPagoFaltante(function(data) {
                     $rootScope.informeSeleccionado = data;
                 },pagoFaltante);

                
            };
            
            /*Init*/
            $scope.InitPagoFaltante();
        }
    };
});
