import { HttpResponse } from "@angular/common/http";
import { Pagination } from "./pagination.model";

export class PaginationResponseModel<T> implements Pagination {
  numeroPagina: number;
  tamanhoPagina: number;
  total: number;
  resultado: T[];

  constructor(data: {
    numeroPagina: number;
    tamanhoPagina: number;
    total: number;
    resultado: T[];
  }) {
    this.numeroPagina = data.numeroPagina;
    this.tamanhoPagina = data.tamanhoPagina;
    this.total = data.total;
    this.resultado = data.resultado;
  }
}

/**
 * Faz o mapeamento do modelo de paginação
 * @param  {HttpResponse<ResponsePaginationModel<T>>} response
 * @returns ResponsePaginationModel
 */
 export function HttpResponseToResponsePagination<T>(response: HttpResponse<PaginationResponseModel<T>>): PaginationResponseModel<T> {
  const pagination = JSON.parse(response.headers.get('x-pagination') ?? '{}');
  return new PaginationResponseModel<T>({
    numeroPagina: pagination.NumeroPagina,
    tamanhoPagina: pagination.TotalPaginas,
    total: pagination.Total,
    resultado: response.body?.resultado ?? []
  });
}
