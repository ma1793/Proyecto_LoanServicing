univerApp.service('fileUpload', function ($http,$rootScope) {
    function uploadProgress(evt,pIndice) {
        var V_PorcentajeProgreso = 0;
        if (evt.lengthComputable) {
            V_PorcentajeProgreso = Math.round(evt.loaded * 100 / evt.total);
            $rootScope.FG_ObtenerPorcentajeUpload(V_PorcentajeProgreso,pIndice);
        }
    }

    function uploadComplete(evt,pIndice){
        $rootScope.FG_OcultarBarraProgreso(pIndice);
        $rootScope.VG_ListaRequisitosPrestamo =JSON.parse(evt.target.responseText);
        $rootScope.FG_OrdenarAlfabeticamenteRequisitos();
        $rootScope.FG_AgregarIconoExisteRequisito();
    }

    function uploadFailed(pIndice){
        alert("El Requisito: \" "+$rootScope.VG_ListaRequisitosAgregados[pIndice].nombreRequisito+" \" no pudo ser subido por un error en la conexion");
        $rootScope.FG_salirRequisitos();

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
        $rootScope.VG_ListaXHRUpload.splice(0, 0,xhr);

    }
});



