import { BaseModel } from "./base.model";

export interface ResponseModel<T extends BaseModel> {
  count: number;
  pages: number;
  currentPage: number;
  currentOrder: string;
  list: T[];
}