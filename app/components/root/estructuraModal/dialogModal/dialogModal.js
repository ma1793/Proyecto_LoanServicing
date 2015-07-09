univerApp.controller('dialogModalCtrl', function($scope,$rootScope,close,$compile,$state,titulo,mensaje,icon) {
    $scope.tituloDialog = titulo;
    $scope.mensajeDialog = mensaje;
    $scope.iconDialog = icon;
    
    
    $scope.tipoDialogAccion = function(){
      switch($scope.tituloDialog){
          case "Sustituir Elemento":
              $rootScope.selectorAccionDialog(1);
              break;  
          case "Imprimir Elemento":
              $rootScope.imprimirElemento();
              break;  
                  
          case "Elemento Posteado Correctamente":
              $state.go('root.tareas');
              break;
      }
      $scope.close();
    };
    
    
    //Cerrar Modal mediante boton cancelar
    $scope.close = function() {
        dialogHide();
        close();
    };
});
