import Dados from "@/dados/aux_pre_escolar.json";

class DadosAuxPreEscolar {

    carregarDados() {
        const dados = Dados;

        return dados;
    }

    carregarRegistro(idAuxilio) {
        const dados = Dados;

        const axilioPreEscolar = dados.find((auxilio) => auxilio.id == idAuxilio);
        if(axilioPreEscolar)
            return axilioPreEscolar;

        return null; // Retorna null se não encontrar
    }

}

export const dadosAuxPreEscolar = new DadosAuxPreEscolar();