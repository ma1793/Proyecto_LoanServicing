
univerApp.factory('tareasRest', ['$http', function($http){
    return{
        getTareas: function(callback,pIdUser,pPagina){
            var req = {
                method: 'GET',
                //url: 'misc/wunderlist.json',
                url: rootURL + "/usuario/getWunders/"+pIdUser+"/"+pPagina,
                headers: {
                    'Content-Type': 'json'
                }}
            $http(req)
                .success(function(data) {
                    // prepare data here
                    callback(data);
                });
        },

        getCantidadPaginas: function(callback,pIdUser){
            var req = {
                method: 'GET',
                url: rootURL + "/usuario/getCantidadPaginas/"+pIdUser,
                headers: {
                    'Content-Type': 'json'
                }}
            $http(req)
                .success(function(data) {
                    // prepare data here
                    callback(data);
                });
        },

        postNuevaTarea: function(callback,pTareaNuevaJSON){
            var req = {
                method: 'POST',
                url: rootURL + "/usuario/postWunder",
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                data: JSON.stringify(pTareaNuevaJSON)
            }
            $http(req)
                .success(function(data) {
                    // prepare data here
                    callback(data);
                });
        },

        postActualizarTarea: function(callback,pTareaActualizadaJSON){
            var req = {
                method: 'POST',
                url: rootURL + "/usuario/updateWunder",
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                data: JSON.stringify(pTareaActualizadaJSON)
            }
            $http(req)
                .success(function(data) {
                    // prepare data here
                    callback(data);
                });
        },
        deleteTarea: function(callback,pIdUser,pIdTarea){
            var req = {
                method: 'DELETE',
                url: rootURL + "/usuario/delete/"+pIdTarea+"/"+pIdUser,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }
            $http(req)
                .success(function(data) {
                    // prepare data here
                    callback(data);
                });
        }




    };
}]);

