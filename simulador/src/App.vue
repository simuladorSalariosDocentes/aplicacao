<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="container mt-1 mb-3">
    <nav class="navbar bg-success navColor" style="">
      <div class="container-fluid">
        
        <a class="navbar-brand">
          <img src="/favicon.png" style="width: 50px;">
          Simulador de salários docentes IFES
        </a>
        
      </div>
    </nav>
  </header>

  <RouterView />

  <!-- Footer -->
  <footer class="container">
    <div class="text-center text-lg-start bg-light text-muted mt-3">
      <!-- Copyright -->
      <div class="text-center p-4">
        <div>
          Desenvolvido como parte do projeto de pesquisa:<br> 
          "Estudos de Frameworks Web Frontend: implementação de uma aplicação para simular os vencimentos mensais dos professores federais"
        </div>
        <a class="text-reset fw-bold" href="https://foz.ifpr.edu.br" target="blank">IFPR (Campus Foz do Iguaçu)</a>
      </div>
    </div>
  </footer>
</template>

<style scoped>

.navColor {
  --bs-bg-opacity: .3;
}

</style>
