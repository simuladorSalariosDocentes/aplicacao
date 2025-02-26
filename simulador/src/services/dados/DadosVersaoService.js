import Dados from "@/dados/versao.json";

class DadosVersaoService {

    carregarDados() {
        return Dados;        
    }

}

export const dadosVersaoService = new DadosVersaoService();