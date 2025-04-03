<script setup>
import { onMounted } from 'vue';
import { reactive } from 'vue';

import { formatarNumero } from '@/utils/FormatarNumero';
import { dadosAuxAlimentacaoService } from "@/services/dados/DadosAuxAlimentacaoService.js";

//Emitter 'calcularGratificacoes' declarado ao incluir este componente no Simulador
const emit = defineEmits(['calcularGratificacoes']);

const gratificacoes = reactive(
  {
    idFCC: 0,
    idFG: 0,
    cd: {
      id: 0,
      percentual: 60
    }
  }
);

const dados = reactive({
  auxiliosAlimentacao: null,
  listaFCCs: null,
  listaFGs: null,
  listaCDSs: null
});

onMounted(() => { 
  dados.auxiliosAlimentacao = dadosAuxAlimentacaoService.carregarDados();

  atualizarVencimento();
});

function atualizarVencimento() {
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
        <option v-for="alim in dados.auxiliosAlimentacao" :value="alim.id">
          {{ alim.descricao }}: {{ formatarNumero.formatarReais(alim.valor) }}
        </option>
      </select>
    </div>

    <!-- FG -->
    <div class="col-9">
      <label for="selFG" class="form-label">FG</label>
      <select id="selFG" class="form-select" v-model="gratificacoes.idFG" @change="atualizarVencimento">
        <option value="0">Não</option>
        <option v-for="alim in dados.auxiliosAlimentacao" :value="alim.id">
          {{ alim.descricao }}: {{ formatarNumero.formatarReais(alim.valor) }}
        </option>
      </select>
    </div>

    <!-- CD -->
    <div class="col-9">
      <label for="selCD" class="form-label">CD</label>
      <select id="selCD" class="form-select" v-model="gratificacoes.cd.id" @change="atualizarVencimento">
        <option value="0">Não</option>
        <option v-for="alim in dados.auxiliosAlimentacao" :value="alim.id">
          {{ alim.descricao }}: {{ formatarNumero.formatarReais(alim.valor) }}
        </option>
      </select>
    </div>

  </div>

</template>
