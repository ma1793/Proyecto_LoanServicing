
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
            },
            postCrearClienteFisico: function(callback,pClienteFisicoJSON){
                var req = {
                    method: 'POST',
                     url: rootURL + "/cliente/crearClienteFisico",
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    },
                    data: JSON.stringify(pClienteFisicoJSON)
                }
                $http(req)
                    .success(function(data) {
                        // prepare data here
                        callback(data);
                    });
            },
            postCrearClienteJuridico: function(callback,pClienteJuridicoJSON){
                var req = {
                    method: 'POST',
                    url: rootURL + "/cliente/crearClienteJuridico",
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    },
                    data: JSON.stringify(pClienteJuridicoJSON)
                }
                $http(req)
                    .success(function(data) {
                        // prepare data here
                        callback(data);
                    });
            }
            

            
            
        };
    }]);