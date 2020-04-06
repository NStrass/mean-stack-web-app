(function () {
   'use strict';

   angular
      .module('app')
      .controller('ControleEstoqueEntrada.IndexController', Controller);

   function Controller(ControleEstoqueService, FlashService, $location) {
      const vm = this;
      const date = new Date();

      vm.addSaidaEstoque = addSaidaEstoque;
      vm.clearAll = clearAll;
      vm.voltarParaControleEstoque = voltarParaControleEstoque;
      vm.dateNow = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();

      vm.saidaEstoqueAtual = {
         codItem: null,
         dataEntrada: vm.dateNow,
         tipo: null,
         marca: null,
         caracteristicas: null,
         tamanho: null,
         cor: null,
         valorEtiqueta: 0,
         valorPago: 0,
         valorMargem: 0,
         precoSugerido: 0,
         quantidade: 0,
         tipoTransacao: 'entrada'
      };

      function voltarParaControleEstoque() {
         $location.path("/controle-estoque");
      }

      function addSaidaEstoque() {
         if (isSaidaValid()) {
            vm.saidaEstoqueAtual.valorMargem = vm.saidaEstoqueAtual.valorPago * 2;
            addToDB();
         } else {
            FlashService.Error("Preencha todos os campos corretamente para adicionar!");
         }
      }

      function isSaidaValid() {
         debugger
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
            && vm.saidaEstoqueAtual.valorPago > 0
            && vm.saidaEstoqueAtual.valorPago !== undefined
            && typeof parseFloat(vm.saidaEstoqueAtual.valorPago) === 'number'

            && vm.saidaEstoqueAtual.valorEtiqueta !== null
            && vm.saidaEstoqueAtual.valorEtiqueta !== ""
            && vm.saidaEstoqueAtual.valorEtiqueta > 0
            && vm.saidaEstoqueAtual.valorEtiqueta !== undefined
            && typeof parseFloat(vm.saidaEstoqueAtual.valorEtiqueta) === 'number'

            && vm.saidaEstoqueAtual.precoSugerido !== null
            && vm.saidaEstoqueAtual.precoSugerido !== ""
            && vm.saidaEstoqueAtual.precoSugerido > 0
            && vm.saidaEstoqueAtual.precoSugerido !== undefined
            && typeof parseFloat(vm.saidaEstoqueAtual.precoSugerido) === 'number'

            && vm.saidaEstoqueAtual.quantidade !== null
            && vm.saidaEstoqueAtual.quantidade !== ""
            && vm.saidaEstoqueAtual.quantidade >= 1
            && vm.saidaEstoqueAtual.quantidade !== undefined
            && typeof parseFloat(vm.saidaEstoqueAtual.quantidade) === 'number'
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
         vm.saidaEstoqueAtual.dataEntrada = vm.dateNow;
         delete vm.saidaEstoqueAtual.tipo;
         delete vm.saidaEstoqueAtual.marca;
         delete vm.saidaEstoqueAtual.caracteristicas;
         delete vm.saidaEstoqueAtual.tamanho;
         delete vm.saidaEstoqueAtual.cor;
         delete vm.saidaEstoqueAtual.valorEtiqueta;
         delete vm.saidaEstoqueAtual.valorPago;
         vm.saidaEstoqueAtual.valorPago = 0;
         delete vm.saidaEstoqueAtual.valorMargem;
         vm.saidaEstoqueAtual.valorMargem = 0;
         delete vm.saidaEstoqueAtual.precoSugerido;
         vm.saidaEstoqueAtual.precoSugerido = 0;
      }
   }
})();