export interface PontoFilterModel{
    usuarioId: string;
    dataInicio: Date;
    dataFim: Date;
}

export interface PontoResponseModel{
    diaId: string;
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

export interface DiaPontoResponseModel{
    id: string;
    dia: string;
    diaSemana: string;
    horarios: HorarioPontoResponseModel[];
}

export interface HorarioPontoResponseModel{
    id: string;
    observacao: string;
    imagem: string;
    endereco: string;
    horario: string;
}

export interface DiaPontoModel{
    usuarioId: string;
    diaId: string;
    horarios: HorarioDiaPontoModel[]
}

export interface HorarioDiaPontoModel{
    observacao: string;
    imagem: string;
    endereco: string;
    horario: string;
}

export interface FechamentoFolhaPagamento{
    salarioBruto: number;
    valorINSS: number;
    valorIRRF: number;
    salarioLiquido: number;
    resumoHoras: string;
    descontoHoras: number;
    valorHoraExtra: number;
}