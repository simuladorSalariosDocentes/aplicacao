import { dadosClassesService } from "./dados/DadosClassesService";
import { dadosTitulacoesService } from "./dados/DadosTitulacoesService";
import { dadosAuxAlimentacaoService } from "./dados/DadosAuxAlimentacaoService";
import { dadosRegimeService } from "./dados/DadosRegimeService";
import { dadosSaudeSuplementarValoresService } from "./dados/DadosSaudeSuplementarValoresService";


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

    calcularValeAlimentacao(vencimento) {
        const valeAliment = 
            dadosAuxAlimentacaoService.carregarRegistro(vencimento.auxilios.idAuxAlimentacao);

        if(valeAliment) {
            let percentValeAliment = 1;
            if(vencimento.carreira.idRegime == dadosRegimeService.ID_REGIME_20H)
                percentValeAliment = 0.5;

            return valeAliment.valor * percentValeAliment;
        }

        return 0;
    }

    calcularSaudeSuplementar(vencimento, renda) {
        let valor = 0;
        
        const saudeVersao = 
            dadosSaudeSuplementarValoresService.
                carregarRegistrosPorVersao(vencimento.auxilios.saudeSup.idSaudeSupVersao);

        if(saudeVersao) {
            //Titular
            if(vencimento.auxilios.saudeSup.idSaudeSupTit > 0) {
                const faixa = saudeVersao.faixas.find((faixa) => faixa.id == vencimento.auxilios.saudeSup.idSaudeSupTit);
                if(faixa) {
                    const valorFaixaRenda = faixa.valores.find((v) => renda >= v.valorRendaInicial && renda <= v.valorRendaFinal);
                    if(valorFaixaRenda)
                        valor += valorFaixaRenda.valorBeneficio;
                }
            }

            //Dependentes
            if(vencimento.auxilios.saudeSup.dependentes.length > 0) {
                console.log(vencimento.auxilios.saudeSup.dependentes);
                vencimento.auxilios.saudeSup.dependentes.forEach(dep => {
                    const faixa = saudeVersao.faixas.find((faixa) => faixa.id == dep.idSaudeSup);
                    if(faixa) {
                        const valorFaixaRenda = faixa.valores.find((v) => renda >= v.valorRendaInicial && renda <= v.valorRendaFinal);
                        if(valorFaixaRenda)
                            valor += valorFaixaRenda.valorBeneficio;
                    }
                });
            }
        }

        return valor;
    }

}

export const calcularProventosService = new CalcularProventosService();