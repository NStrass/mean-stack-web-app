(function () {
   'use strict';

   angular
      .module('app')
      .controller('ControleEstoqueSaida.IndexController', Controller);

   function Controller(ControleEstoqueService, FlashService) {
      const vm = this;

      vm.saidaEstoqueAtual = {
         codItem: null,
         dataEntrada: null,
         tipo: null,
         marca: null,
         caracteristicas: null,
         tamanho: null,
         cor: null,
         valorEtiqueta: null,
         valorPago: null,
         valorMargem: null,
         precoSugerido: null
      };

      vm.addSaidaEstoque = addSaidaEstoque;
      vm.editSaidaEstoque = editSaidaEstoque;
      vm.removeSaidaEstoque = removeSaidaEstoque;
      vm.getAll = getAllSaidasEstoque;
      vm.clearAll = clearAll;

      getAllSaidasEstoque();

      function addSaidaEstoque() {
         if (isSaidaValid()) {
            addToDB();
         } else {
            FlashService.Error("Preencha todos os campos corretamente para adicionar!");
         }
      }

      function isSaidaValid() {
         return vm.saidaEstoqueAtual.codItem !== null
            && vm.saidaEstoqueAtual.codItem !== ""
            && vm.saidaEstoqueAtual.codItem !== undefined

            && vm.saidaEstoqueAtual.dataEntrada !== null
            && vm.saidaEstoqueAtual.dataEntrada !== ""
            && vm.saidaEstoqueAtual.dataEntrada !== undefined

            && vm.saidaEstoqueAtual.tipo !== null
            && vm.saidaEstoqueAtual.tipo !== ""
            && vm.saidaEstoqueAtual.tipo !== undefined

            && vm.saidaEstoqueAtual.marca !== null
            && vm.saidaEstoqueAtual.marca !== ""
            && vm.saidaEstoqueAtual.marca !== undefined

            && vm.saidaEstoqueAtual.caracteristicas !== null
            && vm.saidaEstoqueAtual.caracteristicas !== ""
            && vm.saidaEstoqueAtual.caracteristicas !== undefined

            && vm.saidaEstoqueAtual.tamanho !== null
            && vm.saidaEstoqueAtual.tamanho !== ""
            && vm.saidaEstoqueAtual.tamanho !== undefined

            && vm.saidaEstoqueAtual.cor !== null
            && vm.saidaEstoqueAtual.cor !== ""
            && vm.saidaEstoqueAtual.cor !== undefined

            && vm.saidaEstoqueAtual.valorPago !== null
            && vm.saidaEstoqueAtual.valorPago !== ""
            && vm.saidaEstoqueAtual.valorPago !== undefined

            && vm.saidaEstoqueAtual.valorMargem !== null
            && vm.saidaEstoqueAtual.valorMargem !== ""
            && vm.saidaEstoqueAtual.valorMargem !== undefined

            && vm.saidaEstoqueAtual.valorEtiqueta !== null
            && vm.saidaEstoqueAtual.valorEtiqueta !== ""
            && vm.saidaEstoqueAtual.valorEtiqueta !== undefined
      }

      function addToDB() {
         ControleEstoqueService.create(vm.saidaEstoqueAtual)
            .then(() => {
               
               getAllQuestions();
               FlashService.Success('Adicionado com sucesso');
            })
            .catch((error) => {
               FlashService.Error(error);
            });
      }

      function clearAll() {
         delete vm.saidaEstoqueAtual.codItem;
         delete vm.saidaEstoqueAtual.dataEntrada;
         delete vm.saidaEstoqueAtual.tipo;
         delete vm.saidaEstoqueAtual.marca;
         delete vm.saidaEstoqueAtual.caracteristicas;
         delete vm.saidaEstoqueAtual.tamanho;
         delete vm.saidaEstoqueAtual.cor;
         delete vm.saidaEstoqueAtual.valorEtiqueta;
         delete vm.saidaEstoqueAtual.valorPago;
         delete vm.saidaEstoqueAtual.valorMargem;
         delete vm.saidaEstoqueAtual.precoSugerido;
      }

      function getAllSaidasEstoque() {
         ControleEstoqueService.getAll()
            .then((questions) => {
               vm.questions = questions;
            })
            .catch((err) => {
               FlashService.Error(err);
            })
      }
      
      function editSaidaEstoque(id) {
         ControleEstoqueService.editSaidaEstoque()
            .then(() => {
               getAllSaidasEstoque();
            })
            .catch((err) => {
               FlashService.Error(err);
            })
      }

      function removeSaidaEstoque(id) {
         ControleEstoqueService.remove(id)
            .then(() => {
               getAllSaidasEstoque();
               FlashService.Success("Removido com sucesso");
            })
            .catch((err) => {
               FlashService.Error(err);
            });
      }
   }
})();