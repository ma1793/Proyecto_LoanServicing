
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
             eliminarCaratula:function(callback,pIdCaratula){
                var req = {
                    method: 'DELETE',
                    url: rootURL  + "/caratula/delete/"+pIdCaratula,
                    headers: {
                        'Content-Type': 'json'
                    }}
                $http(req)
                    .success(function(data) {
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
            postCrearCaratula: function(callback,pCaratulaJSON){
                var req = {
                    method: 'POST',
                    url: rootURL + "/caratula/crearCaratula",
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    },
                    data: JSON.stringify(pCaratulaJSON)
                }
                $http(req)
                    .success(function(data) {
                        // prepare data here
                        callback(data);
                    });
            },
            postPrimerPago: function(callback,pPrimerPagoJSON){
                var req = {
                    method: 'POST',
                    url: rootURL + "/caratula/crearPrimerPago",
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    },
                    data: JSON.stringify(pPrimerPagoJSON)
                }
                $http(req)
                    .success(function(data) {
                        // prepare data here
                        callback(data);
                    });
            }
            
            
            
        };
    }]);