univerApp.directive("sidebar.prestamos", function() {
    return {
        restrict: "E",
        replace: true,
        templateUrl: "app/shared/ui/sidebar/prestamos/sidebarPrestamos.html",
        controller: function($scope,ModalService) {
           // UI-Components
            uiInitSidebar();


            //Desgloses*/
            $scope.abrirModalEliminarDesglose = function () {
                ModalService.showModal({
                    templateUrl: "app/components/root/estructuraModal/estructuraModalView.html",
                    controller: "estructuraModalCtrl",
                    inputs: {
                        steps: [['Cliente','Selección de Cliente','active','<elegir.cliente/>'],['Desglose','Selección Desglose de Gastos','disabled','<elegir.desglose/>']],
                        titulo: "Elimar Deslose"
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
                        titulo: "Pagos Prestamo"
                    }
                });
                esperaTiempoFuncion(modalOpen,300);
            };

            $scope.abrirModalPagosAntiguos = function () {
                ModalService.showModal({
                    templateUrl: "app/components/root/estructuraModal/estructuraModalView.html",
                    controller: "estructuraModalCtrl",
                    inputs: {
                        steps: [['Cliente','Selección de Cliente','active','<elegir.cliente/>'],['Desglose','Selección Desglose de Gastos','disabled','<elegir.desglose/>'],['Carátula','Selección Carátula de Préstamo','disabled','<elegir.caratula/>'], ['Fecha','Selección Fecha Pago','disabled','<elegir.fecha/>'],['Pagos','Realizar Pago Antiguo','disabled','<elegir.pago.morosidad/>']],
                        titulo: "Pagos Prestamo Antiguos"
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
                        titulo: "Consulta Préstamos"
                    }
                });
                esperaTiempoFuncion(modalOpen,300);
            };
            
            
            

        },
        controllerAs: "sidebar"
    };
});
