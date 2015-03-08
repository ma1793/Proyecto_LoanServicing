'use strict';

angular.module('univerApp.login', ['ui.router'])

    .controller('loginCtrl', ['$scope', '$state', 'Auth',function($scope, $state, Auth) {
        $scope.credentials = {};
        $scope.loginForm = {};

        //when the form is submitted
        $scope.submit = function() {
            $scope.login($scope.credentials);
        };

        //Performs the login function, by sending a request to the server with the Auth service
        $scope.login = function(credentials) {
            Auth.login(credentials, function(user) {
                //success function
                $state.go('root.tareas');
            }, function(err) {
                console.log("error");
            });
        };


    }]);
