'use strict';

angular.module('univerApp.root.tareas', ['ui.router'])

    .controller('tareasCtrl', ['$scope','$rootScope','tareasRest',function($scope,$rootScope,tareasRest) {

        //UI Components ***
        uiInitInicio();


        $scope.paginaActual = 0;
        $scope.cantidadPaginas = 0;
        $scope.listaTareas = [];
        $scope.nuevaTarea = "";


        $scope.updateUiComponents= function(){
            setTimeout(function() {
                uiInitInicio();
            },200);
            setTimeout(function(){ $scope.$apply();},100);

        };

        tareasRest.getCantidadPaginas(function(data){
            $scope.cantidadPaginas  =  data;
        },$scope.currentUser.id);

        tareasRest.getTareas(function(data){
            $scope.listaTareas  =  data;
            
            $scope.updateUiComponents();
            
        },$scope.currentUser.id,$scope.paginaActual);

        $scope.agregarNuevaTarea= function(){

            var nuevaTareaJSON = {"@type": "usuario", "idUser":$scope.currentUser.id, "wunders": [ {"texto":$scope.nuevaTarea} ]};
            $scope.nuevaTarea = "";
            $scope.formularioTareas.$setPristine();

            tareasRest.postNuevaTarea(function(data){
                $scope.listaTareas  =  data;
                tareasRest.getCantidadPaginas(function(data){$scope.cantidadPaginas  =  data; },$scope.currentUser.id);
                $('#idListaTareas').transition('pulse');
                $scope.updateUiComponents();
            },nuevaTareaJSON);
            $scope.paginaActual = 0;
        };

        $scope.actualizarTarea= function(pIndice){
            var nuevaTareaJSON = {"@type": "usuario", "idUser":$scope.currentUser.id, "wunders": [ {"idMessage":$scope.listaTareas[pIndice].idMessage,"texto":$scope.listaTareas[pIndice].texto,"fecha":$scope.listaTareas[pIndice].fecha,"estado":false,"estrella":!$scope.listaTareas[pIndice].estrella} ]};
            tareasRest.postActualizarTarea(function(data){
                $scope.listaTareas  =  data;
                tareasRest.getCantidadPaginas(function(data){$scope.cantidadPaginas  =  data;},$scope.currentUser.id);
                $scope.updateUiComponents();
            },nuevaTareaJSON);
            
            $scope.paginaActual = 0;
        };
        $scope.actualizarEstadoEstrella = function(pEstado){
            if(pEstado)
                return "yellow";
            else
                return "";
        };


        $scope.eliminarTarea = function(pIndice) {
            tareasRest.deleteTarea(function(data){
                $scope.listaTareas =  data;
                tareasRest.getCantidadPaginas(function(data){$scope.cantidadPaginas  =  data;},$scope.currentUser.id);
                $scope.updateUiComponents();
            },$scope.currentUser.id,$scope.listaTareas[pIndice].idMessage);
            $scope.paginaActual = 0;
        };

        $scope.paginaSiguiente = function(){
            $scope.paginaActual += 1;
            tareasRest.getTareas(function(data){$scope.listaTareas  =  data;$scope.updateUiComponents();},$scope.currentUser.id,$scope.paginaActual)
            $('#idListaTareas').transition('pulse');
        };


        $scope.paginaAnterior = function(){
            $scope.paginaActual -= 1;
            tareasRest.getTareas(function(data){$scope.listaTareas  =  data;$scope.updateUiComponents();},$scope.currentUser.id,$scope.paginaActual)
            $('#idListaTareas').transition('pulse');
        };
       
                
       
    }]);
