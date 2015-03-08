

univerApp.config(['$stateProvider','$urlRouterProvider','$locationProvider','USER_ROLES',
        function ($stateProvider,$urlRouterProvider,$locationProvider,USER_ROLES) {
            /////////////////////////////
            // Redirects and Otherwise //
            /////////////////////////////
            // Use $urlRouterProvider to configure any redirects (when) and invalid urls (otherwise).
            $urlRouterProvider.otherwise('/');
            $stateProvider
                .state("login", {
                    // Use a url of "/login" to set a states as the "index".
                    url: "/login",
                    // Example of an inline template string. By default, templates
                    // will populate the ui-view within the parent state's template.
                    // For top level states, like this one, the parent template is
                    // the index.html file. So this template will be inserted into the
                    // ui-view within index.html.
                    templateUrl: 'app/components/login/loginView.html',
                    controller: 'loginCtrl',
                    data: {
                        authorizedRoles: [USER_ROLES.public]
                    }

                })
                .state("root", {
                    abstract: true,
                    url: "/",
                    templateUrl: 'app/components/root/rootView.html',
                    controller: 'rootCtrl',
                    data: {
                        authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor, USER_ROLES.guest]
                    }
                })
                .state("root.tareas", {
                    url: '',
                    templateUrl: 'app/components/root/tareas/tareasView.html',
                    controller: 'tareasCtrl'
                })
                //Prestamos *******************************************************
                .state("root.prestamosDesglose", {
                    url:'prestamos/desglose',
                    templateUrl:'app/components/root/prestamos/desglose/desgloseView.html',
                    controller: 'desgloseCtrl'

                })
                //Modals
                .state("root.prestamosPagosModal", {
                    url: '',
                    views: {
                        'modal': {
                            templateUrl: 'app/components/root/prestamos/pagos/modal/pagosModalView.html',
                            controller: 'pagosModalCtrl'
                        }
                    }

                });





        }
    ]
);
