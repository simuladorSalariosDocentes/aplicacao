import { dadosIrFaixasService } from "./dados/DadosIrFaixasService";

class CalcularDescontosService {

    calcularIR(vencimento) {
        /* TODO
        if(vencimento.ir.idAnoBase > 0) {
            const faixasIR = 
                dadosIrFaixasService.carregarRegistro(vencimento.ir.idAnoBase);

            console.log(faixasIR);
        }
        */

        return 0;
    }

}

export const calcularDescontosService = new CalcularDescontosService();