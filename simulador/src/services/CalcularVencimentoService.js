import { calcularProventosService } from "@/services/CalcularProventosService";
import { calcularDescontosService } from "@/services/CalcularDescontosService";
import { dadosGratificacoesCDValoresService } from "./dados/DadosGratificacoesCDValoresService";


class CalcularVencimentoService {

    calcularVencimento(vencimento) {
        let salarioLiquido = 0;
        
        let proventos = 0;
        let vencBasico = 0;
        let retribTit = 0;
        let valeAlimen = 0;
        let saudeSup = 0;
        let auxTransp = 0;
        let auxPreEscolar = 0;
        let gratificFCC = 0;
        let gratificFG = 0;
        let gratificCD = 0;
        let percentualCD = 0;
        
        let descontos = 0;
        let previdencia = 0;
        let funpresp = 0;
        let ir = 0;          

        if(vencimento.gratificacoes) {
            gratificFCC  = calcularProventosService.calcularGratificacaoFCC(vencimento);
            gratificFG   = calcularProventosService.calcularGratificacaoFG(vencimento);
            gratificCD   = calcularProventosService.calcularGratificacaoCD(vencimento);
            percentualCD = vencimento.gratificacoes.cd.percentual;
        }

        if(vencimento.carreira) {
            if(percentualCD == dadosGratificacoesCDValoresService.PERCENTUAL_100) {
                //Quando a CD é 100%, não considera-se o vencimento do cargo
                vencBasico = gratificCD;
            } else {
                vencBasico = calcularProventosService.calcularVencimentoBasico(vencimento);
                retribTit  = calcularProventosService.calcularRetribuicaoTitutacao(vencimento, vencBasico);
            }
        }

        if(vencimento.auxilios) {
            valeAlimen    = calcularProventosService.calcularValeAlimentacao(vencimento);
            saudeSup      = calcularProventosService.calcularSaudeSuplementar(vencimento, (vencBasico + retribTit));
            auxTransp     = calcularProventosService.calcularAuxilioTransporte(vencimento, vencBasico);
            auxPreEscolar = calcularProventosService.calcularAuxilioPreEscolar(vencimento);
        }

        if(percentualCD == dadosGratificacoesCDValoresService.PERCENTUAL_100) {
            //Quando a CD é 100%, não considera-se o vencimento do cargo
            //Após calcular os auxílios, deve-se zerar o vencimeno básico, pois será o valor da CD
            vencBasico = 0;
        }

        if(vencimento.previdencia) {
            let valorBaseCalculoPrev = vencBasico + retribTit; 
            
            //Caso o CD for 100%, inclui o CD na base de cálculo da previdência
            if(percentualCD == dadosGratificacoesCDValoresService.PERCENTUAL_100)
                valorBaseCalculoPrev += gratificCD;

            //Caso as parcelas remuneratórias estejam incluída, adicona-se seus valores na base de cálculo
            else if(vencimento.previdencia.parcelaRemun)
                valorBaseCalculoPrev += gratificFCC + gratificCD + gratificFG;

            previdencia = calcularDescontosService.calcularPrevidencia(vencimento.previdencia, valorBaseCalculoPrev);

            funpresp = calcularDescontosService.calcularFunpresp(vencimento.previdencia, valorBaseCalculoPrev);
        }


        if(vencimento.ir) {
            let valorBaseCalculoIR = 5909.42;
            //let valorBaseCalculoIR = vencBasico + retribTit + gratificFCC + gratificFG + gratificCD
            //                            - previdencia - funpresp; 
            ir = calcularDescontosService.calcularIR(vencimento.ir, valorBaseCalculoIR);
        }
        

        proventos = vencBasico + retribTit + 
                    valeAlimen + saudeSup + auxTransp + auxPreEscolar +
                    gratificFCC + gratificFG + gratificCD;

        descontos = previdencia + funpresp + ir;
        
        salarioLiquido = proventos - descontos;
        
        return {
            salarioLiquido: salarioLiquido,
            
            proventos: proventos,
            vencimentoBasico: vencBasico,
            retribTitulacao: retribTit,
            valeAlimentacao: valeAlimen,
            saudeSuplementar: saudeSup,
            auxTransporte: auxTransp,
            auxPreEscolar: auxPreEscolar,
            gratificacaoFCC: gratificFCC,
            gratificacaoFG: gratificFG,
            gratificacaoCD: gratificCD,

            descontos: descontos,
            descontosPrevidencia: previdencia,
            descontosFunpresp: funpresp,
            descontoIR: ir
        };        
    }

}

export const calcularVencimentoService = new CalcularVencimentoService();