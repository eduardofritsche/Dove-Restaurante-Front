import { Routes } from '@angular/router';
import { PrincipalComponent } from './components/layout/principal/principal.component';
import { PedidolistComponent } from './components/pedidos/pedidolist/pedidolist.component';
import { PedidodetailsComponent } from './components/pedidos/pedidodetails/pedidodetails.component';
import { LoginComponent } from './components/layout/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: 'admin', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: PrincipalComponent,
    children: [
      { path: 'pedidos', component: PedidolistComponent },
      { path: 'pedidos/:id', component: PedidodetailsComponent },
      { path: 'pedidos/:id/edit', component: PedidodetailsComponent },
      { path: 'pedidos/new', component: PedidodetailsComponent },
    ],
  },
];
