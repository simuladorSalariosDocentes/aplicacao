import { calcularProventosService } from "@/services/CalcularProventosService";


class CalcularVencimentoService {

    calcularVencimento(vencimento) {
        
        const vencBasico = calcularProventosService.calcularVencimentoBasico(vencimento);
        const retribTit  = calcularProventosService.calcularRetribuicaoTitutacao(vencimento, vencBasico);
        
        return {
            vencimentoBasico: vencBasico,
            retribTitulacao: retribTit,
            valeAlimentacao: 0
        };        
    }

}

export const calcularVencimentoService = new CalcularVencimentoService();