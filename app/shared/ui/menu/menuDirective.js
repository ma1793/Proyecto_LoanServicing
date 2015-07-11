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

                esperaTiempoFuncion(sidebarOpen,500);
                $scope.prestamosSelected = false;
                $scope.alquileresSelected = true;
            };

            $scope.Prestamos = function(){
                
                esperaTiempoFuncion(sidebarOpen,500);
                $scope.prestamosSelected = true;
                $scope.alquileresSelected = false;
            }

            $scope.LogOut = function(){
                Auth.logout();
                $window.location.reload(true);
            };

        },
        controllerAs: "menu"
    };
});