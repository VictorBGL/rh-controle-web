import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: '',
  //   loadChildren: () => import('./public/public.module').then(x => x.PublicModule)
  // },
  {
    path: 'authenticated',
    loadChildren: () => import('./authenticated/authenticated.module').then(x => x.AuthenticatedModule),
    // canActivate: [AdminGuard]
  },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
export class AppRouting{ }
