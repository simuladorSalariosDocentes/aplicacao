import Dados from "@/dados/anos_base.json";

class DadosAnosBaseService {

    carregarRegistro(idAnoBase) {
        const dados = Dados;

        for(const anoBase of dados) {
            if(anoBase.id == idAnoBase)
                return anoBase;
        }
        
        return null; // Retorna null se não encontrar
    }

    carregarDados() {
        const dados = Dados;

        return dados;
    }

}

export const dadosAnosBaseService = new DadosAnosBaseService();