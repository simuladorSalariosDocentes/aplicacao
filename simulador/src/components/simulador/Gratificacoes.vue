<script setup>
import { onMounted } from 'vue';
import { reactive } from 'vue';

import { formatarNumero } from '@/utils/FormatarNumero';
import { dadosAuxAlimentacaoService } from "@/services/dados/DadosAuxAlimentacaoService.js";
import { dadosGratificacoesFCCService } from '@/services/dados/DadosGratificacoesFCCService';
import { dadosGratificacoesFGVersoesService } from '@/services/dados/DadosGratificacoesFGVersoesService';
import { dadosGratificacoesFGValoresService } from '@/services/dados/DadosGratificacoesFGValoresService';

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
      percentual: 60
    }
  }
);

const dados = reactive({
  auxiliosAlimentacao: null,
  listaFCCs: null,
  
  listaFGVersoes: null,
  listaFGNiveis: null,
  
  listaCDSVersoes: null,
  listaCDSNiveis: null
});

onMounted(() => { 
  dados.auxiliosAlimentacao = dadosAuxAlimentacaoService.carregarDados();
  dados.listaFCCs = dadosGratificacoesFCCService.carregarDados();
  dados.listaFGVersoes = dadosGratificacoesFGVersoesService.carregarDados();

  atualizarVencimento();
});

function gerenciarSelecaoFGVersao() {
  dados.listaCDSNiveis = dadosGratificacoesFGValoresService.carregarDados(gratificacoes.fg.idFGVersao);
  if(dados.listaCDSNiveis)
    gratificacoes.fg.idFGValor = dados.listaCDSNiveis[0].id;
}

function atualizarVencimento(event) {
  if(event && event.target.id == "selFGVersao")
    gerenciarSelecaoFGVersao();

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
        <option v-for="fcc in dados.listaFCCs" :value="fcc.id">
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
        <span class="col-1"></span>
        <label for="selFGValor" class="col-2 col-form-label col-form-label-sm">Nível</label>
        <div class="col-5">
          <select id="selFGValor" class="form-select form-select-sm" v-model="gratificacoes.fg.idFGValor" @change="atualizarVencimento">
            <option v-for="valor in dados.listaCDSNiveis" :value="valor.id">{{ valor.descricao }}</option>
          </select>
        </div>
      </div>
    </div>
    
    <!-- CD -->
    <div class="col-9">
      <label for="selCD" class="form-label">CD</label>
      <select id="selCD" class="form-select" v-model="gratificacoes.cd.idCDVersao" @change="atualizarVencimento">
        <option value="0">Não</option>
        <option v-for="alim in dados.auxiliosAlimentacao" :value="alim.id">
          {{ alim.descricao }}: {{ formatarNumero.formatarReais(alim.valor) }}
        </option>
      </select>
    </div>

  </div>

</template>
