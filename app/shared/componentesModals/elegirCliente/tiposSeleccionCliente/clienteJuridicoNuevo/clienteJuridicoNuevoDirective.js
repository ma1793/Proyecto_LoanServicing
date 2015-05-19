univerApp.directive("cliente.juridico.nuevo", function() {
    return {
        restrict: "E",
        replace: true,
        templateUrl: "app/shared/componentesModals/elegirCliente/tiposSeleccionCliente/clienteJuridicoNuevo/clienteJuridicoNuevo.html",
        controller: function($scope,$rootScope){


            //Init condicion de paso en el modal
            $rootScope.cumplePasoModal = false;

            $scope.ComprobarCumpleFormulario = function(pEstadoFormulario){
                $rootScope.cumplePasoModal = pEstadoFormulario;
            };

            $scope.ContruirClienteJuridicoJSON = function() {
                var clienteJuridicoJSON = {
                    "@type": "persona",
                    "telOficina": $scope.telOficinaClienteJuridicoCrearDesglose,
                    "nombre": $scope.nombreClienteJuridicoCrearDesglose,
                    "telCelular": $scope.telCelClienteJuridicoCrearDesglose,
                    "telCasa": $scope.telCasaClienteJuridicoCrearDesglose,
                    "telFax": $scope.telFaxClienteJuridicoCrearDesglose,
                    "personajuridica": {
                        "cedulaJuridica": $scope.cedulaClienteJuridicoCrearDesglose
                    }
                };
                console.log(JSON.stringify(clienteJuridicoJSON));
                $rootScope.clienteSeleccionado = clienteJuridicoJSON;

            };





        }
    };
});

