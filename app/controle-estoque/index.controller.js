(function () {
   'use strict';

   angular
      .module('app')
      .controller('ControleEstoque.IndexController', Controller);

   function Controller(ControleEstoqueService, FlashService, $location) {
      const vm = this;

      vm.movimentacoes = null;
      vm.getAll = getAll;
      vm.irParaEntradas = irParaEntradas;
      vm.irParaSaidas = irParaSaidas;

      getAll();

      function getAll() {
         ControleEstoqueService.getAll()
            .then((res) => {
               vm.movimentacoes = res;
            })
            .catch((err) => {
               FlashService.Error(err);
            });
      }

      function irParaSaidas() {
         $location.path('/controle-estoque/nova-saida');
      }

      function irParaEntradas() {
         $location.path('/controle-estoque/nova-entrada');
      }
   }
})(); 
