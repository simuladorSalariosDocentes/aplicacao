import Dados from "@/dados/classes.json";

class DadosClassesService {

    carregarDados(idVersao) {
        const dados = Dados;

        const classes = dados.filter((classe) => classe.idVersao == idVersao);
        if(classes)
            return classes[0].classes; 
        
        return [];
    }

    carregarRegistro(idClasse) {
        const dados = Dados;

        for(const versao of dados) {
            const classe = versao.classes.find((classe) => classe.id == idClasse);
            if(classe) {
                return classe; // Retorna a primeira classe encontrada
            }
        }
        return null; // Retorna null se não encontrar
    }

    carregarVencimentoPorRegime(classe, idRegime) {
        const vencimentos = classe.vencimentosBasicos.filter(
                                        (vencimento) => vencimento.idRegime == idRegime);
        if(vencimentos)
            return vencimentos[0];

        return null;
    }

}

export const dadosClassesService = new DadosClassesService();