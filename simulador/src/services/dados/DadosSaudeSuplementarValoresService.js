import Dados from "@/dados/saude_suplementar_valores.json";

class DadosSaudeSuplementarValoresService {

    carregarRegistrosPorVersao(idSaudeVersao) {
        const dados = Dados;

        const saudeVersao = dados.find((sv) => sv.idSaudeVersao == idSaudeVersao);
        if(saudeVersao)
            return saudeVersao;
    }

}

export const dadosSaudeSuplementarValoresService = new DadosSaudeSuplementarValoresService();