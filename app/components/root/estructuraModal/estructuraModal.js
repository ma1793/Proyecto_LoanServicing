

univerApp.controller('estructuraModalCtrl', function($scope,$rootScope,close,$compile,steps,titulo,$state,ModalService) {

    //Se utiliza para verificar si cumple el paso actual seleccionado para asi verificar si puede pasar al siguiente
    $rootScope.cumplePasoModal = false;
    
    /*Pago Antiguo*/
    $rootScope.pagoMorosidadActivado = false;
    $rootScope.fechaPagoAntiguo=null;
    

    $scope.steps =  steps;
    $scope.tituloModal = titulo;

    $scope.setComponenteModal = function(pIndice){
            var directive;
            /*Init*/
            if(pIndice==0){
                $rootScope.pagoMorosidadActivado = false;
            } 
            //Verificar si se debe hacer un pago normal, o uno con morosidad
            if($scope.tituloModal === "Pagos Prestamo" && pIndice === 3){
               if($rootScope.caratulaSeleccionada.estadoMorosidad){
                   $rootScope.pagoMorosidadActivado = true;
                    directive = $compile($scope.steps[pIndice][4])($scope);
                }
               else
                    directive = $compile($scope.steps[pIndice][3])($scope);
            }
            else
                directive = $compile($scope.steps[pIndice][3])($scope);
            $('#ID_ModalComponent').empty();
            $('#ID_ModalComponent').append(directive);
            setTimeout(function(){ $scope.$apply();});
    };

    $scope.selection = $scope.steps[0][0];
    setTimeout(function(){ $scope.setComponenteModal(0) },50);

    $scope.getCurrentStateText = function(){
        return $scope.steps[$scope.getCurrentStepIndex()][3];
    };

    $scope.getCurrentStepIndex = function(){
        // Get the index of the current step given selection
        var fila = indice2dArreglo($scope.steps,$scope.selection);
        return $scope.steps.indexOf(fila[0]);
    };

    $scope.hasNextStep = function(){
        var stepIndex = $scope.getCurrentStepIndex();
        var nextStep = stepIndex + 1;
        // Return true if there is a next step, false if not
        if(typeof $scope.steps[nextStep] != 'undefined')
            return true;
        else
            return false;
    };

    $scope.hasPreviousStep = function(){
        var stepIndex = $scope.getCurrentStepIndex();
        var previousStep = stepIndex - 1;
        // Return true if there is a next step, false if not
        if(typeof $scope.steps[previousStep] != 'undefined')
            return true;
        else
            return false;
    };

    $scope.incrementStep = function() {
        if ( $scope.hasNextStep() )
        {
            var stepIndex = $scope.getCurrentStepIndex();
            var nextStep = stepIndex + 1;
            $scope.selection = $scope.steps[nextStep][0];
            $scope.steps[nextStep][2] = 'active';
            $scope.steps[stepIndex ][2] = 'completed';
            $scope.setComponenteModal(nextStep);
        }
    };

    $scope.decrementStep = function() {
        if ( $scope.hasPreviousStep() )
        {
            var stepIndex = $scope.getCurrentStepIndex();
            var previousStep = stepIndex - 1;
            $scope.selection = $scope.steps[previousStep][0];
            $scope.steps[previousStep][2] = 'active';
            $scope.steps[stepIndex ][2] = 'disabled';
            $scope.setComponenteModal(previousStep);
        }
    };
    
    $scope.isPrintStep = function(){
        var isPrint =false;
        switch($scope.steps[$scope.steps.length-1][3]){
            case "<elegir.requisitos/>":
                isPrint = true;
        }
        return isPrint;
    };

    $scope.printStepModal = function(){
        switch($scope.steps[$scope.steps.length-1][3]){
            case "<elegir.requisitos/>":
                $rootScope.imprimirRequisitos(); 
                break;           
        }
    };

    $scope.finalizarModal = function(){
        var cerrarModal = false;
        switch($scope.steps[$scope.steps.length-1][3]){
            //Prestamos
            case "<elegir.crear.cliente/>":
                $rootScope.finalizarModalCrearCliente();
                $rootScope.tipoOperacionTramite = 1;
                $state.go('root.clear');
                setTimeout(function(){$state.go('root.prestamosDesglose');},200);   
                break;
            case "<elegir.desglose/>":
                switch($scope.tituloModal){
                    case 'Crear Carátula de Préstamo':
                         $rootScope.tipoOperacionTramite = 1;
                         $state.go('root.clear');
                         setTimeout(function(){$state.go('root.prestamosCaratula');},200);   
                         break;
                    case 'Ver/Actualizar Deslose de Préstamo':
                         $rootScope.tipoOperacionTramite = 2;
                         $state.go('root.clear');
                         setTimeout(function(){$state.go('root.prestamosDesglose');},200);                            
                         break;
                    case 'Elimar Deslose de Préstamo':
                        $rootScope.abrirDialog("Eliminar Elemento","¿Desea Eliminar el Elemento Seleccionado?","remove");
                        cerrarModal = true;
                        break;
                }
                break;
            case "<elegir.caratula/>":
                switch($scope.tituloModal){
                    case 'Ver/Actualizar Carátula de Préstamo':
                         $rootScope.tipoOperacionTramite = 2;
                         $state.go('root.clear');
                         setTimeout(function(){$state.go('root.prestamosCaratula');},200); 
                         break;
                    case 'Consulta Préstamos':
                        $rootScope.tipoConsultaSeleccionada = 1;
                        $state.go('root.clear');
                        setTimeout(function(){$state.go('root.prestamosConsulta');},200); 
                        break;
                }  
                break;
                
            case "<elegir.garantia/>":
                $rootScope.agregarGarantiaJSON();
                $scope.close();
                break;
            case "<elegir.pago.prestamo/>":
                $rootScope.tipoConsultaSeleccionada = 2;
                if ($rootScope.caratulaSeleccionada.estadoMorosidad){
                    $rootScope.finalizarModalPrestamosPagoMorosidad();
                    $state.go('root.clear');
                    setTimeout(function(){$state.go('root.prestamosConsulta');},200); 
                }else{
                    $rootScope.finalizarModalPrestamosPago();
                    $state.go('root.clear');
                    setTimeout(function(){$state.go('root.prestamosConsulta');},200); 
                }
                break;
            case "<elegir.pago.morosidad/>":
                    $rootScope.tipoConsultaSeleccionada = 2;
                    $rootScope.finalizarModalPrestamosPagoMorosidad();
                    $state.go('root.clear');
                    setTimeout(function(){$state.go('root.prestamosConsulta');},200); 
                    break;
         

            //Alquileres
            case "<elegir.crear.cliente/>":
                //$rootScope.finalizarModalAlquileresCrearContrato();
                $state.go('root.alquileresContrato');
                break;
            case "<elegir.contrato/>":
                if( $scope.tituloModal == 'Consulta Alquiler')
                    $state.go('root.alquileresConsulta');
                else
                    $state.go('root.alquileresContrato');
                break;
            case "<elegir.pago.alquiler/>":
                //$rootScope.FinalizarModalAlquileresPago();
                $state.go('root.alquileresConsulta');
                break;
        }
        if(!cerrarModal)
            $scope.completoModal();
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


