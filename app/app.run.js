univerApp.run(function($rootScope, $state,$stateParams,$window, Auth, AUTH_EVENTS) {



    //before each state change, check if the user is logged in
    //and authorized to move onto the next state
    $rootScope.$on('$stateChangeStart', function (event, next) {
        if( next.name != 'login') {
            var authorizedRoles = next.data.authorizedRoles;
            if (!Auth.isAuthorized(authorizedRoles)) {
                event.preventDefault();
                if (Auth.isAuthenticated()) {
                    // user is not allowed
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
                } else {
                    //Verifica si ya se ha iniciado secion al refrescar
                    if ($window.sessionStorage["userInfo"]) {
                            var credentials = JSON.parse($window.sessionStorage["userInfo"]);
                            Auth.login(credentials, function (user) {
                                $rootScope.logActivo = 1;
                                $state.go('root.tareas');
                            }, function (err) {
                                
                                $state.go('login');
                                alert("Log Error");
                            });
                    }

                    else {
                        // user is not logged in
                        $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
                    }
                }

            }
        }
        else{
            if($rootScope.logActivo == 1) {
                 $rootScope.logActivo = 0;
                 Auth.logout();
            }

        }




    });




    /* To show current active state on menu */
    $rootScope.getClass = function(path) {
        if ($state.current.name == path) {
            return "active";
        } else {
            return "";
        }
    };

    $rootScope.logout = function(){
        Auth.logout();
    };

});