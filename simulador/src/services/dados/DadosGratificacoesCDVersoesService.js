import Dados from "@/dados/gratificacoes_cd_versoes.json";

class DadosGratificacoesCDVersoesService {

    carregarDados() {
        const dados = Dados;

        return dados;
    }

}

export const dadosGratificacoesCDVersoesService = new DadosGratificacoesCDVersoesService();