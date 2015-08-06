
univerApp.factory('contratosRest', ['$http', function($http){
    return{
        getContratos: function(callback,pIdCliente){
            var req = {
                method: 'GET',
                url:'misc/contratos.json',
                //url: rootURL + "/contrato/getContratos/"+pIdCliente,
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