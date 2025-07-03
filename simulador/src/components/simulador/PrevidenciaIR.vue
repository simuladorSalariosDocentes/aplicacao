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

    atualizarVencimento();
});

function atualizarVencimento(event) {
    if(event && event.target.id == "selAnoBase")
        ir.idAnoBase = previdencia.idAnoBase;

    emit('calcularPrevidenciaIR', previdencia, ir);
}

</script>

<template>

    <div class="row g-3">

        <!-- Ano Base -->
        <div class="col-9">
            <label for="selAnoBase" class="form-label">Ano Base</label>
            <select id="selAnoBase" class="form-select" v-model="previdencia.idAnoBase" @change="atualizarVencimento">
                <option v-for="ano in dados.listaAnoBase" :value="ano.id">{{ ano.descricao }}</option>
            </select>
        </div>

        <!-- Regime Previdência -->
        <div class="col-9">
            <label for="selRegimePrev" class="form-label">Regime previdenciário</label>
            <select id="selRegimePrev" class="form-select" v-model="previdencia.idRegime" @change="atualizarVencimento">
                <option v-for="ano in dados.listaAnoBase" :value="ano.id">{{ ano.descricao }}</option>
            </select>
        </div>

        <!-- Funpresp -->
        <div class="col-12">
            <!-- Funpresp -->
            <div class="row">
                <label for="selFunpresp" class="col-3 col-form-label">Funpresp</label>
                <div class="col-7">
                    <select id="selFunpresp" class="form-select" v-model="previdencia.idFunprespRegime" @change="atualizarVencimento">
                        <option value="0">Não</option>
                        <option v-for="ano in dados.listaAnoBase" :value="ano.id">{{ ano.descricao }}</option>
                    </select>
                </div>
            </div>

            <!-- FG Alíquota -->
            <div class="row mt-2" v-if="previdencia.idFunprespRegime > 0">
                <span class="col-1"></span>
                <label for="selFunprespAliq" class="col-2 offset-1 col-form-label col-form-label-sm">Alíquota</label>
                <div class="col-4">
                    <select id="selFunprespAliq" class="form-select form-select-sm" v-model="previdencia.idFunprespAliquota" @change="atualizarVencimento">
                        <option v-for="ano in dados.listaAnoBase" :value="ano.id">{{ ano.descricao }}</option>
                    </select>
                </div>
            </div>
        </div>

    </div>


</template>