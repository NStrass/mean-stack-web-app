(function () {
    'use strict';

    angular
        .module('app')
        .factory('ControleEstoqueService', Service);

    function Service($http, $q) {
        var apiURL = "http://localhost:9050/api/controle-estoque";
        var service = {};

        service.getToken = getToken;
        service.getById = getById;
        service.getAllEntrada = getAllEntrada;
        service.getAllSaida = getAllSaida;
        service.getAll = getAll;
        service.create = create;
        service.remove = remove;
        service.edit = edit;

        return service;

        function getToken() {
            // get userId token from server
            return $.get('/app/token');
        }

         function getById(_id) {
            return $http.get(apiURL + '/' + _id).then(handleSuccess, handleError);
         }

        function getAllEntrada() {
            return $http.get(apiURL + '/entradas').then(handleSuccess, handleError);
        }

        function getAll() {
            return $http.get(apiURL + '/').then(handleSuccess, handleError);
        }

        function getAllSaida() {
            return $http.get(apiURL + '/saidas').then(handleSuccess, handleError);
        }

        function create(movimentacao) {
            return $http.post(apiURL + '/create', movimentacao).then(handleSuccess, handleError);
        }

        function remove(_id) {
            return $http.delete(apiURL + '/' + _id).then(handleSuccess, handleError);
        }

        function edit(_id, novaMovimentacao) {
            return $http.put(apiURL + '/' + _id,  novaMovimentacao).then(handleSuccess, handleError);
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(res) {
            return $q.reject(res.data);
        }

    }

})();
