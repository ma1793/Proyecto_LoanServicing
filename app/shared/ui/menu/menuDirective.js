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
             $scope.prestamos = function(){
                if (!$scope.prestamosSelected) {
                    if ($scope.alquileresSelected) {
                        esperaTiempoFuncion(sidebarClose, 200);
                        $scope.alquileresSelected = false;
                        $scope.prestamosSelected = true;
                        setTimeout(function() {$scope.$apply();});
                        esperaTiempoFuncion(sidebarOpen, 500);
                    } else {
                        $scope.prestamosSelected = true;
                        $scope.alquileresSelected = false;
                        esperaTiempoFuncion(sidebarOpen, 500);
                    }
                }
                
            
                
            };
            $scope.alquileres = function(){
                
                if (!$scope.alquileresSelected) {
                    if ($scope.prestamosSelected) {
                        esperaTiempoFuncion(sidebarClose, 200);
                        $scope.prestamosSelected = false;
                        $scope.alquileresSelected = true;
                        setTimeout(function() {$scope.$apply();});
                        esperaTiempoFuncion(sidebarOpen, 500);
                    } else {
                        $scope.alquileresSelected = true;
                        $scope.prestamosSelected = false;
                        esperaTiempoFuncion(sidebarOpen, 500);
                    }
                } 
            };

           

            $scope.logOut = function(){
                Auth.logout();
                $window.location.reload(true);
            };

        },
        controllerAs: "menu"
    };
});