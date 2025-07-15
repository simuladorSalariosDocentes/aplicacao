import Dados from "@/dados/previdencia_regimes.json";

class DadosPrevidenciaRegimesService {

    REGIME_RPC_SIGLA = "RPC";

    carregarRegistro(idRegime) {
        const dados = Dados;

        for(const regime of dados) {
            if(regime.id == idRegime)
                return regime;
        }

        return null; // Retorna null se não encontrar
    }

    carregarDados() {
        const dados = Dados;

        return dados;
    }

}

export const dadosPrevidenciaRegimesService = new DadosPrevidenciaRegimesService();