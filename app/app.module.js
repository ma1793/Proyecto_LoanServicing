

var univerApp = angular.module('univerApp', [
    'univerApp.login',
    'univerApp.root',
    'univerApp.root.tareas',
    'univerApp.root.prestamos.desglose',
    'angularModalService',
    'ui.router'
])

    /*Constants regarding user login defined here*/
    .constant('USER_ROLES', {
        all : '*',
        admin : 'admin',
        editor : 'editor',
        guest : 'guest',
        public:'public'
    }).constant('AUTH_EVENTS', {
        loginSuccess : 'auth-login-success',
        loginFailed : 'auth-login-failed',
        logoutSuccess : 'auth-logout-success',
        sessionTimeout : 'auth-session-timeout',
        notAuthenticated : 'auth-not-authenticated',
        notAuthorized : 'auth-not-authorized'
    })


    /* Adding the auth interceptor here, to check every $http request*/
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push([
            '$injector',
            function ($injector) {
                return $injector.get('AuthInterceptor');
            }
        ]);
    });