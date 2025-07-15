import { dadosIrFaixasService } from "./dados/DadosIrFaixasService";
import { dadosPrevidenciaFaixasService } from "./dados/DadosPrevidenciaFaixasService";
import { dadosPrevidenciaRegimesService } from "./dados/DadosPrevidenciaRegimesService";
import { dadosAnosBaseService } from "./dados/DadosAnosBaseService";
import { dadosPrevidenciaFunprespAliquotasService } from "./dados/DadosPrevidenciaFunprespAliquotasService";

class CalcularDescontosService {

    calcularPrevidencia(previdencia, valorBaseCalculo) {
        let totalPrevidencia = 0;

        if(previdencia.idAnoBase > 0 && previdencia.idRegime > 0) {
            
            //Se o regime for RPC, a base de cálculo é o teto da previdência
            if(this.#isRegimePrevidenciaRPC(previdencia.idRegime)) {
                const valorTeto = this.#getValorTetoPrevidencia(previdencia.idAnoBase);
                
                if(valorTeto && valorBaseCalculo > valorTeto)
                    valorBaseCalculo = valorTeto;
            }

            //Calcula o desconto previdencia baseado nas faixas
            const faixasPrev = 
                dadosPrevidenciaFaixasService.carregarRegistro(previdencia.idAnoBase);

            if(faixasPrev) {
                let ultimaFaixa = false;
                faixasPrev.forEach(faixa => {
                    
                    if(! ultimaFaixa) {
                        let valorFaixa = 0;
                        if(valorBaseCalculo > faixa.valorFinal) {
                            valorFaixa = faixa.valorFinal - faixa.valorInicial;

                        } else {
                            valorFaixa = valorBaseCalculo - faixa.valorInicial;

                            ultimaFaixa = true;
                        }

                        const totalFaixa = (valorFaixa * faixa.aliquota) / 100;
                        totalPrevidencia += totalFaixa;
                    }
                });
            }
        }

        return totalPrevidencia;
    }

    calcularFunpresp(previdencia, valorBaseCalculo) {
        let totalFunpresp = 0;

        if(previdencia.funpresp) {
            
            //Se o regime for RPC, calcula o valor da funpresp de acordo com a Alíquota
            if(previdencia.idAnoBase > 0 && previdencia.idRegime > 0 && previdencia.idFunprespAliquota > 0) {
                let valorBaseFunpresp = 0;
                
                if(this.#isRegimePrevidenciaRPC(previdencia.idRegime)) {
                    const valorTeto = this.#getValorTetoPrevidencia(previdencia.idAnoBase);
                    
                    if(valorTeto && valorTeto < valorBaseCalculo)
                        valorBaseFunpresp = valorBaseCalculo - valorTeto;

                    if(valorBaseFunpresp > 0) {
                        const aliqFunp = dadosPrevidenciaFunprespAliquotasService.carregarRegistro(previdencia.idFunprespAliquota);
                        
                        if(aliqFunp)
                            totalFunpresp += (valorBaseFunpresp * aliqFunp.aliquota) / 100;
                    }
                }
            }

            //Contribuição extra
            if(previdencia.funprespValor > 0)
                totalFunpresp += previdencia.funprespValor;
        }

        return totalFunpresp;
    }
    
    calcularIR(ir, valorBaseCalculo) {
        let totalIR = 0;
        
        if(ir.idAnoBase > 0) {
            const faixasIR = 
                dadosIrFaixasService.carregarRegistro(ir.idAnoBase);

            if(faixasIR) {
                let ultimaFaixa = false;
                faixasIR.forEach(faixa => {
                    
                    if(! ultimaFaixa) {
                        let valorFaixa = 0;
                        if(valorBaseCalculo > faixa.valorFinal) {
                            valorFaixa = faixa.valorFinal - faixa.valorInicial;

                        } else {
                            valorFaixa = valorBaseCalculo - faixa.valorInicial;

                            ultimaFaixa = true;
                        }

                        totalIR += (valorFaixa * faixa.aliquota) / 100;
                    }
                });

            }
        }

        return totalIR;
    }

    //# para declarar o método como privado
    #isRegimePrevidenciaRPC(idRegime) {
        const regimePrev = dadosPrevidenciaRegimesService.carregarRegistro(idRegime);

        if(regimePrev && regimePrev.sigla == dadosPrevidenciaRegimesService.REGIME_RPC_SIGLA)
            return true;

        return false;
    }

    //# para declarar o método como privado
    #getValorTetoPrevidencia(idAnoBase) {
        const anoBase = dadosAnosBaseService.carregarRegistro(idAnoBase);
                
        if(anoBase)
            return anoBase.valorTetoPrevidencia;

        return null;
    }

}

export const calcularDescontosService = new CalcularDescontosService();