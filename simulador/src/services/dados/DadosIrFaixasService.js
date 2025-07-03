import Dados from "@/dados/ir_faixas.json";

class DadosIrFaixasService {

    carregarRegistro(idAno) {
        const dados = Dados;

        const irFaixa = dados.filter((ir) => ir.idAno == idAno);
        if(irFaixa && irFaixa.length > 0)
            return irFaixa[0].faixas; 
        
        return null; //Retorna null se não encontrar
    }

}

export const dadosIrFaixasService = new DadosIrFaixasService();