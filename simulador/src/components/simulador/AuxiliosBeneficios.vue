<script setup>
import { onMounted } from 'vue';
import { reactive } from 'vue';

import { formatarNumero } from '@/utils/FormatarNumero';
import { dadosAuxAlimentacaoService } from "@/services/dados/DadosAuxAlimentacaoService.js";
import { dadosSaudeSuplementarFaixasService } from "@/services/dados/DadosSaudeSuplementarFaixasService.js";
import { dadosSaudeSuplementarVersoesService } from "@/services/dados/DadosSaudeSuplementarVersoesService.js";
import { dadosAuxPreEscolar } from '@/services/dados/DadosAuxPreEscolar';

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
    auxTranporte: {
      ativo: false,
      gastoDiario: 10.0,
      diasTrabalhados: 22
    },
    idAuxPreEscolar: 0,
  }
);

const dados = reactive({
  auxiliosAlimentacao: null,
  saudeSuplementarVersoes: null,
  saudeSuplementarFaixas: null,
  auxiliosPreEscolar: null
});

onMounted(() => { 
  dados.auxiliosAlimentacao = dadosAuxAlimentacaoService.carregarDados();
  if(dados.auxiliosAlimentacao)
    auxilios.idAuxAlimentacao = dados.auxiliosAlimentacao[0].id;

  dados.saudeSuplementarVersoes = dadosSaudeSuplementarVersoesService.carregarDados();
  dados.saudeSuplementarFaixas = dadosSaudeSuplementarFaixasService.carregarDados();

  dados.auxiliosPreEscolar = dadosAuxPreEscolar.carregarDados();

  atualizarVencimento();
});

function adicionarDependente() {
  auxilios.saudeSup.dependentes.push({idSaudeSup: 0});
}

function atualizarVencimento() {
  emit('calcularAuxilios', auxilios);
}

</script>

<template>

  <div class="row g-3">

    <!-- Auxílio Alimentação -->
    <div class="col-9">
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
        <div class="col-5">
          <select id="selSaudeSupVersao" class="form-select" v-model="auxilios.saudeSup.idSaudeSupVersao" @change="atualizarVencimento">
            <option value="0">Não</option>
            <option v-for="versao in dados.saudeSuplementarVersoes" :value="versao.id">{{ versao.descricao }}</option>
          </select>
        </div>
      </div>

      <!-- Saude Sup. Titular -->
      <div class="row mt-2" v-if="auxilios.saudeSup.idSaudeSupVersao > 0">
        <span class="col-1"></span>
        <label for="selSaudeSupTit" class="col-3 col-form-label col-form-label-sm">Titular</label>
        <div class="col-4">
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
        <div class="row mt-2">
          <span class="col-1"></span>
          <label :for="'selSaudeSupDep' + (idx+1)" class="col-3 col-form-label col-form-label-sm">Dependente {{ idx+1 }}</label>
          <div class="col-4">
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
        <div class="col-5">
          <select id="selAuxTrasnp" class="form-select" v-model="auxilios.auxTranporte.ativo" @change="atualizarVencimento">
            <option :value="false">Não</option>
            <option :value="true">Sim</option>
          </select>
        </div>
      </div>

      <div class="row mt-2" v-if="auxilios.auxTranporte.ativo">
        <span class="col-1"></span>
        <label for="numGastoDiario" class="col-3 col-form-label col-form-label-sm">Gasto diário R$</label>
        <div class="col-4">
          <input id="numGastoDiario" type="number" class="form-control form-control-sm" step="0.2" min="1" max="99"
            v-model="auxilios.auxTranporte.gastoDiario" @change="atualizarVencimento">
        </div>
      </div>
      
      <div class="row mt-2" v-if="auxilios.auxTranporte.ativo">
        <span class="col-1"></span>
        <label for="numQtdDias" class="col-3 col-form-label col-form-label-sm">Dias trabalhados</label>
        <div class="col-4">
          <input id="numQtdDias" type="number" class="form-control form-control-sm" min="1" max="22"
            v-model="auxilios.auxTranporte.diasTrabalhados" @change="atualizarVencimento">
        </div>
      </div>
    </div>

    <!-- Auxílio Pré-escola -->
    <div class="col-9">
      <label for="selAuxPreEscola" class="form-label">Auxílio Pré-escolar</label>
      <select id="selAuxPreEscola" class="form-select" v-model="auxilios.idAuxPreEscolar" @change="atualizarVencimento">
        <option value="0">Não</option>
        <option v-for="pre in dados.auxiliosPreEscolar" :value="pre.id">
          {{ pre.descricao }}: {{ formatarNumero.formatarReais(pre.valor) }}
        </option>
      </select>
    </div>

  </div>

</template>
