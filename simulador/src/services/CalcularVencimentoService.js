import { calcularProventosService } from "@/services/CalcularProventosService";


class CalcularVencimentoService {

    calcularVencimento(vencimento) {
        
        let salarioLiquido = 0;
        let vencBasico = 0;
        let retribTit = 0;
        let valeAlimen = 0;
        let saudeSup = 0;

        if(vencimento.carreira) {
            vencBasico = calcularProventosService.calcularVencimentoBasico(vencimento);
            retribTit  = calcularProventosService.calcularRetribuicaoTitutacao(vencimento, vencBasico);
        }

        if(vencimento.auxilios) {
            valeAlimen = calcularProventosService.calcularValeAlimentacao(vencimento);
            saudeSup   = calcularProventosService.calcularSaudeSuplementar(vencimento, (vencBasico + retribTit));
        }

        salarioLiquido = vencBasico + retribTit + valeAlimen + saudeSup;
        
        return {
            salarioLiquido: salarioLiquido,
            vencimentoBasico: vencBasico,
            retribTitulacao: retribTit,
            valeAlimentacao: valeAlimen,
            saudeSuplementar: saudeSup,
            auxTransporte: 10,
            auxCreche: 10
        };        
    }

}

export const calcularVencimentoService = new CalcularVencimentoService();