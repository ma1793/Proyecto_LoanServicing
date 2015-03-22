
univerApp.factory('clientesRest', ['$http', function($http){
        return{
            getClientesFisicos: function(callback){
                var req = {
                    method: 'GET',
                    url:'misc/users.json',
                    //url: rootURL + "/cliente/getClientesFisicos",
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
                    url:'misc/users.json',
                    //url: rootURL + "/cliente/getClientesFisicos",
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