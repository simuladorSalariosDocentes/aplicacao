import Dados from "@/dados/regime.json";

class DadosRegimeService {

    carregarDados() {
        return Dados;        
    }

}

export const dadosRegimeService = new DadosRegimeService();