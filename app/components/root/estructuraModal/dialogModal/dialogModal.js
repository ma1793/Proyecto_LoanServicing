univerApp.controller('dialogModalCtrl', function($scope,$rootScope,close,$compile,titulo,mensaje) {
    $scope.tituloDialog = titulo;
    $scope.mensajeDialog = mensaje;
    
    
    $scope.tipoDialogAccion = function(){
      switch($scope.tituloDialog){
          case "Sustituir Elemento":
              $rootScope.selectorAccionDialog(1);
              break;   
      }
    };
    
    
    //Cerrar Modal mediante boton cancelar
    $scope.close = function() {
        dialogHide();
        close();
    };
});
