
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
            }
        };
    }]);