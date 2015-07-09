univerApp.directive("garantia.existente", function() {
    return {
        restrict: "E",
        replace: true,
        templateUrl: "app/shared/componentesModals/elegirGarantia/tipoSeleccionGarantia/garantiaExistente/garantiaExistente.html",
        controller: function($scope, $rootScope,caratulasRest) {
                $rootScope.cumplePasoModal = false;
                
                /*get*/
                caratulasRest.getGarantias(function(data) {
                      $scope.listaGarantiasCliente = data;
                },$rootScope.clienteSeleccionado.idPersona);
        
                   
            $rootScope.agregarGarantiaJSON = function() {
                $rootScope.listaGarantiasCaratula.push({
                    "idGarantia": $scope.garantiaSeleccionada.idGarantia,
                    "provincia": {"idProvincia": $scope.garantiaSeleccionada.provincia.idProvincia,
                        "descripcion": $scope.garantiaSeleccionada.provincia.descripcion
                    },
                    "canton": $scope.garantiaSeleccionada.canton,
                    "distrito": $scope.garantiaSeleccionada.distrito,
                    "finca": $scope.garantiaSeleccionada.finca,
                    "medidas": $scope.garantiaSeleccionada.medidas,
                    "numeroplano": $scope.garantiaSeleccionada.numeroplano
                });
            };
            
            $scope.selectedGarantiaIndex = -1;
            $scope.selectValueGarantia = function(pGarantia, pIndice) {
                
                $scope.garantiaSeleccionada = pGarantia;
                $scope.selectedGarantiaIndex = pIndice;
                $rootScope.cumplePasoModal = true;
            };
            
            
        }
    };
});
