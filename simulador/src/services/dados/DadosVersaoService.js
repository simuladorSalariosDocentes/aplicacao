import Dados from "@/dados/versoes.json";

class DadosVersaoService {

    carregarDados() {
        return Dados;       
    }

}

export const dadosVersaoService = new DadosVersaoService();