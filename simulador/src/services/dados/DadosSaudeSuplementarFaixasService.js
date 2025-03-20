import Dados from "@/dados/saude_suplementar_faixas.json";

class DadosSaudeSuplementarFaixasService {

    carregarDados() {
        const dados = Dados;

        return dados;
    }

}

export const dadosSaudeSuplementarFaixasService = new DadosSaudeSuplementarFaixasService();