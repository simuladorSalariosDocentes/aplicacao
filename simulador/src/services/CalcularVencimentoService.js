import { calcularProventosService } from "@/services/CalcularProventosService";


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
        
        let descontos = 0;

        if(vencimento.carreira) {
            vencBasico = calcularProventosService.calcularVencimentoBasico(vencimento);
            retribTit  = calcularProventosService.calcularRetribuicaoTitutacao(vencimento, vencBasico);
        }

        if(vencimento.auxilios) {
            valeAlimen    = calcularProventosService.calcularValeAlimentacao(vencimento);
            saudeSup      = calcularProventosService.calcularSaudeSuplementar(vencimento, (vencBasico + retribTit));
            auxTransp     = calcularProventosService.calcularAuxilioTransporte(vencimento, vencBasico);
            auxPreEscolar = calcularProventosService.calcularAuxilioPreEscolar(vencimento);
        }


        proventos = vencBasico + retribTit + valeAlimen + saudeSup + auxTransp + auxPreEscolar;
        salarioLiquido = proventos - descontos;
        
        return {
            salarioLiquido: salarioLiquido,
            
            proventos: proventos,
            vencimentoBasico: vencBasico,
            retribTitulacao: retribTit,
            valeAlimentacao: valeAlimen,
            saudeSuplementar: saudeSup,
            auxTransporte: auxTransp,
            auxPreEscolar: auxPreEscolar
        };        
    }

}

export const calcularVencimentoService = new CalcularVencimentoService();