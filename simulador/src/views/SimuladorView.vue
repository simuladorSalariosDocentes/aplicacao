<script setup>
import { onMounted, ref } from 'vue';
import Simulador from '../components/Simulador.vue'
import Vencimento from '@/components/Vencimento.vue';

const compVencimento = ref(null); // Referência ao componente Vencimento

/* Atributos do objeto simulador.vencimento
{
  carreira: null,
  auxilios: null,
  gratificacoes: null,
  previdencia: null
}
*/
const simulador = {
  vencimento: null
};

function setVencimento(vencimento) {
  simulador.vencimento = vencimento;
  
  compVencimento.value.calcularVencimento(simulador.vencimento);
}

onMounted(() => {
  compVencimento.value.calcularVencimento(simulador.vencimento);
});

</script>

<template>
  <main class="container">
    <div class="row">

      <div class="col-7">
        <Simulador @sumarizarSimulador="setVencimento" />
      </div>

      <div class="col-5">
        <Vencimento ref="compVencimento"  />
      </div>

    </div>

    
  </main>
</template>
