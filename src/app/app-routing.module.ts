import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Guards/Auth/auth.guard';
import { WoLoginGuard } from './Guards/WoLogin/wo-login.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./Modules/guest/guest.module').then((m) => m.GuestModule),
  },
  {
    path: 'invitation/:guest_id/:guest_name',
    loadChildren: () =>
      import('./Modules/guest/guest.module').then((m) => m.GuestModule),
  },
  {
    path: 'wo',
    children: [
      {
        path: 'login',
        canActivate: [WoLoginGuard],
        loadChildren: () =>
          import('./Modules/wo/pages/login/login.module').then((m) => m.LoginModule),
      },
      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./Modules/wo/pages/guest-list/guest-list.module').then((m) => m.GuestListModule),
      },
      {
        path: 'scanner',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./Modules/wo/pages/scanner/scanner.module').then((m) => m.ScannerModule),
      },
      {
        path: 'search',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./Modules/wo/pages/manual-search/manual-search.module').then((m) => m.ManualSearchModule),
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
