
univerApp.factory('desglosesRest', ['$http', function($http){
        return{
            getDesgloses: function(callback,pIdCliente){
                var req = {
                    method: 'GET',
                    url: rootURL + "/desgloce/getDesgloces/"+pIdCliente,
                    headers: {
                        'Content-Type': 'json'
                    }}
                $http(req)
                    .success(function(data) {
                        // prepare data here
                        callback(data);
                    });
            },

            getVerificarEliminarDesglose:function(callback,pIdDesglose){
                var req = {
                    method: 'GET',
                    url: rootURL  + "/desgloce/verificarEliminar/"+pIdDesglose,
                    headers: {
                        'Content-Type': 'json'
                    }}
                $http(req)
                    .success(function(data) {
                        callback(data);
                    });
            },
            eliminarDesglose:function(callback,pIdDesglose){
                var req = {
                    method: 'DELETE',
                    url: rootURL  + "/desgloce/delete/"+pIdDesglose,
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