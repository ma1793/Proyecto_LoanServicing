univerApp.directive("garantia.nueva", function() {
    return {
        restrict: "E",
        replace: true,
        templateUrl: "app/shared/componentesModals/elegirGarantia/tipoSeleccionGarantia/garantiaNueva/garantiaNueva.html",
        controller: function($scope, $rootScope) {
            /*Init UI*/
             uiInitDropdown();
            
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
                if($scope.provinciaSeleccionada != null ){
                    $scope.cumpleDropdowns = true;
                }
                $scope.comprobarCumpleFormulario();
            };

            $scope.comprobarCumpleFormulario = function(){
                $rootScope.cumplePasoModal = $scope.cumpleInputs && $scope.cumpleDropdowns;
                 console.log($rootScope.cumplePasoModal);
            };

            
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
                $scope.comprobarDropDowns();
            };

            $rootScope.agregarGarantiaJSON = function() {
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
                console.log($rootScope.listaGarantiasCaratula);
                setTimeout(function(){ $scope.$apply();});
            };


         


        }
    };
});

