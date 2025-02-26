class FormatarNumero {
    
    formatarReais(valor) {
        return valor.toLocaleString('pt-BR', 
                                    {
                                        style: 'currency',
                                        currency: 'BRL',
                                    }
        );
    }
    
}

export const formatarNumero = new FormatarNumero();