

univerApp.controller('operacionesModalCtrl', function($scope,$rootScope,close,$compile,directive,titulo,$state,ModalService) {

    $rootScope.cumpleModal = false;
   

    $scope.directive =  directive;
    $scope.tituloModal = titulo;

    $scope.setComponenteModal = function(){
            var directiveCompiled;
            
            console.log($scope.directive);    
            directiveCompiled = $compile($scope.directive)($scope);
            $('#ID_ModalComponent').empty();
            $('#ID_ModalComponent').append(directiveCompiled);
            setTimeout(function(){ $scope.$apply();});
    };
    
     setTimeout(function(){ $scope.setComponenteModal(); },50);

     
     $scope.finalizarModal = function(){
        $rootScope.operacionModal();  
     };



    //Cerrar Modal mediante boton cancelar
    $scope.close = function() {
        modalHide();
        close();
    };

    //cerrar modal al estar completados los pasos para abrir un formulario
    $scope.completoModal = function() {
        sidebarClose();
        modalHide();
        close();
    };
    
  

});


