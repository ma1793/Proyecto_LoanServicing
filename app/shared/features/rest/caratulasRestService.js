
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
            }
        };
    }]);