
univerApp.factory('desglosesRest', ['$http', function($http){
        return{
            GetDesgloses: function(callback,pIdCliente){
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

            GetVerificarEliminarDesglose:function(callback,pIdDesglose){
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
            EliminarDesglose:function(callback,pIdDesglose){
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