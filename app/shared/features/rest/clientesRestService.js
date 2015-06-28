
univerApp.factory('clientesRest', ['$http', function($http){
        return{
            getClientesFisicos: function(callback){
                var req = {
                    method: 'GET',
                    url: rootURL + "/cliente/getClientesFisicos",
                    headers: {
                        'Content-Type': 'json'
                    }}
                $http(req)
                    .success(function(data) {
                        // prepare data here
                        callback(data);
                    });
            },

            getClientesJuridicos: function(callback){
                var req = {
                    method: 'GET',
                    url: rootURL + "/cliente/getClientesJuridicos",
                    headers: {
                        'Content-Type': 'json'
                    }}
                $http(req)
                    .success(function(data) {
                        // prepare data here
                        callback(data);
                    });
            }
        };
    }]);