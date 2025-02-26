import Dados from "@/dados/classes.json";

class DadosClassesService {

    carregarDados(idVersao) {
        const dados = Dados;

        const classes = dados.filter((classe) => classe.idVersao == idVersao);
        if(classes)
            return classes[0].classes; 
        
        return [];
    }

}

export const dadosClassesService = new DadosClassesService();