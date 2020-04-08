(function () {
   'use strict';

   angular
      .module('app')
      .controller('ControleEstoque.IndexController', Controller);

   function Controller(ControleEstoqueService, FlashService, $location, $state) {
      const vm = this;

      vm.movimentacoes = null;
      vm.getAll = getAll;
      vm.querRealmenteDeletar = querRealmenteDeletar;
      vm.editar = editar;
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

      function querRealmenteDeletar(id) {
         const ehParaExcluir = confirm("Tem certeza que quer excluir?");

         if (ehParaExcluir) {
            deletar(id);
         }
      }

      function deletar(id) {
         ControleEstoqueService.remove(id)
            .then((res) => {
               getAll();
               FlashService.Success("Excluído com sucesso!");
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

      function editar(id) {
         $location.path('/controle-estoque/nova-entrada/' + id);
      }
   }
})(); 
