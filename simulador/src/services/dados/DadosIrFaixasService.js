import Dados from "@/dados/ir_faixas.json";

class DadosIrFaixasService {

    carregarDados(idAno) {
        const dados = Dados;

        const irFaixa = dados.filter((ir) => ir.idAno == idAno);
        if(irFaixa && irFaixa.length > 0)
            return irFaixa[0].faixas; 
        
        return null;
    }

    /*
    carregarRegistro(idFgValor) {
        const dados = Dados;

        for(const versao of dados) {
            const fg = versao.valores.find((valor) => valor.id == idFgValor);
            if(fg) {
                return fg; // Retorna o primeiro valor de FG encontrado
            }
        }
        return null; // Retorna null se não encontrar
    }
    */

}

export const dadosIrFaixasService = new DadosIrFaixasService();