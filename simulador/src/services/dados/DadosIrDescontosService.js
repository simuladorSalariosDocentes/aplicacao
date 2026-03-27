import Dados from "@/dados/ir_descontos.json";

class DadosIrDescontosService {

    carregarRegistro(idAno) {
        const dados = Dados;

        const irDesconto = dados.filter((ir) => ir.idAno == idAno);
        if(irDesconto && irDesconto.length > 0) 
            return irDesconto[0].descontos; 
        
        return null; //Retorna null se não encontrar
    }

}

export const dadosIrDescontosService = new DadosIrDescontosService();