(function () {
    'use strict';

    angular
        .module('app', ['ui.router'])
        .config(config)
        .run(run);

    function config($stateProvider, $urlRouterProvider) {
        // default route
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'home/index.html',
                controller: 'Home.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'home' }
            })
            .state('account', {
                url: '/account',
                templateUrl: 'account/index.html',
                controller: 'Account.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'account' }
            })
            .state('questions', {
                url: '/questions',
                templateUrl: 'questions/index.html',
                controller: 'Questions.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'questions' }
            })
            .state('controle-estoque', {
               url: '/controle-estoque',
               templateUrl: 'controle-estoque/index.html',
               controller: 'ControleEstoque.IndexController',
               controllerAs: 'vm',
               data: { activeTab: 'controle-estoque' }
           })
            .state('nova-entrada', {
               url: '/controle-estoque/nova-entrada',
               templateUrl: 'controle-estoque/entrada/index.html',
               controller: 'ControleEstoqueEntrada.IndexController',
               controllerAs: 'vm',
               data: { activeTab: 'controle-estoque' }
           })
            .state('nova-saida', {
               url: '/controle-estoque/nova-saida',
               templateUrl: 'controle-estoque/saida/index.html',
               controller: 'ControleEstoqueSaida.IndexController',
               controllerAs: 'vm',
               data: { activeTab: 'controle-estoque' }
           });
    }

    function run($http, $rootScope, $window) {
        // get JWT token from server
        $.get('/app/token', function (token) {
            // add JWT token as default auth header
            console.log(token)
            $http.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            // update active tab on state change
            $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                $rootScope.activeTab = toState.data.activeTab;
            });
        });
    }

    $(function () {
        angular.bootstrap(document, ['app']);
    });
})();
