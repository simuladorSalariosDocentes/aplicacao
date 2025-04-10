import Dados from "@/dados/gratificacoes_fg_valores.json";

class DadosGratificacoesFGValoresService {

    carregarDados(idFGVersao) {
        const dados = Dados;

        const versaoFG = dados.filter((fg) => fg.idFGVersao == idFGVersao);
        if(versaoFG && versaoFG.length > 0)
            return versaoFG[0].valores; 
        
        return null;
    }

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

}

export const dadosGratificacoesFGValoresService = new DadosGratificacoesFGValoresService();