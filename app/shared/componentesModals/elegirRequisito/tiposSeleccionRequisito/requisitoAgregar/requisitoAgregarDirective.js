univerApp.directive("elegir.requisitos.agregar", function() {
    return {
        restrict: "E",
        replace: true,
        templateUrl: "app/shared/componentesModals/elegirRequisito//tiposSeleccionRequisito/requisitoAgregar/requisitoAgregar.html",
        controller: function($scope, $rootScope,$filter,fileUpload,requisitosRest) {

            /*Init UI*/
            uiInitDropdown();

            /*Init Variables*/
            $rootScope.contadorIndicesProgresosUpload = 0;
            $rootScope.listaIndicesProgresosUpload = [];
            $rootScope.listaRequisitosAgregados = [];
            $rootScope.listaXHRUpload = [];
            $scope.indiceRequisitoSobreescribir = 0;
            $scope.requisitoSeleccionadoAgregar = null;
            $scope.selectedDDRequisito  = -1;


            /*Get*/
            requisitosRest.getRequisitos(function(data) {
                $rootScope.listaRequisitosPrestamo = data;
                requisitosRest.getRequisitosTipoCliente(function(data) {
                    $rootScope.listaRequisitosTipoCliente = data;
                    $scope.initAgregarRequisitos();
                }, $rootScope.tipoClienteSeleccionado);
                
            }, $rootScope.desgloseSeleccionado.idDesgloceGasto);
            
            
            
            
            $scope.initAgregarRequisitos = function(){
                $rootScope.ordenarAlfabeticamenteRequisitos(); 
                $rootScope.agregarIconoExisteRequisito();  
            };
            
            
            
            
            
            
            

            $scope.indiceRequisitoUpload = function(pIndiceTabla) {
                return $rootScope.listaIndicesProgresosUpload[pIndiceTabla] + "";
            };

            
            
            $scope.selectRequisito = function(pRequisito, pIndice) {
                $scope.requisitoSeleccionadoAgregar = pRequisito;
                $scope.selectedDDRequisito = pIndice;
            };

            $scope.agregarNuevoRequisito = function(pNombreRequisito, pIdRequisito, pIdCliente, pIdDesglose, pArchivoJSON) {
                var nuevoRequisito =
                        {
                            "nombreRequisito": pNombreRequisito,
                            "idRequisito": pIdRequisito,
                            "nombreArchivo": pArchivoJSON.name,
                            "peso": pArchivoJSON.size,
                            "serverLocation": rootFileDirectory + pIdCliente + "\\\\" + pIdDesglose + "\\\\" + pNombreRequisito + "\\\\" + pArchivoJSON.name
                        };
                $scope.$apply(function() {
                    $rootScope.listaIndicesProgresosUpload.splice(0, 0, $rootScope.contadorIndicesProgresosUpload);
                    $rootScope.contadorIndicesProgresosUpload += 1;
                    $rootScope.listaRequisitosAgregados.splice(0, 0, nuevoRequisito);
                });
            };

            $scope.construirRequisitoEliminar = function(pIndice) {
                var requisito = {
                    "id": {
                        "idDesgloceGasto":$rootScope.desgloseSeleccionado.idDesgloceGasto,
                        "idRequisito": $rootScope.listaRequisitosAgregados[pIndice].idRequisito
                    },
                    "requisito": {
                        "idRequisito": $rootScope.listaRequisitosAgregados[pIndice].idRequisito,
                        "descripcion": $rootScope.listaRequisitosAgregados[pIndice].nombreRequisito
                    },
                    "serverLocation": $rootScope.listaRequisitosAgregados[pIndice].serverLocation
                };
                return requisito;
            };

            $rootScope.eliminarRequisitoAgregado = function(pIndice) {
                if ($rootScope.listaXHRUpload[pIndice].status != 200) {
                    $rootScope.listaXHRUpload[pIndice].abort();
                } else {
                    requisitosRest.deleteRequisitoSeleccionado(function(data) {
                        $rootScope.listaRequisitosPrestamo = data;
                        $rootScope.ordenarAlfabeticamenteRequisitos();
                        $rootScope.agregarIconoExisteRequisito();
                    }, $scope.construirRequisitoEliminar(pIndice));       

                }
                $rootScope.listaRequisitosAgregados.splice(pIndice, 1);
                $rootScope.listaIndicesProgresosUpload.splice(pIndice, 1);
                $rootScope.listaXHRUpload.splice(pIndice, 1);
            };
            
            $rootScope.ordenarAlfabeticamenteRequisitos = function() {
                $scope.listaRequisitosPrestamo = $filter('orderBy')($scope.listaRequisitosPrestamo, 'requisito.descripcion');
            };


            $rootScope.agregarIconoExisteRequisito = function() {
                var contadorRequisitosExistentes;
                var contadorRequisitosTipo;
                var requisitoAgregado;
                for (contadorRequisitosTipo = 0; contadorRequisitosTipo < $rootScope.listaRequisitosTipoCliente.length; contadorRequisitosTipo++) {
                    requisitoAgregado = 0;
                    for (contadorRequisitosExistentes = 0; contadorRequisitosExistentes < $rootScope.listaRequisitosPrestamo.length; contadorRequisitosExistentes++) {
                        if ($rootScope.listaRequisitosTipoCliente[contadorRequisitosTipo].descripcion == $rootScope.listaRequisitosPrestamo[contadorRequisitosExistentes].requisito.descripcion) {
                            requisitoAgregado = 1;
                            break;
                        }
                    }
                    if (requisitoAgregado == 0) {
                        $rootScope.listaRequisitosTipoCliente[contadorRequisitosTipo].estado = "white";
                    }
                    else {
                        $rootScope.listaRequisitosTipoCliente[contadorRequisitosTipo].estado = "green";
                    }
                }
                var listaTemporal = $rootScope.listaRequisitosTipoCliente;
                $scope.selectedDDRequisito  = -1;
                $("#ID_DropdownRequisitosTipoCliente").dropdown('clear');
                setTimeout(function() {
                    $scope.$apply(function() {
                       $rootScope.listaRequisitosTipoCliente = listaTemporal;
                    });
                }, 100);
            };

            $scope.encontrarIndiceDescripcionRequisito = function() {
                var retorno = false;
                var contadorIndice;
                for (contadorIndice = 0; contadorIndice < $rootScope.listaRequisitosAgregados.length; contadorIndice++) {
                    if ($rootScope.listaRequisitosAgregados[contadorIndice].nombreRequisito == $scope.requisitoSeleccionadoAgregar.descripcion) {
                        $scope.indiceRequisitoSobreescribir = contadorIndice;
                        retorno = true;
                        break
                    }
                }
                return retorno;
            };

            $scope.sobreescribirRequisito = function() {
                $rootScope.eliminarRequisitoAgregado($scope.indiceRequisitoSobreescribir);
                setTimeout(function() {
                    $scope.uploadFile();
                }, 50);
            };


            $scope.uploadFile = function() {
                var file = $scope.myFile;
                var uploadUrl = rootURL + "/files/uploaded/" + $rootScope.clienteSeleccionado.idPersona + "/" + $rootScope.desgloseSeleccionado.idDesgloceGasto + "/" + $scope.requisitoSeleccionadoAgregar.descripcion + "/" + $rootScope.tipoClienteSeleccionado;
                $scope.agregarNuevoRequisito($scope.requisitoSeleccionadoAgregar.descripcion, $scope.requisitoSeleccionadoAgregar.idRequisito, $rootScope.IdClienteSeleccionadoDesglose, $rootScope.IdDesgloseSeleccionado, file);
                fileUpload.uploadFileToUrl(file, uploadUrl, $rootScope.listaIndicesProgresosUpload[0]);
                $('#ID_SelectorArchivosRequisitos').val('');
                $scope.requisitoSeleccionadoAgregar = null;
            };



            $scope.seleccionarArchivo = function() {
                    $('#ID_SelectorArchivosRequisitos').click();
            };

            $rootScope.obtenerPorcentajeUpload = function(pPorcentaje, pIndice) {
                $('#ID_PR' + pIndice).progress({
                    percent: pPorcentaje
                });
            };

            $rootScope.ocultarBarraProgreso = function(pIndice) {
                $('#ID_PR' + pIndice).transition('fade');
                $('#ID_H' + pIndice).css({"text-decoration": "underline"});
            };

            $scope.hoverEnterBotonEliminar = function(pIndice) {
                $('#ID_IC' + pIndice).css({"background-color": "rgba(255, 102, 102, 0.85)", "color": "white"});

            };

            $scope.hoverLeaveBotonEliminar = function(pIndice) {
                $('#ID_IC' + pIndice).css({"background-color": "white", "color": "rgba(0, 0, 0, 0.4)"});
            };

            $scope.obtenerPesoArchivo = function(pValor) {
                return filesize(pValor);
            };

            $('#ID_SelectorArchivosRequisitos').change(function() {
                if (!$scope.encontrarIndiceDescripcionRequisito()) {
                    setTimeout(function() {
                        $scope.uploadFile();
                    }, 100);
                }
                else {
                    $rootScope.abrirDialog("Sustituir Elemento","¿Esta Seguro de Sustituir el Requisito?");
  
              }
            });
            
            /*Acciones de dialog*/
            $rootScope.selectorAccionDialog = function(pAccion){
                switch(pAccion){
                    case 1:
                        $scope.sobreescribirRequisito();
                        break;
                }
                
            };

            
            
            
    
            


        }
    };
});