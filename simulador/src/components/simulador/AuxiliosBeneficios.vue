<script setup>
import { onMounted } from 'vue';
import { reactive } from 'vue';

import { formatarNumero } from '@/utils/FormatarNumero';
import { dadosAuxAlimentacaoService } from "@/services/dados/DadosAuxAlimentacaoService.js";
import { dadosSaudeSuplementarFaixasService } from "@/services/dados/DadosSaudeSuplementarFaixasService.js";
import { dadosSaudeSuplementarVersoesService } from "@/services/dados/DadosSaudeSuplementarVersoesService.js";

//Emitter 'calcularAuxilios' declarado ao incluir este objeto no Simulador
const emit = defineEmits(['calcularAuxilios']);

const auxilios = reactive(
  {
    idAuxAlimentacao: 0,
    saudeSup: {
                  idSaudeSupVersao: 0,
                  idSaudeSupTit: 0,
                  dependentes: [
                    //idSaudeSup: 0
                  ]
              },
    idAuxPreEscola: 0,
    auxTranporte: {
                    ativo: false,
                    gastoDiario: 2.8,
                    diasNoMes: 22
                  }
  }
);

const dados = reactive({
  auxiliosAlimentacao: null,
  saudeSuplementarVersoes: null,
  saudeSuplementarFaixas: null,
  titulacoes: null
});

onMounted(() => { 
  dados.auxiliosAlimentacao = dadosAuxAlimentacaoService.carregarDados();
  if(dados.auxiliosAlimentacao)
    auxilios.idAuxAlimentacao = dados.auxiliosAlimentacao[0].id;

  dados.saudeSuplementarVersoes = dadosSaudeSuplementarVersoesService.carregarDados();
  dados.saudeSuplementarFaixas = dadosSaudeSuplementarFaixasService.carregarDados();

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

    <!-- Auxílio Alimentação -->
    <div class="col-8">
      <label for="selAuxAliment" class="form-label">Auxílio Alimentação</label>
      <select id="selAuxAliment" class="form-select" v-model="auxilios.idAuxAlimentacao" @change="atualizarVencimento">
        <option value="0">Não</option>
        <option v-for="alim in dados.auxiliosAlimentacao" :value="alim.id">
          {{ alim.descricao }}: {{ formatarNumero.formatarReais(alim.valor) }}
        </option>
      </select>
    </div>

    <!-- Saúde Suplementar -->
    <div class="col-12">
      <!-- Saude Sup. Versão -->
      <div class="row">
        <label for="selSaudeSupVersao" class="col-3 col-form-label">Saúde Suplementar</label>
        <div class="col-6">
          <select id="selSaudeSupVersao" class="form-select" v-model="auxilios.saudeSup.idSaudeSupVersao" @change="atualizarVencimento">
            <option value="0">Não</option>
            <option v-for="versao in dados.saudeSuplementarVersoes" :value="versao.id">{{ versao.descricao }}</option>
          </select>
        </div>
      </div>

      <!-- Saude Sup. Titular -->
      <div class="row mt-1" v-if="auxilios.saudeSup.idSaudeSupVersao > 0">
        <span class="col-1"></span>
        <label for="selSaudeSupTit" class="col-2 col-form-label col-form-label-sm">Titular</label>
        <div class="col-5">
          <select id="selSaudeSupTit" class="form-select form-select-sm" v-model="auxilios.saudeSup.idSaudeSupTit" @change="atualizarVencimento">
            <option value="0">Não</option>
            <option v-for="faixa in dados.saudeSuplementarFaixas" :value="faixa.id">{{ faixa.descricao }}</option>
          </select>
        </div>

        <div class="col-3">
          <button class="btn btn-primary btn-sm" v-on:click="adicionarDependente">Adicionar dependente</button>
        </div>
      </div>

      <!-- Saude Sup. Dependentes -->
      <div v-for="(dep, idx) in auxilios.saudeSup.dependentes" v-if="auxilios.saudeSup.idSaudeSupVersao > 0">
        <div class="row mt-1">
          <span class="col-1"></span>
          <label :for="'selSaudeSupDep' + (idx+1)" class="col-2 col-form-label col-form-label-sm">Depend. {{ idx+1 }}</label>
          <div class="col-5">
            <select :id="'selSaudeSupDep' + (idx+1)" class="form-select form-select-sm" v-model="dep.idSaudeSup" @change="atualizarVencimento" >
              <option value="0">Não</option>
              <option v-for="faixa in dados.saudeSuplementarFaixas" :value="faixa.id">{{ faixa.descricao }}</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Auxílio Transporte -->
    <div class="col-12">
      <div class="row">
        <label for="selAuxTrasnp" class="col-3 col-form-label">Auxílio Transporte</label>
        <div class="col-6">
          <select id="selAuxTrasnp" class="form-select" v-model="auxilios.auxTranporte.ativo" @change="atualizarVencimento">
            <option :value="false">Não</option>
            <option :value="true">Sim</option>
          </select>
        </div>
      </div>

      <div class="row mt-1" v-if="auxilios.auxTranporte.ativo">
        <span class="col-1"></span>
        <label for="numGastoDiario" class="col-2 col-form-label col-form-label-sm">Gasto diário R$</label>
        <div class="col-5">
          <input id="numGastoDiario" type="number" class="form-control form-control-sm" step="0.1" min="1" max="99"
            v-model="auxilios.auxTranporte.gastoDiario" @change="atualizarVencimento">
        </div>
      </div>
      
      <div class="row mt-1" v-if="auxilios.auxTranporte.ativo">
        <span class="col-1"></span>
        <label for="numQtdDias" class="col-2 col-form-label col-form-label-sm">Dias no mês</label>
        <div class="col-5">
          <input id="numQtdDias" type="number" class="form-control form-control-sm" min="1" max="31"
            v-model="auxilios.auxTranporte.diasNoMes" @change="atualizarVencimento">
        </div>
      </div>
      
    </div>

    <!-- Auxílio Creche -->

  </div>

</template>
