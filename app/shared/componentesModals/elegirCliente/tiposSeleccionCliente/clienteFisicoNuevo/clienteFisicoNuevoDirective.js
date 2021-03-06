univerApp.directive("cliente.fisico.nuevo", function() {
    return {
        restrict: "E",
        replace: true,
        templateUrl: "app/shared/componentesModals/elegirCliente/tiposSeleccionCliente/clienteFisicoNuevo/clienteFisicoNuevo.html",
        controller: function($scope,$rootScope,clientesRest){


            //Init condicion de paso en el modal
            $rootScope.cumplePasoModal = false;

            $scope.ComprobarCumpleFormulario = function(pEstadoFormulario){
                $rootScope.cumplePasoModal = pEstadoFormulario;
            };

            $rootScope.ContruirClienteFisicoJSON = function() {
                var clienteFisicoJSON = {
                    "@type": "persona",
                    "telOficina": $scope.telOficinaClienteFisicoCrearDesglose,
                    "nombre": $scope.nombreClienteFisicoCrearDesglose,
                    "telCelular":$scope.telCelClienteFisicoCrearDesglose,
                    "telFax": $scope.telFaxClienteFisicoCrearDesglose,
                    "telCasa": $scope.telCasaClienteFisicoCrearDesglose,
                    "personafisica": {
                        "primerApellido": $scope.primerApellidoClienteFisicoCrearDesglose,
                        "segundoApellido": $scope.segundoApellidoClienteFisicoCrearDesglose,
                        "cedula": $scope.cedulaClienteFisicoCrearDesglose}
                };

                console.log(JSON.stringify(clienteFisicoJSON));
                clientesRest.postCrearClienteFisico(function(data) {
                    $rootScope.clienteSeleccionado = data;
                    $rootScope.nombreCompletoClienteSeleccionado = data.nombre + " "+ data.personafisica.primerApellido +" "+ data.personafisica.segundoApellido;
                    console.log($rootScope.clienteSeleccionado);
                    setTimeout(function(){ $scope.$apply();});
                }, clienteFisicoJSON);

            };



        }
    };
});
