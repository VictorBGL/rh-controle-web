export interface PontoFilterModel{
    usuarioId: string;
    dataInicio: Date;
    dataFim: Date;
}

export interface PontoResponseModel{
    dia: string;
    horarios: string;
    totalHoras: string;
    feriado: boolean;
}

export interface HorarioPontoModel{
    usuarioId: string;
    observacao: string;
    imagem: string;
    endereco: string;
}