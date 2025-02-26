import Dados from "@/dados/titulacoes.json";

class DadosTitulacoesService {

    carregarDados() {
        return Dados;        
    }

    carregarRegistro(idRT) {
        const titulacao = Dados.filter((titulacao) => titulacao.id == idRT);

        if(titulacao)
            return titulacao[0];

        return null;
    }

    carregarPercentualRTPorRegime(titulacao, idRegime) {
        const percentuais = titulacao.percentuaisRT.filter(
                                        (percentual) => percentual.idRegime == idRegime);
        if(percentuais)
            return percentuais[0];

        return null;
    }

}

export const dadosTitulacoesService = new DadosTitulacoesService();