import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "../../configuration/environment";
import { HttpResponseToResponsePagination, PaginationResponseModel } from "../pagination";
import { Observable, map } from "rxjs";
import { DiaPontoModel, DiaPontoResponseModel, HorarioPontoModel, OkModel, OkModelGeneric, PontoFilterModel, PontoResponseModel } from "@pim-final/data";

@Injectable()
export class CartaoPontoService {

  constructor(
    private http: HttpClient,
    private router: Router
  ){}

  private get endpointUrl(){
    return `${environment.apiBase}/ponto`;
  }

  getPontosFilter(model: Partial<PontoFilterModel> = {}, numeroPagina = 1, tamanhoPagina = 20): Observable<PaginationResponseModel<PontoResponseModel>> {
    const params = new HttpParams()
        .set('numeroPagina', numeroPagina.toString())
        .set('tamanhoPagina', tamanhoPagina.toString());

    return this.http
        .post<PaginationResponseModel<PontoResponseModel>>(
            `${this.endpointUrl}/filtro`, model,
            {
                params: params,
                observe: 'response',
            }
        )
        .pipe(map(HttpResponseToResponsePagination));
  }

  public salvarHorarioPonto(model: HorarioPontoModel): Observable<OkModelGeneric>{
    return this.http.post<OkModelGeneric>(`${this.endpointUrl}/horario`, model);
  }

  public editarHorariosPonto(model: DiaPontoModel): Observable<OkModelGeneric>{
    return this.http.put<OkModelGeneric>(`${this.endpointUrl}/horario-dia`, model);
  }

  public getDiaHorario(diaId: string, usuarioId: string): Observable<OkModel<DiaPontoResponseModel>>{
    return this.http.get<OkModel<DiaPontoResponseModel>>(`${this.endpointUrl}/horarios-dia/${diaId}/usuario/${usuarioId}`);
  }
}