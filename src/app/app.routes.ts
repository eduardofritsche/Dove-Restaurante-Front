import { Routes } from '@angular/router';
import { PrincipalComponent } from './components/layout/principal/principal.component';
import { PedidolistComponent } from './components/pedidos/pedidolist/pedidolist.component';
import { LoginComponent } from './components/layout/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: 'admin', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: PrincipalComponent,
    children: [{ path: 'pedidos', component: PedidolistComponent }],
  },
];
