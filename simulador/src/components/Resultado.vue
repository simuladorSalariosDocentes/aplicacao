<script setup>

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

        <!--Linha 1-->
        <div class="col-12 fs-4 text">
          <span class="fw-bold">Salário líquido: </span>
          <span>XXX</span>
        </div>

        <!--Linha 2-->
        <div class="col-12 fs-5">
          <span class="fw-bold">Proventos</span>
        </div>

        <!--Linha 3-->
        <div class="col-6">
          <span class="fw-medium">Vencimento básico: </span>
          <span>XXX</span>
        </div>

        <div class="col-6">
          <span class="fw-medium">Retrib. por titulação: </span>
          <span>XXX</span>
        </div>

        <div class="col-6">
          <span class="fw-medium">Vale alimentação: </span>
          <span>XXX</span>
        </div>

        <!--Linha N-->
        <div class="col-12 fs-5">
          <span class="fw-bold">Descontos</span>
        </div>

      </div>

    </div>
  </div>
     
      
</template>
