<script setup>
import Simulador from '../components/Simulador.vue'
import Resultado from '@/components/Resultado.vue';
</script>

<template>
  <main class="container">
    <div class="row">

      <div class="col-7">
        <Simulador />
      </div>

      <div class="col-5">
        <Resultado />
      </div>

    </div>

    
  </main>
</template>
