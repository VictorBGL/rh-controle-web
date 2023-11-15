export interface UsuarioResponseModel {
  id: string;
  nome: string;
  telefone: string;
  email: string;
  acesso: string;
  salarioBruto: number;
  dependentes: number;
  pensao: number;
  ativo: boolean;
}

export interface UsuarioRelatorioResponseModel {
  nome: string;
  telefone: string;
  email: string;
  acesso: string;
  salarioBruto: number;
  dependentes: number;
  pensao: number;
  status: string;
}

export interface UsuarioModel {
  nome: string;
  telefone: string;
  email: string;
  acesso: string;
  salarioBruto: number;
  dependentes: number;
  pensao: number;
  ativo: boolean;
  senha: string;
  senhaConfirmacao: string;
}

export interface UsuarioFilterModel{
  termo: string;
  ativo: boolean;
  direcaoOrdem: string;
  colunaOrdem: string;
}

export interface LoginModel {
    email: string;
    senha: string;
  }
  
  export interface UsuarioTokenModel {
    id: string;
    email: string;
    nome: string;
    claims: UsuarioClaimModel[]
  }
  
  export interface UsuarioClaimModel {
    value: string;
    type: string;
  }
  
  
  export interface UsuarioLoginResponseModel {
    authenticated: boolean;
    accessToken?: string;
    expiresIn: number;
    usuarioToken: UsuarioTokenModel;
  }