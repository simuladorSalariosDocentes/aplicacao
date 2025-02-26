import Dados from "@/dados/titulacoes.json";

class DadosTitulacoesService {

    carregarDados() {
        return Dados;        
    }

}

export const dadosTitulacoesService = new DadosTitulacoesService();