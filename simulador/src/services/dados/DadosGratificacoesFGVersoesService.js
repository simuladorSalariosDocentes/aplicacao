import Dados from "@/dados/gratificacoes_fg_versoes.json";

class DadosGratificacoesFGVersoesService {

    carregarDados() {
        const dados = Dados;

        return dados;
    }

}

export const dadosGratificacoesFGVersoesService = new DadosGratificacoesFGVersoesService();