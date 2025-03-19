<script setup>
import { onMounted } from 'vue';
import { reactive } from 'vue';

import { formatarNumero } from '@/utils/FormatarNumero';
import { dadosAuxAlimentacaoService } from "@/services/dados/DadosAuxAlimentacaoService.js";

//Emitter 'calcularAuxilios' declarado ao incluir este objeto no Simulador
const emit = defineEmits(['calcularAuxilios']);

const auxilios = reactive(
  {
    idAuxAlimentacao: "0",
    saudeSup: {
                  idSaudeSupTit: "0",
                  dependentes: []
              },
    idAuxPreEscola: "0",
    valorAuxTransp: "0"
  }
);

const dados = reactive({
  auxiliosAlimentacao: null,
  classes: null,
  regimes: null,
  titulacoes: null
});

onMounted(() => { 
  dados.auxiliosAlimentacao = dadosAuxAlimentacaoService.carregarDados();

  //gerenciarSelecaoVersao();
  /*

  dados.regimes = dadosRegimeService.carregarDados();
  if(dados.regimes)
    carreira.idRegime = dados.regimes[0].id;

  dados.titulacoes = dadosTitulacoesService.carregarDados();
  if(dados.titulacoes)
    carreira.idRT = dados.titulacoes[0].id;

    */
  atualizarVencimento();
});

function adicionarDependente() {
  auxilios.saudeSup.dependentes.push({idSaudeSup: "0"});
}

function gerenciarSelecaoVersao() {
  /*
  dados.classes = dadosClassesService.carregarDados(carreira.idVersao);
  if(dados.classes)
    carreira.idClasse = dados.classes[0].id;
  */
}

function atualizarVencimento() {
  emit('calcularAuxilios', auxilios);
}

</script>

<template>

  <div class="row g-3">

    <!--Linha 1-->
    <div class="col-8">
      <label for="selAuxAliment" class="form-label">Auxílio Alimentação</label>
      <select id="selAuxAliment" class="form-select" v-model="auxilios.idAuxAlimentacao" @change="atualizarVencimento">
        <option value="0">Não</option>
        <option v-for="alim in dados.auxiliosAlimentacao" :value="alim.id">
          {{ alim.descricao }}: {{ formatarNumero.formatarReais(alim.valor) }}
        </option>
      </select>
    </div>

    <!--Linha 1-->
    <div class="col-12">
      <span>Saúde Suplementar</span>

      <div class="row">
        <label for="selSaudeSupTit" class="col-3 col-form-label">Titular</label>
        <div class="col-6">
          <select id="selSaudeSupTit" class="form-select" v-model="auxilios.saudeSup.idSaudeSupTit" @change="atualizarVencimento">
            <option value="0">Não</option>
            <option v-for="alim in dados.auxiliosAlimentacao" :value="alim.id">
              {{ alim.descricao }}: {{ formatarNumero.formatarReais(alim.valor) }}
            </option>
          </select>
        </div>

        <div class="col-3">
          <button class="btn btn-primary btn-sm" v-on:click="adicionarDependente">Adicionar dependente</button>
        </div>
      </div>

      <div v-for="(dep, idx) in auxilios.saudeSup.dependentes">
        <div class="row mt-2">
          <label for="selSaudeSupTit" class="col-3 col-form-label">Dependente {{ idx+1 }}</label>
          <div class="col-6">
            <select id="selSaudeSupTit" class="form-select" v-model="dep.idSaudeSup" >
              <option value="0">Não</option>
              <option v-for="alim in dados.auxiliosAlimentacao" :value="alim.id">
                {{ alim.descricao }}: {{ formatarNumero.formatarReais(alim.valor) }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>

    

  </div>

</template>
