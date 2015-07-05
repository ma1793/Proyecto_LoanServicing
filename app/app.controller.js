univerApp.controller('parentController', ['$scope','$rootScope', '$state','Auth', 'AUTH_EVENTS','USER_ROLES',
    function($scope,$rootScope,$state,Auth,AUTH_EVENTS,USER_ROLES){
        // this is the parent controller for all controllers.
        // Manages auth login functions and each controller
        // inherits from this controller



        // Event unsuccesful login functions ***
        var showLogin = function(){
            $state.go("login");
        };
        var setCurrentUser = function(){
            $scope.currentUser = $rootScope.currentUser;
        };
        var showNotAuthorized = function(){
            alert("Not Authorized");
        };
        //***


        //Global Var ***
        $rootScope.nombreCompletoClienteSeleccionado = "";
        $rootScope.tipoClienteSeleccionado = 1; //1 =  cliente fisico, 2 = cliente juridico
        $rootScope.clienteSeleccionado = [];
        $rootScope.desgloseSeleccionado = [];
        $rootScope.caratulaSeleccionada = [];
        $rootScope.informeSeleccionado = [];
        


        $rootScope.logActivo = 0;    // cambia a 1 cuando la sesion esta iniciada
        $rootScope.logIncorrecto= 0; // se activa si la contraseña o el usuario son incorrectos




        //Auth
        $scope.currentUser = null;
        $scope.userRoles = USER_ROLES;
        $scope.isAuthorized = Auth.isAuthorized;





        //listen to events of unsuccessful logins, to run the login dialog
        $rootScope.$on(AUTH_EVENTS.notAuthenticated, showLogin);
        $rootScope.$on(AUTH_EVENTS.sessionTimeout, showLogin);
        //$rootScope.$on(AUTH_EVENTS.logoutSuccess, showLogin);
        $rootScope.$on(AUTH_EVENTS.notAuthorized, showNotAuthorized);
        $rootScope.$on(AUTH_EVENTS.loginSuccess, setCurrentUser);
        
        
        
        /*funciones globales*/
        

       

        
        

    } ]);