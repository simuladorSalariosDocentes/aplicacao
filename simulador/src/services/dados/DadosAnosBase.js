import Dados from "@/dados/anos_base.json";

class DadosAnosBase {

    carregarDados() {
        const dados = Dados;

        return dados;
    }

}

export const dadosAnosBase = new DadosAnosBase();