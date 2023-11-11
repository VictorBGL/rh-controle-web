export interface UsuarioModel {
    
}

export interface LoginModel {
    usuario: string;
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