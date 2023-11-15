import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { LoginModel, OkModel, OkModelGeneric, UsuarioFilterModel, UsuarioLoginResponseModel, UsuarioModel, UsuarioRelatorioResponseModel, UsuarioResponseModel } from "@pim-final/data";
import { environment } from "../../configuration/environment";
import { Router } from "@angular/router";
import { HttpResponseToResponsePagination, PaginationResponseModel } from "../pagination";

@Injectable()
export class UsuarioService {

  constructor(
    private http: HttpClient,
    private router: Router
  ){}

  private get endpointUrl(){
    return `${environment.apiBase}/usuario`;
  }

  getUsuariosFilter(model: Partial<UsuarioFilterModel> = {}, numeroPagina = 1, tamanhoPagina = 20): Observable<PaginationResponseModel<UsuarioResponseModel>> {
    const params = new HttpParams()
        .set('numeroPagina', numeroPagina.toString())
        .set('tamanhoPagina', tamanhoPagina.toString());

    return this.http
        .post<PaginationResponseModel<UsuarioResponseModel>>(
            `${this.endpointUrl}/filtro`, model,
            {
                params: params,
                observe: 'response',
            }
        )
        .pipe(map(HttpResponseToResponsePagination));
  }

  public exportarUsuario(model: Partial<UsuarioFilterModel> = {}): Observable<OkModel<UsuarioRelatorioResponseModel[]>>{
    return this.http.post<OkModel<UsuarioRelatorioResponseModel[]>>(`${this.endpointUrl}/exportar`, model);
  }

  public salvarUsuario(model: UsuarioModel): Observable<OkModelGeneric>{
    return this.http.post<OkModelGeneric>(`${this.endpointUrl}`, model);
  }

  public editarUsuario(model: UsuarioModel, id: string): Observable<OkModelGeneric>{
    return this.http.put<OkModelGeneric>(`${this.endpointUrl}/${id}`, model);
  }

  public excluirUsuario(id: string): Observable<OkModelGeneric>{
    return this.http.delete<OkModelGeneric>(`${this.endpointUrl}/${id}`);
  }



  public login(model: LoginModel): Observable<UsuarioLoginResponseModel>{
    return this.http.post<UsuarioLoginResponseModel>(`${this.endpointUrl}/login`, model);
  }

  setToken(model: UsuarioLoginResponseModel) {
    localStorage.setItem('token', JSON.stringify(model));
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