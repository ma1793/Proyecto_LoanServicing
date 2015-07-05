univerApp.service('fileUpload', function ($http,$rootScope) {
    function uploadProgress(evt,pIndice) {
        var porcentajeProgreso = 0;
        if (evt.lengthComputable) {
            porcentajeProgreso = Math.round(evt.loaded * 100 / evt.total);
            $rootScope.obtenerPorcentajeUpload(porcentajeProgreso,pIndice);
        }
    }

    function uploadComplete(evt,pIndice){
        $rootScope.ocultarBarraProgreso(pIndice);
        $rootScope.listaRequisitosPrestamo =JSON.parse(evt.target.responseText);
        $rootScope.ordenarAlfabeticamenteRequisitos();
        $rootScope.agregarIconoExisteRequisito();
    }

    function uploadFailed(pIndice){
        alert("El Requisito: \" "+$rootScope.listaRequisitosAgregados[pIndice].nombreRequisito+" \" no pudo ser subido por un error en la conexion");
        $rootScope.salirRequisitos();

    }

    this.uploadFileToUrl = function(file, uploadUrl,pIndice){
        var fd = new FormData();
        fd.append('file', file);

        var xhr = new XMLHttpRequest();
        xhr.upload.addEventListener("progress",function(e) {
            uploadProgress(e,pIndice);
        });
        xhr.addEventListener("error",function(e) {
            uploadFailed(pIndice);
        });
        xhr.addEventListener("load",function(e) {
            uploadComplete(e,pIndice);
        });

        xhr.open("POST", uploadUrl);
        xhr.send(fd);
        $rootScope.listaXHRUpload.splice(0, 0,xhr);

    };
});



