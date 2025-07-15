import Dados from "@/dados/previdencia_funpresp_aliquotas.json";

class DadosPrevidenciaFunprespAliquotasService {

    carregarRegistro(id) {
        const dados = Dados;

        for(const aliquota of dados) {
            if(aliquota.id == id)
                return aliquota;
        }
        
        return null; // Retorna null se não encontrar
    }

    carregarDados() {
        const dados = Dados;

        return dados;
    }

}

export const dadosPrevidenciaFunprespAliquotasService = new DadosPrevidenciaFunprespAliquotasService();