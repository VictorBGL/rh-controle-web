import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { BaseComponent } from '../base.component';
import { takeUntil } from 'rxjs';
import { HeaderTamanhoService } from './header.service';

@Component({
  selector: 'web-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent extends BaseComponent implements AfterViewInit {
  titulo: string = 'Teste';

  breadcrumbs =[];
  title = '';

  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private route: ActivatedRoute,
    private elRef: ElementRef,
    private service: HeaderTamanhoService
  ) {
    super();
  }

  ngOnInit(){
    
  }

  ngAfterViewInit() {
    // const height = this.elRef.nativeElement.offsetHeight;
    // this.service.setHeight(height);
  }

  signOut() {
    // this.authService.logout();
  }

}
