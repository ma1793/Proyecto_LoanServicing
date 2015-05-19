univerApp.directive("menu", function() {
    return {
        restrict: "E",
        replace: true,
        templateUrl: "app/shared/ui/menu/menu.html",
        controller: function($scope,$state,Auth,$window) {
            // UI-Components
            uiInitMenu();

            $('.ui.inverted.menu.labeled.icon .item').transition({animation : 'pulse', interval  : 800});


            //Menu Init
            $scope.prestamosSelected = false;
            $scope.alquileresSelected = false;

            $scope.Inicio =  function(){
                setTimeout(function() {
                    $scope.prestamosSelected = false;
                    $scope.alquileresSelected = false;
                },10);

                setTimeout(function(){ $scope.$apply();},10);

            };
            $scope.Alquileres = function(){
                $scope.prestamosSelected = false;
                $scope.alquileresSelected = true;
                esperaTiempoFuncion(sidebarOpen,300);
            };

            $scope.Prestamos = function(){
                $scope.prestamosSelected = true;
                $scope.alquileresSelected = false;
                esperaTiempoFuncion(sidebarOpen,300);
            }

            $scope.LogOut = function(){
                Auth.logout();
                $window.location.reload(true);
            }

        },
        controllerAs: "menu"
    };
});