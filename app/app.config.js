univerApp.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push(function ($q) {
        return {
            'response': function (response) {
                //Will only be called for HTTP up to 300
                return response;
            },
            'responseError': function (rejection) {
                switch(rejection.status){
                    case 0:
                        alert("Error 0: No hay Conexión con el Servidor");
                        break;
                    case 408:
                        alert("Error 408: Request Timeout");
                        break;
                }
               
                return $q.reject(rejection);
            }
        };
    });
}]);