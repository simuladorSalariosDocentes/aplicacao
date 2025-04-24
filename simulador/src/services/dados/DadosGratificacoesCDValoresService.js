import Dados from "@/dados/gratificacoes_cd_valores.json";

class DadosGratificacoesCDValoresService {

    PERCENTUAL_60 = 60;
    PERCENTUAL_100 = 100;

    carregarDados(idCDVersao) {
        const dados = Dados;

        const versaoCD = dados.filter((cd) => cd.idCDVersao == idCDVersao);
        if(versaoCD && versaoCD.length > 0)
            return versaoCD[0].valores; 
        
        return null;
    }

    carregarRegistro(idCDValor) {
        const dados = Dados;

        for(const versao of dados) {
            const cd = versao.valores.find((valor) => valor.id == idCDValor);
            if(cd)
                return cd; // Retorna o primeiro valor de CD encontrado
        }
        return null; // Retorna null se não encontrar
    }

    getValorComPercentual(valor, percentual) {
        return valor * (percentual / 100);
    }

}

export const dadosGratificacoesCDValoresService = new DadosGratificacoesCDValoresService();