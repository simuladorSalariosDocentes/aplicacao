import { dadosIrFaixasService } from "./dados/DadosIrFaixasService";

class CalcularDescontosService {

    calcularIR(vencimento, valorBaseCalculo) {
        let totalIR = 0;
        
        if(vencimento.ir.idAnoBase > 0) {
            const faixasIR = 
                dadosIrFaixasService.carregarRegistro(vencimento.ir.idAnoBase);

            if(faixasIR) {
                let valorIniFaixaAnterior = 0;
                let ultimaFaixa = false;
                faixasIR.forEach(faixa => {
                    
                    if(! ultimaFaixa) {
                        let valorFaixa = 0;
                        if(valorBaseCalculo > faixa.valorFinal) {
                            valorFaixa = faixa.valorFinal - faixa.valorInicial;

                            valorIniFaixaAnterior = faixa.valorInicial;
                        } else {
                            valorFaixa = valorBaseCalculo - valorIniFaixaAnterior;

                            ultimaFaixa = true;
                        }

                        totalIR += (valorFaixa * faixa.aliquota) / 100;
                    }
                });

            }
        }

        return totalIR;
    }

}

export const calcularDescontosService = new CalcularDescontosService();