import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { OkModelGeneric, UsuarioLoginResponseModel } from "@pim-final/data";
import { environment } from "../../configuration/environment";
import { Router } from "@angular/router";

@Injectable()
export class UsuarioService {

  constructor(
    private http: HttpClient,
    private router: Router
  ){}

  private get endpointUrl(){
    return `${environment.apiBase}/usuario`;
  }

  public excluirFuncionario(id: string): Observable<OkModelGeneric>{
    return this.http.delete<OkModelGeneric>(`${this.endpointUrl}/${id}`);
  }


  public getToken(): UsuarioLoginResponseModel | null {
    const token = localStorage.getItem('token');
    if (token !== null) {
      return JSON.parse(token) as UsuarioLoginResponseModel;
    } else {
      return null;
    }
  }

  public logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('url');
    localStorage.removeItem('perfil');
    this.router.navigate(['./acesso/login']);
  }
}