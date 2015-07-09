'use strict';

angular.module('univerApp.root', ['ui.router'])

        .controller('rootCtrl', ['$scope', '$rootScope', 'ModalService', function($scope, $rootScope, ModalService) {

                //Global Var ***
                $rootScope.nombreCompletoClienteSeleccionado = "";
                $rootScope.tipoClienteSeleccionado = 1; //1 =  cliente fisico, 2 = cliente juridico
                $rootScope.clienteSeleccionado = [];
                $rootScope.desgloseSeleccionado = [];
                $rootScope.caratulaSeleccionada = [];
                $rootScope.informeSeleccionado = [];
                
                $rootScope.listaGarantiasCaratula = [];
                
                
                
                
                /*Tipo Operacion*/
                $rootScope.tipoOperacionTramite = 1; //1=Crear, 2 = Ver/Actualizar


                //Dialog
                $rootScope.abrirDialog = function(pTitulo, pMensaje,pIcono) {
                    ModalService.showModal({
                        templateUrl: "app/components/root/estructuraModal/dialogModal/dialogModalView.html",
                        controller: "dialogModalCtrl",
                        inputs: {
                            titulo: pTitulo,
                            mensaje: pMensaje,
                            icon:pIcono}
                    });
                    esperaTiempoFuncion(modalOpen, 300);
                };


            }]);


