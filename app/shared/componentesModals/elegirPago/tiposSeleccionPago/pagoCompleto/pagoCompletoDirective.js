univerApp.directive("pago.completo", function() {
    return {
        restrict: "E",
        replace: true,
        templateUrl: "app/shared/componentesModals/elegirPago/tiposSeleccionPago/pagoCompleto/pagoCompleto.html",
        controller: function($scope, $rootScope,pagosRest) {

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
                if($rootScope.bancoSeleccionado != null && $rootScope.mesSeleccionado != null){
                    $scope.cumpleDropdowns = true;
                }
                $scope.comprobarCumpleFormulario();
            };
            
            $scope.comprobarCumpleFormulario = function(){
                $rootScope.cumplePasoModal = $scope.cumpleInputs && $scope.cumpleDropdowns;
            };


                
            //Funciones Pago Completo    
            $scope.montoPagoCompleto = function() {
                if ($rootScope.mesSeleccionado != null) {
                    var retorno = $scope.pagoMensualValor * $rootScope.mesSeleccionado.name - ($scope.sobrante - $scope.faltante);
                    $scope.montoPagoCompletoValor = retorno;
                    return retorno;
                }
                else 
                    return 0;
            };

            $scope.pagoMensual = function() {
                return ($rootScope.desgloseSeleccionado.monto * $rootScope.desgloseSeleccionado.tasaAnual) / (100 * 12);
            };
            
            
            
            $scope.InitPagoCompleto = function() {
                
               
               // $scope.fechaPago = new Date(getFechaActual());
                $scope.faltante = $rootScope.caratulaSeleccionada.faltanteActual;
                $scope.sobrante = $rootScope.caratulaSeleccionada.sobranteActual;
                $scope.pagoMensualValor = $scope.pagoMensual();

            };

             
            $rootScope.construirPagoCompletoJSON = function() {
                console.log("fecha");

                var pagoCompleto = {
                    "id": {
                        "idCaratulaPrestamo": $rootScope.caratulaSeleccionada.idCaratulaPrestamo
                    },
                    "pago": {
                        "fechaPago": $scope.fechaPago.toJSON(),
                        "montoPago": $scope.montoPagoCompletoValor,
                        "faltante": $scope.faltante,
                        "sobrante": $scope.sobrante,
                        "banco": $rootScope.bancoSeleccionado.name,
                        "detalle": listaMeses[$scope.fechaPago.getMonth()]
                    }
                };
                 pagosRest.postPagoCompleto(function(data) {
                     $rootScope.informeSeleccionado = data;
                 },pagoCompleto);

                
                
            };
            
            /*init*/
            $scope.InitPagoCompleto();




        }
    };
});
