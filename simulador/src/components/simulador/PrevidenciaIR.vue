<script setup>
import { computed, onMounted } from 'vue';
import { reactive } from 'vue';

import { dadosAnosBaseService } from '@/services/dados/DadosAnosBaseService';
import { dadosPrevidenciaRegimesService } from '@/services/dados/DadosPrevidenciaRegimesService';
import { dadosPrevidenciaFunprespAliquotasService } from '@/services/dados/DadosPrevidenciaFunprespAliquotasService';


//Emitter 'calcularPrevidenciaIR' declarado ao incluir este componente no Simulador
const emit = defineEmits(['calcularPrevidenciaIR']);

const previdencia = reactive({
    idAnoBase: 0,
    idRegime: 0,
    funpresp: false,
    idFunprespAliquota: 0,
    funprespValor: 0
});

const ir = reactive({
    idAnoBase: 0
});

const dados = reactive({
    listaAnoBase: null,
    listaPrevidenciaRegimes: null,
    listaPrevidenciaFunprespAliquota: null
});

var regimeRPCId = 0;

onMounted(() => {
    dados.listaAnoBase = dadosAnosBaseService.carregarDados();
    if(dados.listaAnoBase.length > 0) {
        const hoje = new Date();
        previdencia.idAnoBase = hoje.getFullYear();
        ir.idAnoBase          = hoje.getFullYear();
    }

    dados.listaPrevidenciaRegimes = dadosPrevidenciaRegimesService.carregarDados();
    if(dados.listaPrevidenciaRegimes.length > 0) {
        let id = null;
        dados.listaPrevidenciaRegimes.forEach(reg => {
            if(reg.sigla == dadosPrevidenciaRegimesService.REGIME_RPC_SIGLA) {
                id = reg.id;
                return;
            }
        });

        if(id) {
            previdencia.idRegime = id;
            regimeRPCId = id;
        }
    }

    dados.listaPrevidenciaFunprespAliquota = dadosPrevidenciaFunprespAliquotasService.carregarDados();
    if(dados.listaPrevidenciaFunprespAliquota.length > 0) 
        previdencia.idFunprespAliquota = dados.listaPrevidenciaFunprespAliquota[0].id;

    atualizarVencimento();
});

function atualizarVencimento(event) {
    if(event && event.target.id == "selAnoBase")
        ir.idAnoBase = previdencia.idAnoBase;

    emit('calcularPrevidenciaIR', previdencia, ir);
}

const isPrevidenciaRegimeRPC = computed(() => {
  return previdencia.idRegime == regimeRPCId ? true : false;
})

</script>

<template>

    <div class="row g-3">

        <!-- Ano Base -->
        <div class="col-10">
            <label for="selAnoBase" class="form-label">Ano Base</label>
            <select id="selAnoBase" class="form-select" v-model="previdencia.idAnoBase" @change="atualizarVencimento">
                <option v-for="ano in dados.listaAnoBase" :value="ano.id">{{ ano.descricao }}</option>
            </select>
        </div>

        <!-- Regime Previdência -->
        <div class="col-10">
            <label for="selRegimePrev" class="form-label">Regime previdenciário</label>
            <select id="selRegimePrev" class="form-select" v-model="previdencia.idRegime" @change="atualizarVencimento">
                <option v-for="reg in dados.listaPrevidenciaRegimes" :value="reg.id">
                    {{ reg.descricao }} ({{ reg.sigla }})
                </option>
            </select>
        </div>

        <!-- Funpresp -->
        <div class="col-12">
            <!-- Funpresp -->
            <div class="row">
                <label for="selFunpresp" class="col-2 col-form-label">Funpresp</label>
                <div class="col-8">
                    <select id="selFunpresp" class="form-select" v-model="previdencia.funpresp" @change="atualizarVencimento">
                        <option :value="false">Não</option>
                        <option :value="true">Sim</option>
                    </select>
                </div>
            </div>

            <!-- Funpresp Alíquota -->
            <div class="row mt-2" v-if="previdencia.funpresp && isPrevidenciaRegimeRPC">
                <span class="col-1"></span>
                <label for="selFunprespAliq" class="col-3 offset-1 col-form-label col-form-label-sm">Alíquota</label>
                <div class="col-4">
                    <select id="selFunprespAliq" class="form-select form-select-sm" v-model="previdencia.idFunprespAliquota" @change="atualizarVencimento">
                        <option v-for="aliq in dados.listaPrevidenciaFunprespAliquota" :value="aliq.id">
                            {{ aliq.descricao }}
                        </option>
                    </select>
                </div>
            </div>

             <!-- Funpresp Valor Extra -->
            <div class="row mt-2" v-if="previdencia.funpresp">
                <span class="col-1"></span>
                <label for="numFunpExtra" class="col-3 offset-1 col-form-label col-form-label-sm">Contribuição extra R$</label>
                <div class="col-4">
                    <input id="numFunpExtra" type="number" class="form-control form-control-sm" step="0.1" min="1"
                            v-model="previdencia.funprespValor" @change="atualizarVencimento">
                </div>
            </div>
        </div>

    </div>


</template>