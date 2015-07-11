univerApp.directive("cliente.juridico.nuevo", function() {
    return {
        restrict: "E",
        replace: true,
        templateUrl: "app/shared/componentesModals/elegirCliente/tiposSeleccionCliente/clienteJuridicoNuevo/clienteJuridicoNuevo.html",
        controller: function($scope,$rootScope,clientesRest){


            //Init condicion de paso en el modal
            $rootScope.cumplePasoModal = false;

            $scope.ComprobarCumpleFormulario = function(pEstadoFormulario){
                $rootScope.cumplePasoModal = pEstadoFormulario;
            };

            $rootScope.ContruirClienteJuridicoJSON = function() {
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
                
                clientesRest.postCrearClienteJuridico(function(data) {
                    $rootScope.clienteSeleccionado = data;
                    $rootScope.nombreCompletoClienteSeleccionado = data.nombre;
                    setTimeout(function(){ $scope.$apply();});


                }, clienteJuridicoJSON);
            
                
                

            };





        }
    };
});

