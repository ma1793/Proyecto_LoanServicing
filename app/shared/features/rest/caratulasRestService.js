
univerApp.factory('caratulasRest', ['$http', function($http){
        return{
            
            
            
            getCaratulas: function(callback,pIdDesglose){
                var req = {
                    method: 'GET',
                    url: rootURL + "/caratula/getCaratulas/"+pIdDesglose,
                    headers: {
                        'Content-Type': 'json'
                    }}
                $http(req)
                    .success(function(data) {
                        // prepare data here
                        callback(data);
                    });
            },
            
            getAcreedores: function(callback){
                var req = {
                    method: 'GET',
                    url: rootURL + "/cliente/getAcreedores",
                    headers: {
                        'Content-Type': 'json'
                    }}
                $http(req)
                    .success(function(data) {
                        // prepare data here
                        callback(data);
                    });
            },
            
            
            
            getGarantias: function(callback,pIdCliente){
                var req = {
                    method: 'GET',
                    url: rootURL + "/garantia/getGarantias/"+pIdCliente,
                    headers: {
                        'Content-Type': 'json'
                    }}
                $http(req)
                    .success(function(data) {
                        // prepare data here
                        callback(data);
                    });
            },
            
            
            
        };
    }]);