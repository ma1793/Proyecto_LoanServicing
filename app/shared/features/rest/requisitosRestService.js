
univerApp.factory('requisitosRest', ['$http', function($http){
        return{
            getRequisitos: function(callback,pIdDesglose){
                var req = {
                    method: 'GET',
                    url: rootURL + "/requisitos/getRequisitos/"+pIdDesglose,
                    headers: {
                        'Content-Type': 'json'
                    }};
                $http(req)
                    .success(function(data) {
                        // prepare data here
                        callback(data);
                    });
            },
            getRequisitosTipoCliente: function(callback,pTipoCliente){
                var req = {
                    method: 'GET',
                    url: rootURL + "/requisitos/getRequisitosTipo/"+pTipoCliente,
                    headers: {
                        'Content-Type': 'json'
                    }};
                $http(req)
                    .success(function(data) {
                        // prepare data here
                        callback(data);
                    });
            },
            deleteRequisitoSeleccionado: function(callback,pRequisitoSeleccionado){
                var req = {
                    method: 'POST',
                    url: rootURL + "/files/delete",
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    },
                    data: JSON.stringify(pRequisitoSeleccionado)
                };
                $http(req)
                    .success(function(data) {
                        // prepare data here
                        callback(data);
                    });
            },
            
            deleteTodosRequisitosAgregados: function(callback,pIdDesglose){
                var req = {
                    method: 'DELETE',
                    url: rootURL + "/files/eliminarRequisitos/"+pIdDesglose,
                    headers: {
                        'Content-Type': 'json'
                    }};
                $http(req)
                    .success(function(data) {
                        // prepare data here
                        callback(data);
                    });
            }
            
           

        };
    }]);