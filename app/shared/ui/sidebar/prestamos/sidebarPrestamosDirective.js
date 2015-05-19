univerApp.directive("sidebar.prestamos", function() {
    return {
        restrict: "E",
        replace: true,
        templateUrl: "app/shared/ui/sidebar/prestamos/sidebarPrestamos.html",
        controller: function($scope,ModalService) {
           // UI-Components
            uiInitSidebar();


            //Desgloses*/
            $scope.AbrirModalEliminarDesglose = function () {
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




            //Pagos*/
            $scope.AbrirModalPagosRegulares = function () {
                ModalService.showModal({
                    templateUrl: "app/components/root/estructuraModal/estructuraModalView.html",
                    controller: "estructuraModalCtrl",
                    inputs: {
                        steps: [['Cliente','Selección de Cliente','active','<elegir.cliente/>'],['Desglose','Selección Desglose de Gastos','disabled','<elegir.desglose/>'], ['Carátula','Selección Carátula de Préstamo','disabled','<elegir.caratula/>'],['Pagos','Selección Tipo de Pago','disabled','<elegir.pago.morosidad/>']],
                        titulo: "Pagos Prestamo"
                    }
                });
                esperaTiempoFuncion(modalOpen,300);
            };

            $scope.AbrirModalPagosAntiguos = function () {
                ModalService.showModal({
                    templateUrl: "app/components/root/estructuraModal/estructuraModalView.html",
                    controller: "estructuraModalCtrl",
                    inputs: {
                        steps: [['Cliente','Selección de Cliente','active','<elegir.cliente/>'],['Desglose','Selección Desglose de Gastos','disabled','<elegir.desglose/>'], ['Carátula','Selección Carátula de Préstamo','disabled','<elegir.caratula/>'],['Pagos','Realizar Pago Antiguo','disabled','<elegir.pago.antiguo/>']],
                        titulo: "Pagos Prestamo Antiguos"
                    }
                });
                esperaTiempoFuncion(modalOpen,300);
            };

        },
        controllerAs: "sidebar"
    };
});
