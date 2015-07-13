univerApp.directive("operacion.acreedor", function() {
    return {
        restrict: "E",
        replace: true,
        templateUrl: "app/shared/componentesModals/operaciones/acreedor/acreedorOperacion.html",
        controller: function ($scope,$rootScope,acreedoresRest) {
            //UI Components ***
            uiInitCheckbox();

            //Init condicion de paso en el modal
            $rootScope.cumpleModal = false;

            $scope.comprobarCumpleFormulario = function(pEstadoFormulario){
                $rootScope.cumpleModal = pEstadoFormulario;
            };

            $scope.operacionAcreedor = 1;
            $scope.cambioOpcionAcreedor = function(pOperacion) {
                
                $scope.acreedorNombre = null;
                $scope.acreedorCedula = null;
                $scope.acreedorIdPersona = null;
                $rootScope.cumpleModal =false;
                $scope.selectedAcreedorIndex = -1;
                $scope.operacionAcreedor = pOperacion;

                esperaTiempoFuncion(uiInitCheckbox, 50);
            };
            
            acreedoresRest.getAcreedores(function(data) {
                $scope.listaAcreedores = data;
            });
            
            $scope.selectedAcreedorIndex = -1;
            $scope.acreedorNombre = null;
            $scope.acreedorCedula = null;
            $scope.acreedorIdPersona = null;
            
            $scope.seleccionAcreedor = function(pAcreedor,pIndice){
                $scope.acreedorCedula = pAcreedor.cedula;
                $scope.acreedorNombre = pAcreedor.persona.nombre;
                $scope.acreedorIdPersona = pAcreedor.persona.idPersona;
                $scope.selectedAcreedorIndex = pIndice;
                $rootScope.cumpleModal = true;
               
            };
            
            $rootScope.eliminarElemento= function() {
                acreedoresRest.getVerificarEliminarAcreedor(function(data) {
                    if (data) {
                        acreedoresRest.eliminarAcreedor(function(data) {
                            acreedoresRest.getAcreedores(function(data) {
                                $scope.listaAcreedores = data;
                            });
                            alert("El Acreedor Seleccionado Ha Sido Eliminado");
                        }, $scope.acreedorIdPersona);
                    }
                    else
                        alert("No Se Puede Eliminar El Acreedor Seleccionado");
                }, $scope.acreedorIdPersona);
            };

                

            $rootScope.operacionModal = function(){
                if($scope.operacionAcreedor === 1){
                    var nuevoAcreedor = {
                        "@type": "persona",
                        "telOficina": null,
                        "nombre": $scope.acreedorNombre,
                        "telCelular": null,
                        "telCasa": null,
                        "telFax": null,
                        "acreedor": {
                            "cedula": $scope.acreedorCedula
                        }
                    };
                    acreedoresRest.postCrearAcreedor(function(data) {
                        $scope.acreedorNombre = "";
                        $scope.acreedorCedula = null;
                        $rootScope.cumpleModal = false;
                        
                        acreedoresRest.getAcreedores(function(data) {
                            $scope.listaAcreedores = data;
                        });
                    }, nuevoAcreedor);
                }
                else {
                    $rootScope.abrirDialog("Eliminar Elemento", "¿Desea Eliminar el Elemento Seleccionado?", "remove");
                }
                
            };

        }
    };
});
