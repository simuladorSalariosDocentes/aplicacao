import { calcularProventosService } from "@/services/CalcularProventosService";


class CalcularVencimentoService {

    calcularVencimento(vencimento) {
        
        let salarioLiquido = 0;
        let vencBasico = 0;
        let retribTit = 0;
        let valeAlimen = 0;

        if(vencimento.carreira) {
            vencBasico = calcularProventosService.calcularVencimentoBasico(vencimento);
            retribTit  = calcularProventosService.calcularRetribuicaoTitutacao(vencimento, vencBasico);
        }

        if(vencimento.auxilios) {
            valeAlimen = calcularProventosService.calcularValeAlimentacao(vencimento);
        }

        salarioLiquido = vencBasico + retribTit + valeAlimen;
        
        return {
            salarioLiquido: salarioLiquido,
            vencimentoBasico: vencBasico,
            retribTitulacao: retribTit,
            valeAlimentacao: valeAlimen
        };        
    }

}

export const calcularVencimentoService = new CalcularVencimentoService();