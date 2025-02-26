import { dadosClassesService } from "./dados/DadosClassesService";
import { dadosTitulacoesService } from "./dados/DadosTitulacoesService";

class CalcularProventosService {

    calcularVencimentoBasico(vencimento) {
        const classe = 
            dadosClassesService.carregarRegistro(vencimento.carreira.idClasse);
        
        if(classe) {
            const valorVencimento = dadosClassesService.carregarVencimentoPorRegime(
                                                    classe, vencimento.carreira.idRegime);
            if(valorVencimento)
                return valorVencimento.valor;
        }

        return 0;
    }

    calcularRetribuicaoTitutacao(vencimento, valorVencBasico) {
        const titulacao = 
            dadosTitulacoesService.carregarRegistro(vencimento.carreira.idRT);

        if(titulacao) {
            const percentualRT = dadosTitulacoesService.carregarPercentualRTPorRegime(
                                                    titulacao, vencimento.carreira.idRegime);

            if(percentualRT)
                return valorVencBasico * (percentualRT.percentual / 100);
        }

        return 0;
    }

}

export const calcularProventosService = new CalcularProventosService();