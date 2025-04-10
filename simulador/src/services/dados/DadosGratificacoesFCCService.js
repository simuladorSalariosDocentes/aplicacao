import Dados from "@/dados/gratificacoes_fcc.json";

class DadosGratificacoesFCCService {

    carregarDados() {
        const dados = Dados;

        return dados;
    }

    carregarRegistro(idFCC) {
        const dados = Dados;

        const fcc = dados.find((f) => f.id == idFCC);
        if(fcc)
            return fcc;

        return null; // Retorna null se não encontrar
    }

}

export const dadosGratificacoesFCCService = new DadosGratificacoesFCCService();