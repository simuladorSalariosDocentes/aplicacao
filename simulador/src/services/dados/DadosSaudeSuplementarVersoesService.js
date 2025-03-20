import Dados from "@/dados/saude_suplementar_versoes.json";

class DadosSaudeSuplementarVersoesService {

    carregarDados() {
        const dados = Dados;

        return dados;
    }

}

export const dadosSaudeSuplementarVersoesService = new DadosSaudeSuplementarVersoesService();