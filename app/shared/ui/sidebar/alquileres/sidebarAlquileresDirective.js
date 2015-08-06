univerApp.directive("sidebar.alquileres", function() {
    return {
        restrict: "E",
        replace: true,
        templateUrl: "app/shared/ui/sidebar/alquileres/sidebarAlquileres.html",
        controller: function($scope,ModalService) {
            // UI-Components
            uiInitSidebar();


            //Contrato de Alquiler*/
            $scope.AbrirModalCrearContrato = function () {
                ModalService.showModal({
                    templateUrl: "app/components/root/estructuraModal/estructuraModalView.html",
                    controller: "estructuraModalCtrl",
                    inputs: {
                        steps: [['Cliente','Selección de Cliente','active','<elegir.crear.cliente/>']],
                        titulo: "Crear Contrato de Alquiler"
                    }
                });
                esperaTiempoFuncion(modalOpen,300);
            };

            $scope.AbrirModalVerContrato = function () {
                ModalService.showModal({
                    templateUrl: "app/components/root/estructuraModal/estructuraModalView.html",
                    controller: "estructuraModalCtrl",
                    inputs: {
                        steps: [['Cliente','Selección de Cliente','active','<elegir.cliente/>'],['Contrato','Selección Contrato de Alquiler','disabled','<elegir.contrato/>']],
                        titulo: "Ver/Modificar Contrato de Alquiler"
                    }
                });
                esperaTiempoFuncion(modalOpen,300);
            };




            //Pagos Alquiler
            $scope.AbrirModalPagoAlquiler = function () {
               ModalService.showModal({
                    templateUrl: "app/components/root/estructuraModal/estructuraModalView.html",
                    controller: "estructuraModalCtrl",
                    inputs: {
                        steps: [['Cliente','Selección de Cliente','active','<elegir.cliente/>'],['Contrato','Selección Contrato de Alquiler','disabled','<elegir.contrato/>'],['Pago','Realizar Pago de Alquiler','disabled','<elegir.pago.alquiler/>']],
                        titulo: "Pagos Alquiler"
                    }
                });
                esperaTiempoFuncion(modalOpen,300);

            };

            //Consulta Alquiler
            $scope.AbrirModalConsultaAlquiler = function () {
                ModalService.showModal({
                    templateUrl: "app/components/root/estructuraModal/estructuraModalView.html",
                    controller: "estructuraModalCtrl",
                    inputs: {
                        steps: [['Cliente','Selección de Cliente','active','<elegir.cliente/>'],['Contrato','Selección Contrato de Alquiler','disabled','<elegir.contrato/>']],
                        titulo: "Consulta Alquiler"
                    }
                });
                esperaTiempoFuncion(modalOpen,300);
            };



        },
        controllerAs: "sidebar"
    };
});
