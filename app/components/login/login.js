'use strict';

angular.module('univerApp.login', ['ui.router'])

        .controller('loginCtrl', ['$scope', '$rootScope', '$state', 'Auth', function($scope, $rootScope, $state, Auth) {
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
                        $rootScope.logIncorrecto = 1;
                        $scope.setErrorInputLogin();
                        console.log("error");
                    });
                };


                $scope.setErrorInputLogin = function() {
                    $scope.credentials.password = "";
                    $scope.formularioLogin.password.$setPristine();
                };

                angular.element(document).ready(function() {
                     $('.information').transition('scale in');

                });



            }]);
