univerApp.directive("garantia.nueva", function() {
    return {
        restrict: "E",
        replace: true,
        templateUrl: "app/shared/componentesModals/elegirGarantia/tipoSeleccionGarantia/garantiaNueva/garantiaNueva.html",
        controller: function($scope, $rootScope) {

            $scope.provincias = [{
                    id: 1,
                    name: 'San José'
                }, {
                    id: 2,
                    name: 'Alajuela'
                }, {
                    id: 3,
                    name: 'Cartago'
                },
                {
                    id: 4,
                    name: 'Heredia'
                },
                {
                    id: 5,
                    name: 'Puntarenas'
                }, {
                    id: 6,
                    name: 'Guanacaste'
                },
                {
                    id: 7,
                    name: 'Límon'
                }
            ];

            $scope.seleccionProvincia = function(pProvincia) {
                $scope.provinciaSeleccionada = pProvincia;

            };

            $scope.agregarGarantiaJSON = function() {
                $rootScope.listaGarantiasCaratula.push({
                    "provincia": {"idProvincia": $scope.provinciaSeleccionada.id,
                        "descripcion": $scope.provinciaSeleccionada.name
                    },
                    "canton": $scope.cantonGarantia,
                    "distrito": $scope.distritoGarantia,
                    "finca": $scope.fincaGarantia,
                    "medidas": $scope.medidaGarantia,
                    "numeroplano": $scope.numeroPlanoGarantia
                }
                );
            };


            $scope.descripcionProvincia = function(pIndice) {
                var resultado;
                switch (pIndice) {
                    case 1:
                        resultado = "San José";
                        break;
                    case 2:
                        resultado = "Alajuela";
                        break;
                    case 3:
                        resultado = "Cartago";
                        break;
                    case 4:
                        resultado = "Heredia";
                        break;
                    case 5:
                        resultado = "Puntarenas";
                        break;
                    case 6:
                        resultado = "Guanacaste";
                        break;
                    case 7:
                        resultado = "Límon";
                        break;
                }
                return resultado;
            };


        }
    };
});

