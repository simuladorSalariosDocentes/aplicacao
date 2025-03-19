import Dados from "@/dados/regimes.json";

class DadosRegimeService {

    ID_REGIME_20H = 3;

    carregarDados() {
        return Dados;        
    }

}

export const dadosRegimeService = new DadosRegimeService();