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
                        steps: [['Cliente','Selección de Cliente','active','<elegir.crear.cliente/>']]
                    }
                });
                esperaTiempoFuncion(modalOpen,300);
            };



        },
        controllerAs: "sidebar"
    };
});
