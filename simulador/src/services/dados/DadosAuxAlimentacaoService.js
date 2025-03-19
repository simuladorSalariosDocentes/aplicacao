import Dados from "@/dados/aux_alimentacao.json";

class DadosAuxAlimentacaoService {

    carregarDados() {
        const dados = Dados;

        return dados;
    }

    carregarRegistro(idAuxilio) {
        const dados = Dados;

        const axilioAlimet = dados.find((auxilio) => auxilio.id == idAuxilio);
        if(axilioAlimet)
            return axilioAlimet;

        return null; // Retorna null se não encontrar
    }

}

export const dadosAuxAlimentacaoService = new DadosAuxAlimentacaoService();