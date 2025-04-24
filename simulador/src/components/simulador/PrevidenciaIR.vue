<script setup>
import { onMounted } from 'vue';
import { reactive } from 'vue';

import { dadosAnosBase } from '@/services/dados/DadosAnosBase';


//Emitter 'calcularPrevidenciaIR' declarado ao incluir este componente no Simulador
const emit = defineEmits(['calcularPrevidenciaIR']);

const previdencia = reactive({
    idAnoBase: 0,
    idRegime: 0,
    idFunprespRegime: 0,
    idFunprespAliquota: 0,
    funprespValor: 0
});

const ir = reactive({
    idAnoBase: 0
});

const dados = reactive({
    listaAnoBase: null,
    listaPrevidenciaRegimes: null,
    listaPrevidenciaFunprespRegime: null,
    listaPrevidenciaFunprespAliquota: null
});

onMounted(() => {
    dados.listaAnoBase = dadosAnosBase.carregarDados();
    if(dados.listaAnoBase.length > 0) {
        const hoje = new Date();
        previdencia.idAnoBase = hoje.getFullYear();
        ir.idAnoBase          = hoje.getFullYear();
    }

});

function atualizarVencimento(event) {
    if(event && event.target.id == "selAnoBase")
        ir.idAnoBase = previdencia.idAnoBase;

    emit('calcularPrevidenciaIR', previdencia, ir);
}

</script>

<template>

    <div class="row g-3">

        <!-- FCC -->
        <div class="col-9">
            <label for="selAnoBase" class="form-label">Ano Base</label>
            <select id="selAnoBase" class="form-select" v-model="previdencia.idAnoBase" @change="atualizarVencimento">
                <option value="0">Em branco</option>
                <option v-for="ano in dados.listaAnoBase" :value="ano.id">{{ ano.descricao }}</option>
            </select>
        </div>

    </div>


</template>