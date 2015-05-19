'use strict';

angular.module('univerApp.root.tareas', ['ui.router'])

    .controller('tareasCtrl', ['$scope','$rootScope','tareasRest',function($scope,$rootScope,tareasRest) {

        //UI Components ***
        uiInitInicio();


      // console.log("roles adm");
      //  console.log($rootScope.currentUser.userRole);
      //  console.log($scope.userRoles.admin);

        $scope.paginaActual = 0;
        $scope.cantidadPaginas = 0;
        $scope.listaTareas = [];
        $scope.nuevaTarea = "";


        $scope.updateUiComponents= function(){
            setTimeout(function() {
                uiInitInicio();
            },100);
        };

        tareasRest.getCantidadPaginas(function(data){
            $scope.cantidadPaginas  =  data;
        },$scope.currentUser.id);

        tareasRest.getTareas(function(data){
            $scope.listaTareas  =  data;
            console.log(JSON.stringify($scope.listaTareas));
            $scope.updateUiComponents();
        },$scope.currentUser.id,$scope.paginaActual);

        $scope.agregarNuevaTarea= function(){

            var nuevaTareaJSON = {"@type": "usuario", "idUser":$scope.currentUser.id, "wunders": [ {"texto":$scope.nuevaTarea} ]};
            $scope.nuevaTarea = "";
            $scope.formularioTareas.$setPristine();

            tareasRest.postNuevaTarea(function(data){$scope.listaTareas  =  data;$('#idListaTareas').transition('pulse');$scope.updateUiComponents();},nuevaTareaJSON);
            tareasRest.getCantidadPaginas(function(data){$scope.cantidadPaginas  =  data;},$scope.currentUser.id);
            $scope.paginaActual = 0;
        };

        $scope.actualizarTarea= function(pIndice){
            console.log("id wunder: " +  $scope.listaTareas[pIndice].idMessage);
            var nuevaTareaJSON = {"@type": "usuario", "idUser":$scope.currentUser.id, "wunders": [ {"idMessage":$scope.listaTareas[pIndice].idMessage,"texto":$scope.listaTareas[pIndice].texto,"fecha":$scope.listaTareas[pIndice].fecha,"estado":false,"estrella":!$scope.listaTareas[pIndice].estrella} ]};
            tareasRest.postActualizarTarea(function(data){$scope.listaTareas  =  data;console.log(JSON.stringify($scope.listaTareas));$scope.updateUiComponents();},nuevaTareaJSON);
            tareasRest.getCantidadPaginas(function(data){$scope.cantidadPaginas  =  data;},$scope.currentUser.id);
            $scope.paginaActual = 0;
        };


        $scope.eliminarTarea = function(pIndice) {
            tareasRest.deleteTarea(function(data){$scope.listaTareas =  data;$scope.updateUiComponents();},$scope.currentUser.id,$scope.listaTareas[pIndice].idMessage);
            tareasRest.getCantidadPaginas(function(data){$scope.cantidadPaginas  =  data;},$scope.currentUser.id);
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
