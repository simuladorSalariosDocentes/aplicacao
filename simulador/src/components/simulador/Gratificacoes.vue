<script setup>
import { onMounted } from 'vue';
import { reactive } from 'vue';

import { formatarNumero } from '@/utils/FormatarNumero';
import { dadosAuxAlimentacaoService } from "@/services/dados/DadosAuxAlimentacaoService.js";
import { dadosGratificacoesFCCService } from '@/services/dados/DadosGratificacoesFCCService';
import { dadosGratificacoesFGVersoesService } from '@/services/dados/DadosGratificacoesFGVersoesService';
import { dadosGratificacoesFGValoresService } from '@/services/dados/DadosGratificacoesFGValoresService';
import { dadosGratificacoesCDVersoesService } from '@/services/dados/DadosGratificacoesCDVersoesService';
import { dadosGratificacoesCDValoresService } from '@/services/dados/DadosGratificacoesCDValoresService';

//Emitter 'calcularGratificacoes' declarado ao incluir este componente no Simulador
const emit = defineEmits(['calcularGratificacoes']);

const gratificacoes = reactive(
  {
    idFCC: 0,
    fg: {
      idFGVersao: 0,
      idFGValor: 0
    },
    cd: {
      idCDVersao: 0,
      idCDValor: 0,
      percentual: dadosGratificacoesCDValoresService.PERCENTUAL_60
    }
  }
);

const dados = reactive({
  auxiliosAlimentacao: null,
  listaFCC: null,
  
  listaFGVersoes: null,
  listaFGNiveis: null,
  
  listaCDVersoes: null,
  listaCDNiveis: null
});

onMounted(() => { 
  dados.auxiliosAlimentacao = dadosAuxAlimentacaoService.carregarDados();
  dados.listaFCC = dadosGratificacoesFCCService.carregarDados();
  dados.listaFGVersoes = dadosGratificacoesFGVersoesService.carregarDados();
  dados.listaCDVersoes = dadosGratificacoesCDVersoesService.carregarDados();

  atualizarVencimento();
});

function gerenciarSelecaoFGVersao() {
  dados.listaFGNiveis = dadosGratificacoesFGValoresService.carregarDados(gratificacoes.fg.idFGVersao);
  if(dados.listaFGNiveis)
    gratificacoes.fg.idFGValor = dados.listaFGNiveis[0].id;
}

function gerenciarSelecaoCDVersao() {
  dados.listaCDNiveis = dadosGratificacoesCDValoresService.carregarDados(gratificacoes.cd.idCDVersao);
  if(dados.listaCDNiveis)
    gratificacoes.cd.idCDValor = dados.listaCDNiveis[0].id;
}

function atualizarVencimento(event) {
  if(event) {
    
    if(event.target.id == "selFGVersao")
      gerenciarSelecaoFGVersao();
    
    else if(event.target.id == "selCDVersao")
      gerenciarSelecaoCDVersao(); 
  } 

  emit('calcularGratificacoes', gratificacoes);
}

</script>

<template>

  <div class="row g-3">

    <!-- FCC -->
    <div class="col-9">
      <label for="selFCC" class="form-label">FCC</label>
      <select id="selFCC" class="form-select" v-model="gratificacoes.idFCC" @change="atualizarVencimento">
        <option value="0">Não</option>
        <option v-for="fcc in dados.listaFCC" :value="fcc.id">
          {{ fcc.descricao }}: {{ formatarNumero.formatarReais(fcc.valor) }}
        </option>
      </select>
    </div>

    <!-- FG -->
    <div class="col-12">
      <!-- FG Versão -->
      <div class="row">
        <label for="selFGVersao" class="col-1 col-form-label">FG</label>
        <div class="col-7">
          <select id="selFGVersao" class="form-select" v-model="gratificacoes.fg.idFGVersao" @change="atualizarVencimento">
            <option value="0">Não</option>
            <option v-for="versao in dados.listaFGVersoes" :value="versao.id">{{ versao.descricao }}</option>
          </select>
        </div>
      </div>

      <!-- FG Nível -->
      <div class="row mt-2" v-if="gratificacoes.fg.idFGVersao > 0">
        <label for="selFGValor" class="col-2 offset-1 col-form-label col-form-label-sm">Nível</label>
        <div class="col-5">
          <select id="selFGValor" class="form-select form-select-sm" v-model="gratificacoes.fg.idFGValor" @change="atualizarVencimento">
            <option v-for="nivel in dados.listaFGNiveis" :value="nivel.id">
              {{ nivel.descricao }}: {{ formatarNumero.formatarReais(nivel.valor) }}
            </option>
          </select>
        </div>
      </div>
    </div>
    
    <!-- CD -->
    <div class="col-12">
      <!-- CD Versão -->
      <div class="row">
        <label for="selCDVersao" class="col-1 col-form-label">CD</label>
        <div class="col-7">
          <select id="selCDVersao" class="form-select" v-model="gratificacoes.cd.idCDVersao" @change="atualizarVencimento">
            <option value="0">Não</option>
            <option v-for="versao in dados.listaCDVersoes" :value="versao.id">{{ versao.descricao }}</option>
          </select>
        </div>
      </div>

      <!-- CD Percentual -->
      <div class="row mt-2 gx-4" v-if="gratificacoes.cd.idCDVersao > 0">
        <label class="col-2 offset-1 col-form-label col-form-label-sm">Percentual</label>
        <div class="col-3">
          <div class="row row-cols-2">
            <div class="col">
              <input id="radCDRegime60" type="radio" v-model="gratificacoes.cd.percentual" 
                :value="dadosGratificacoesCDValoresService.PERCENTUAL_60"
                class="form-check-input me-2" @change="atualizarVencimento" />
              <label for="radCDRegime60" class="form-check-label">{{ dadosGratificacoesCDValoresService.PERCENTUAL_60 }}%</label>
            </div>

            <div class="col">
              <input id="radCDRegime100" type="radio" v-model="gratificacoes.cd.percentual" 
                :value="dadosGratificacoesCDValoresService.PERCENTUAL_100"
                class="form-check-input me-2" @change="atualizarVencimento" />
              <label for="radCDRegime100" class="form-check-label">{{ dadosGratificacoesCDValoresService.PERCENTUAL_100 }}%</label>
            </div>
          </div>
        </div>
      </div>

      <!-- CD Nível -->
      <div class="row mt-2" v-if="gratificacoes.cd.idCDVersao > 0">
        <label for="selCDValor" class="col-2 offset-1 col-form-label col-form-label-sm">Nível</label>
        <div class="col-5">
          <select id="selCDValor" class="form-select form-select-sm" v-model="gratificacoes.cd.idCDValor" @change="atualizarVencimento">
            <option v-for="nivel in dados.listaCDNiveis" :value="nivel.id">
              {{ nivel.descricao }}: {{ formatarNumero.formatarReais(dadosGratificacoesCDValoresService.getValorComPercentual(nivel.valor, gratificacoes.cd.percentual)) }}
            </option>
          </select>
        </div>
      </div>
    </div>

  </div>

</template>
