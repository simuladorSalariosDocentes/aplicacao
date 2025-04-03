<script setup>
import Carreira from '@/components/simulador/Carreira.vue';
import AuxiliosBeneficios from './simulador/AuxiliosBeneficios.vue';
import Gratificacoes from './simulador/Gratificacoes.vue';

//Emitter 'sumarizarSimulador' declarado ao incluir este componente no SimuladorView
const emit = defineEmits(['sumarizarSimulador']);

const simulador = {
  carreira: null,
  auxilios: null,
  gratificacoes: null,
  previdencia: null
}

function setCarreira(carreira) {
  simulador.carreira = carreira;

  emit('sumarizarSimulador', simulador);
}

function setAuxilios(auxilios) {
  simulador.auxilios = auxilios;

  emit('sumarizarSimulador', simulador);
}

function setGratificacoes(gratificacoes) {
  simulador.gratificacoes = gratificacoes;

  emit('sumarizarSimulador', simulador);
}

</script>

<template>
  <nav>
    <div class="nav nav-tabs" id="nav-tab" role="tablist">
      <button class="nav-link active" id="nav-carreira-tab" data-bs-toggle="tab" data-bs-target="#nav-carreira" type="button"
        role="tab" aria-controls="nav-carreira" aria-selected="true">Carreira</button>
      
      <button class="nav-link" id="nav-auxilios-tab" data-bs-toggle="tab" data-bs-target="#nav-auxilios" type="button"
        role="tab" aria-controls="nav-auxilios" aria-selected="false">Auxílos e Benefícios</button>
      
      <button class="nav-link" id="nav-gratificacoes-tab" data-bs-toggle="tab" data-bs-target="#nav-gratificacoes" type="button"
        role="tab" aria-controls="nav-gratificacoes" aria-selected="false">Gratificações</button>
      
      <button class="nav-link" id="nav-previdencia-tab" data-bs-toggle="tab" data-bs-target="#nav-previdencia" type="button"
        role="tab" aria-controls="nav-previdencia" aria-selected="false">Previdência</button>
    </div>
  </nav>

  <div class="tab-content border border-light-subtle p-3" id="nav-tabContent">
    <div class="tab-pane fade show active" id="nav-carreira" role="tabpanel" 
      aria-labelledby="nav-carreira-tab" tabindex="0">
      
      <Carreira @calcularCarreira="setCarreira" />

    </div>

    <div class="tab-pane fade" id="nav-auxilios" role="tabpanel" 
      aria-labelledby="nav-auxilios-tab" tabindex="0">
      <AuxiliosBeneficios @calcularAuxilios="setAuxilios" />
    </div>
    
    <div class="tab-pane fade" id="nav-gratificacoes" role="tabpanel" 
      aria-labelledby="nav-gratificacoes-tab" tabindex="0">
      <Gratificacoes @calcularGratificacoes="setGratificacoes" />
    </div>
    
    <div class="tab-pane fade" id="nav-previdencia" role="tabpanel" 
      aria-labelledby="nav-previdencia-tab" tabindex="0">
      Previdência
    </div>
  </div>


  <!--div style="border: solid;">
    Preencha os dados
  </div-->
</template>
