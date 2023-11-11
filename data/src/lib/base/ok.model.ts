export class OkModel<T> {
  sucesso!: boolean;
  resultado!: T;
  erros!: string[];
}

export class OkModelGeneric {
  sucesso!: boolean;
}

export class OkModelList<T> {
  sucesso!: boolean;
  resultado!: T[];
  erros!: string[];
}

export interface BadRequestModel {
  sucesso: boolean;
  erros: any;
}


export interface InternalServerErrorModel {
  resultado?: any;
  erros: any;
}
