<script setup>
import { onMounted } from 'vue';
import { reactive } from 'vue';

import { dadosVersaoService } from "@/services/dados/DadosVersaoService.js";
import { dadosClassesService } from "@/services/dados/DadosClassesService.js";
import { dadosRegimeService } from "@/services/dados/DadosRegimeService.js";
import { dadosTitulacoesService } from "@/services/dados/DadosTitulacoesService.js";

const carreira = reactive(
  {
    idVersao: "0",
    idClasse: "0",
    idRegime: "0",
    idRT: "0"
  }
);

const dados = reactive({
  versoes: null,
  classes: null,
  regimes: null,
  titulacoes: null
});

onMounted(() => { 
  dados.versoes = dadosVersaoService.carregarDados();
  if(dados.versoes)
    carreira.idVersao = dados.versoes[0].id;

  selecionarVersao();

  dados.regimes = dadosRegimeService.carregarDados();
  if(dados.regimes)
    carreira.idRegime = dados.regimes[0].id;

  dados.titulacoes = dadosTitulacoesService.carregarDados();
  if(dados.titulacoes)
    carreira.idRT = dados.titulacoes[0].id;
});

function selecionarVersao(event) {
  dados.classes = dadosClassesService.carregarDados(carreira.idVersao);
  if(dados.classes)
    carreira.idClasse = dados.classes[0].id;
}

</script>

<template>

  <div class="row g-3">

    <!--Linha 1-->
    <div class="col-7">
      <label for="selVersao" class="form-label">Versão</label>
      <select id="selVersao" class="form-select" v-model="carreira.idVersao" @change="selecionarVersao">
        <option v-for="versao in dados.versoes" :value="versao.id">{{ versao.descricao }}</option>
      </select>
    </div>

    <!--Linha 2-->
    <div class="col-6">
      <label for="selClasse" class="form-label">Classe</label>
      <select id="selClasse" class="form-select" v-model="carreira.idClasse">
        <option v-for="classe in dados.classes" :value="classe.id">{{ classe.descricao }}</option>
      </select>
    </div>

    <div class="col-6">
      <label for="selRegime" class="form-label">Regime</label>
      <select id="selRegime" class="form-select" v-model="carreira.idRegime">
        <option v-for="regime in dados.regimes" :value="regime.id">{{ regime.descricao }}</option>
      </select>
    </div>

    <!--Linha 3-->
    <div class="col-7">
      <label for="selRT" class="form-label">Retribuição por Titulação</label>
      <select id="selRT" class="form-select" v-model="carreira.idRT">
        <option v-for="tit in dados.titulacoes" :value="tit.id">{{ tit.descricao }}</option>
      </select>
    </div>

  </div>

</template>
