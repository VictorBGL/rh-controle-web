import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeaderTamanhoService {
  public headerHeight: BehaviorSubject<number> = new BehaviorSubject(0);

  setHeight(height: number) {
    this.headerHeight.next(height);
  }

  constructor() {}
}
