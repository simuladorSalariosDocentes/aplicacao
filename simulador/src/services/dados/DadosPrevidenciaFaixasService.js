import Dados from "@/dados/previdencia_faixas.json";

class DadosPrevidenciaFaixasService {

    carregarRegistro(idAno) {
        const dados = Dados;

        const prevFaixa = dados.filter((prev) => prev.idAno == idAno);
        if(prevFaixa && prevFaixa.length > 0)
            return prevFaixa[0].faixas; 
        
        return null; //Retorna null se não encontrar
    }

}

export const dadosPrevidenciaFaixasService = new DadosPrevidenciaFaixasService();