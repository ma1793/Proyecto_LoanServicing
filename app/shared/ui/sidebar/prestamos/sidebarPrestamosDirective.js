univerApp.directive("sidebar.prestamos", function() {
    return {
        restrict: "E",
        replace: true,
        templateUrl: "app/shared/ui/sidebar/prestamos/sidebarPrestamos.html",
        controller: function($scope,ModalService) {
           // UI-Components
            uiInitSidebar();


            //Desgloses*/
             $scope.abrirModalCrearDesglose = function () {
                ModalService.showModal({
                    templateUrl: "app/components/root/estructuraModal/estructuraModalView.html",
                    controller: "estructuraModalCtrl",
                    inputs: {
                        steps: [['Cliente','Selección/Creación de Cliente','active','<elegir.crear.cliente/>']],
                        titulo: "Crear Desglose de Préstamo"
                    }
                });
                esperaTiempoFuncion(modalOpen,300);
            };
             $scope.abrirModalVerDesglose = function () {
                ModalService.showModal({
                    templateUrl: "app/components/root/estructuraModal/estructuraModalView.html",
                    controller: "estructuraModalCtrl",
                    inputs: {
                        steps: [['Cliente','Selección de Cliente','active','<elegir.cliente/>'],['Desglose','Selección Desglose de Gastos','disabled','<elegir.desglose/>']],
                        titulo: "Ver/Actualizar Desglose de Préstamo"
                    }
                });
                esperaTiempoFuncion(modalOpen,300);
            };
            
            $scope.abrirModalEliminarDesglose = function () {
                ModalService.showModal({
                    templateUrl: "app/components/root/estructuraModal/estructuraModalView.html",
                    controller: "estructuraModalCtrl",
                    inputs: {
                        steps: [['Cliente','Selección de Cliente','active','<elegir.cliente/>'],['Desglose','Selección Desglose de Gastos','disabled','<elegir.desglose/>']],
                        titulo: "Eliminar Desglose de Préstamo"
                    }
                });
                esperaTiempoFuncion(modalOpen,300);
            };
            //Caratulas*/
            $scope.abrirModalCrearCaratula = function () {
                ModalService.showModal({
                    templateUrl: "app/components/root/estructuraModal/estructuraModalView.html",
                    controller: "estructuraModalCtrl",
                    inputs: {
                        steps: [['Cliente','Selección de Cliente','active','<elegir.cliente/>'],['Desglose','Selección Desglose de Gastos','disabled','<elegir.desglose/>']],
                        titulo: "Crear Carátula de Préstamo"
                    }
                });
                esperaTiempoFuncion(modalOpen,300);
            };
            
             $scope.abrirModalVerCaratula = function () {
                ModalService.showModal({
                    templateUrl: "app/components/root/estructuraModal/estructuraModalView.html",
                    controller: "estructuraModalCtrl",
                    inputs: {
                        steps: [['Cliente','Selección de Cliente','active','<elegir.cliente/>'],['Desglose','Selección Desglose de Gastos','disabled','<elegir.desglose/>'],['Carátula','Selección Carátula de Préstamo','disabled','<elegir.caratula/>']],
                        titulo: "Ver/Actualizar Carátula de Préstamo"
                    }
                });
                esperaTiempoFuncion(modalOpen,300);
            };
            
             $scope.abrirModalEliminarCaratula = function () {
                ModalService.showModal({
                    templateUrl: "app/components/root/estructuraModal/estructuraModalView.html",
                    controller: "estructuraModalCtrl",
                    inputs: {
                        steps: [['Cliente','Selección de Cliente','active','<elegir.cliente/>'],['Desglose','Selección Desglose de Gastos','disabled','<elegir.desglose/>'],['Carátula','Selección Carátula de Préstamo','disabled','<elegir.caratula/>']],
                        titulo: "Eliminar Carátula de Préstamo"
                    }
                });
                esperaTiempoFuncion(modalOpen,300);
            };
            
            
            
            
            //Requisitos*/
            $scope.abrirModalRequisitos = function () {
                ModalService.showModal({
                    templateUrl: "app/components/root/estructuraModal/estructuraModalView.html",
                    controller: "estructuraModalCtrl",
                    inputs: {
                        steps: [['Cliente','Selección de Cliente','active','<elegir.cliente/>'],['Desglose','Selección Desglose de Gastos','disabled','<elegir.desglose/>'],['Carátula','Selección Carátula de Préstamo','disabled','<elegir.caratula/>'],['Requisitos','Selección Requisitos de Préstamos','disabled','<elegir.requisitos/>']],
                        titulo: "Requisitos de Préstamos"
                    }
                });
                esperaTiempoFuncion(modalOpen,300);
            };
            
            

            //Pagos*/
            $scope.abrirModalPagosRegulares = function () {
                ModalService.showModal({
                    templateUrl: "app/components/root/estructuraModal/estructuraModalView.html",
                    controller: "estructuraModalCtrl",
                    inputs: {
                        steps: [['Cliente','Selección de Cliente','active','<elegir.cliente/>'],['Desglose','Selección Desglose de Gastos','disabled','<elegir.desglose/>'], ['Carátula','Selección Carátula de Préstamo','disabled','<elegir.caratula/>'],['Pagos','Selección Tipo de Pago','disabled','<elegir.pago.prestamo/>','<elegir.pago.morosidad/>']],
                        titulo: "Pagos Préstamo"
                    }
                });
                esperaTiempoFuncion(modalOpen,300);
            };
            //Estado de Cuenta
            $scope.abrirModalEstadoCuenta= function () {
                ModalService.showModal({
                    templateUrl: "app/components/root/estructuraModal/estructuraModalView.html",
                    controller: "estructuraModalCtrl",
                    inputs: {
                        steps: [['Cliente','Selección de Cliente','active','<elegir.cliente/>'],['Desglose','Selección Desglose de Gastos','disabled','<elegir.desglose/>'],['Carátula','Selección Carátula de Préstamo','disabled','<elegir.caratula/>'], ['Fecha','Selección Fecha Pago','disabled','<elegir.fecha/>'],['Estado Cuenta','Observación Estado Cuenta','disabled','<elegir.estado.cuenta/>']],
                        titulo: "Estado de Cuenta"
                    }
                });
                esperaTiempoFuncion(modalOpen,300);
            };
            /*Consulta Prestamo*/
            $scope.abrirModalConsulta = function () {
                ModalService.showModal({
                    templateUrl: "app/components/root/estructuraModal/estructuraModalView.html",
                    controller: "estructuraModalCtrl",
                    inputs: {
                        steps: [['Cliente','Selección de Cliente','active','<elegir.cliente/>'],['Desglose','Selección Desglose de Gastos','disabled','<elegir.desglose/>'],['Carátula','Selección Carátula de Préstamo','disabled','<elegir.caratula/>']],
                        titulo: "Histórico de Pagos"
                    }
                });
                esperaTiempoFuncion(modalOpen,300);
            };
            
            
            
            
            
            /*CRUD ELEMENTOS*/
            
            /*Acreedor*/
            $scope.abrirModalOperacionesAcreedor = function () {
                ModalService.showModal({
                    templateUrl: "app/components/root/operacionesModal/operacionesModalView.html",
                    controller: "operacionesModalCtrl",
                    inputs: {
                        directive: "<operacion.acreedor/>",
                        titulo: "Manejo de Acreedores"
                    }
                });
                esperaTiempoFuncion(modalOpen,300);
            };
            
            


        },
        controllerAs: "sidebar"
    };
});
