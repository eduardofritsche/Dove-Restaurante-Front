import { Routes } from '@angular/router';
import { PrincipalComponent } from './components/layout/principal/principal.component';
import { PedidolistComponent } from './components/pedidos/pedidolist/pedidolist.component';
import { PedidodetailsComponent } from './components/pedidos/pedidodetails/pedidodetails.component';
import { LoginClienteComponent } from './components/layout/logincliente/logincliente.component';
import { LoginfuncionarioComponent } from './components/layout/loginfuncionario/loginfuncionario.component';
import { CardapiolistComponent } from './components/cardapios/cardapiolist/cardapiolist.component';
import { CardapiodetailsComponent } from './components/cardapios/cardapiodetails/cardapiodetails.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login-cliente', pathMatch: 'full' },
  { path: 'login-cliente', component: LoginClienteComponent },
  { path: 'login-funcionario', component: LoginfuncionarioComponent },
  {
    path: 'admin',
    component: PrincipalComponent,
    children: [
      { path: 'pedidos', component: PedidolistComponent },
      { path: 'pedidos/:id', component: PedidodetailsComponent },
      { path: 'pedidos/:id/edit', component: PedidodetailsComponent },
      { path: 'pedidos/new', component: PedidodetailsComponent },
      { path: 'cardapios', component: CardapiolistComponent },
      { path: 'cardapios/:id', component: CardapiodetailsComponent },
      { path: 'cardapios/:id/edit', component: CardapiodetailsComponent },
      { path: 'cardapios/new', component: CardapiodetailsComponent },
    ],
  },
];
