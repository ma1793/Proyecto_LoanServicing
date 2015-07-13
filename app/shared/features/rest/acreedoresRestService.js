
univerApp.factory('acreedoresRest', ['$http', function($http){
        return{
         
            
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
            
            
            
            postCrearAcreedor: function(callback,pAcreedorJSON){
                var req = {
                    method: 'POST',
                    url: rootURL + "/cliente/crearAcreedor",
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    },
                    data: JSON.stringify(pAcreedorJSON)
                }
                $http(req)
                    .success(function(data) {
                        // prepare data here
                        callback(data);
                    });
            },
            getVerificarEliminarAcreedor:function(callback,pIdPersona){
                var req = {
                    method: 'GET',
                    url: rootURL  + "/cliente/verificarEliminarAcreedor/"+pIdPersona,
                    headers: {
                        'Content-Type': 'json'
                    }}
                $http(req)
                    .success(function(data) {
                        callback(data);
                    });
            },
            eliminarAcreedor:function(callback,pIdPersona){
                var req = {
                    method: 'DELETE',
                    url: rootURL  + "/cliente/delete/"+pIdPersona,
                    headers: {
                        'Content-Type': 'json'
                    }}
                $http(req)
                    .success(function(data) {
                        callback(data);
                    });
            }
        
            
        };
    }]);