<script setup>
import { onMounted, reactive } from 'vue';
import { formatarNumero } from '@/utils/FormatarNumero';
import { calcularVencimentoService } from '@/services/CalcularVencimentoService';

const simulador = reactive(
  {
    vencimento: { 
      carreira: null,
      auxilios: null,
      gratificacoes: null,
      previdencia: null
    }
  }
);

const valoresVencimento = reactive(
  {
    valores: {
      salarioLiquido: 0, 

      proventos: 0,
      vencimentoBasico: 0,
      retribTitulacao: 0,
      valeAlimentacao: 0,
      saudeSuplementar: 0,
      auxTransporte: 0,
      auxPreEscolar: 0,
      gratificacaoFCC: 0,
      gratificacaoFG: 0,
      gratificacaoCD: 0,

      descontos: 0,
      descontoIR: 0


    }
  }
);

function calcularVencimento(vencimento) {
  simulador.vencimento = vencimento;

  valoresVencimento.valores = 
    calcularVencimentoService.calcularVencimento(simulador.vencimento);
  //console.log(valoresVencimento);
}

defineExpose({
  calcularVencimento
});

</script>

<template>
  <nav>
    <div class="nav nav-tabs" id="nav-tab" role="tablist">
      <button class="nav-link active" id="nav-vencimento-tab" data-bs-toggle="tab" data-bs-target="#nav-vencimento" type="button"
        role="tab" aria-controls="nav-vencimento" aria-selected="true">Vencimento</button>
    </div>
  </nav>
  
  <div class="tab-content border border-light-subtle p-3" id="nav-tabContent">
    <div class="tab-pane fade show active" id="nav-vencimento" role="tabpanel" 
      aria-labelledby="nav-vencimento-tab" tabindex="0">
      
      <div class="row g-3">

        <div class="col-12 fs-4 text">
          <span class="fw-bold">Salário líquido: </span>
          <span>{{ formatarNumero.formatarReais(valoresVencimento.valores.salarioLiquido) }}</span>
        </div>

        <!-- Proventos -->
        <div class="col-12 fs-5">
          <span class="fw-bold">Proventos: </span>
          <span>{{ formatarNumero.formatarReais(valoresVencimento.valores.proventos) }}</span>
        </div>

        <div class="col-12" v-if="valoresVencimento.valores.vencimentoBasico > 0">
          <span class="fw-medium">Vencimento básico: </span>
          <span>{{ formatarNumero.formatarReais(valoresVencimento.valores.vencimentoBasico) }}</span>
        </div>

        <div class="col-12" v-if="valoresVencimento.valores.retribTitulacao > 0">
          <span class="fw-medium">Retrib. por titulação: </span>
          <span>{{ formatarNumero.formatarReais(valoresVencimento.valores.retribTitulacao) }}</span>
        </div>

        <div class="col-12" v-if="valoresVencimento.valores.valeAlimentacao > 0">
          <span class="fw-medium">Vale alimentação: </span>
          <span>{{ formatarNumero.formatarReais(valoresVencimento.valores.valeAlimentacao) }}</span>
        </div>

        <div class="col-12" v-if="valoresVencimento.valores.saudeSuplementar > 0">
          <span class="fw-medium">Saúde suplementar: </span>
          <span>{{ formatarNumero.formatarReais(valoresVencimento.valores.saudeSuplementar) }}</span>
        </div>

        <div class="col-12" v-if="valoresVencimento.valores.auxTransporte > 0">
          <span class="fw-medium">Auxílio transporte: </span>
          <span>{{ formatarNumero.formatarReais(valoresVencimento.valores.auxTransporte) }}</span>
        </div>

        <div class="col-12" v-if="valoresVencimento.valores.auxPreEscolar > 0">
          <span class="fw-medium">Auxílio pré-escolar: </span>
          <span>{{ formatarNumero.formatarReais(valoresVencimento.valores.auxPreEscolar) }}</span>
        </div>

        <div class="col-12" v-if="valoresVencimento.valores.gratificacaoFCC > 0">
          <span class="fw-medium">FCC: </span>
          <span>{{ formatarNumero.formatarReais(valoresVencimento.valores.gratificacaoFCC) }}</span>
        </div>

        <div class="col-12" v-if="valoresVencimento.valores.gratificacaoFG > 0">
          <span class="fw-medium">FG: </span>
          <span>{{ formatarNumero.formatarReais(valoresVencimento.valores.gratificacaoFG) }}</span>
        </div>

        <div class="col-12" v-if="valoresVencimento.valores.gratificacaoCD > 0">
          <span class="fw-medium">CD: </span>
          <span>{{ formatarNumero.formatarReais(valoresVencimento.valores.gratificacaoCD) }}</span>
        </div>

        <!-- Descontos -->
        <div class="col-12 fs-5">
          <span class="fw-bold">Descontos: </span>
          <span>{{ formatarNumero.formatarReais(valoresVencimento.valores.descontos) }}</span>
        </div>

        <div class="col-12" v-if="valoresVencimento.valores.descontoIR > 0">
          <span class="fw-medium">Imposto de renda: </span>
          <span>{{ formatarNumero.formatarReais(valoresVencimento.valores.descontoIR) }}</span>
        </div>

      </div>

    </div>
  </div>
     
      
</template>
