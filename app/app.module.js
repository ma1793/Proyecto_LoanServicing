

var univerApp = angular.module('univerApp', [
    'univerApp.login',
    'univerApp.root',
    'univerApp.root.tareas',
    'univerApp.root.prestamos.desglose',
    'univerApp.root.prestamos.caratula',
    'univerApp.root.prestamos.consulta',

    'univerApp.root.alquileres.contrato',
    'univerApp.root.alquileres.consulta',
    'angularModalService',
    'ui.router',
    'ngLoadingSpinner'
])

    /*Constants regarding user login defined here*/
    .constant('USER_ROLES', {
        all : '*',
        admin : 'Administrador',
        editorPrestamos : 'EditorPrestamos',
        editorAlquileres : 'EditorAlquileres',
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