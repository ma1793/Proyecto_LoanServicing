
univerApp.factory('pagosRest', ['$http', function($http){
        return{
            getEstadoCuenta: function(callback,pIdCaratula){
                var req = {
                    method: 'GET',
                    url: rootURL + "/caratula/getEstadoCuenta/"+pIdCaratula,
                    headers: {
                        'Content-Type': 'json'
                    }}
                $http(req)
                    .success(function(data) {
                        // prepare data here
                        callback(data);
                    });
            },
            postPagoEliminar: function(callback,pPagoJSON){
                var req = {
                    method: 'POST',
                    url: rootURL + "/pagos/eliminarPago",
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    },
                    data: JSON.stringify(pPagoJSON)
                }
                $http(req)
                    .success(function(data) {
                        // prepare data here
                        callback(data);
                    });
            },

            postPagoMorosidad: function(callback,pPagoJSON){
                var req = {
                    method: 'POST',
                    url: rootURL + "/pagos/Morosidad",
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    },
                    data: JSON.stringify(pPagoJSON)
                }
                $http(req)
                    .success(function(data) {
                        // prepare data here
                        callback(data);
                    });
            },


            postPagoSobrante: function(callback,pPagoJSON){
                var req = {
                    method: 'POST',
                    url: rootURL + "/pagos/Sobrante",
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    },
                    data: JSON.stringify(pPagoJSON)
                }
                $http(req)
                    .success(function(data) {
                        // prepare data here
                        callback(data);
                    });
            },

            postPagoFaltante: function(callback,pPagoJSON){
                var req = {
                    method: 'POST',
                    url: rootURL + "/pagos/Faltante",
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    },
                    data: JSON.stringify(pPagoJSON)
                }
                $http(req)
                    .success(function(data) {
                        // prepare data here
                        callback(data);
                    });
            },

            postPagoCompleto: function(callback,pPagoJSON){
                var req = {
                    method: 'POST',
                    url: rootURL + "/pagos/Completo",
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    },
                    data: JSON.stringify(pPagoJSON)
                }
                $http(req)
                    .success(function(data) {
                        // prepare data here
                        callback(data);
                    });
            }





        };
    }]);