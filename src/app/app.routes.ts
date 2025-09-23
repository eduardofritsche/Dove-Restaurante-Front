import { Routes } from '@angular/router';

// Imports dos componentes de login e cadastro
import { LoginClienteComponent } from './components/layout/logincliente/logincliente.component';
import { LoginfuncionarioComponent } from './components/layout/loginfuncionario/loginfuncionario.component';
import { CadastroclienteComponent } from './components/layout/cadastrocliente/cadastrocliente.component';
import { LandingpageComponent }  from './components/layout/landingpage/landingpage.component';
import { TrocarSenhaComponent } from './components/cliente/trocarsenha/trocarsenha.component';
// Imports área do cliente
import { MeuspedidosComponent } from './components/cliente/meuspedidos/meuspedidos.component';
import { PerfilclienteComponent } from './components/cliente/perfilcliente/perfilcliente.component';

// Imports área do funcionário (admin)
import { CardapiolistComponent } from './components/cardapios/cardapiolist/cardapiolist.component';
import { PedidolistComponent } from './components/pedidos/pedidolist/pedidolist.component';
import { PrincipalComponent } from './components/layout/principal/principal.component';
import { CardapiodetailsComponent } from './components/cardapios/cardapiodetails/cardapiodetails.component';
import { PedidodetailsComponent } from './components/pedidos/pedidodetails/pedidodetails.component';

export const routes: Routes = [
  // Rota padrão → Landing page
  { path: '', redirectTo: "landing-page", pathMatch: 'full' },

  { path: 'landing-page', component: LandingpageComponent },
  // 🔹 Login / Cadastro
  { path: 'login-cliente', component: LoginClienteComponent },
  { path: 'login-funcionario', component: LoginfuncionarioComponent },
  { path: 'cadastro-cliente', component: CadastroclienteComponent },

  // Layout principal
  {
    path: '',
    component: PrincipalComponent,
    children: [
      // Área do cliente
      { path: 'cliente/pedidos', component: MeuspedidosComponent },
      { path: 'cliente/pedidos/new', component: PedidodetailsComponent },
      { path: 'cliente/pedidos/edit/:id', component: PedidodetailsComponent },
      { path: 'cliente/perfil', component: PerfilclienteComponent },
      { path: 'cliente/senha', component: TrocarSenhaComponent },

      // Área do funcionário (admin)
      // { path: 'admin/clientes', component: ClientelistComponent },
      // { path: 'admin/funcionarios', component: FuncionariolistComponent },
      { path: 'admin/cardapios', component: CardapiolistComponent },
      { path: 'admin/cardapios/new', component: CardapiodetailsComponent },
      { path: 'admin/cardapios/edit/:id', component: CardapiodetailsComponent },
      { path: 'admin/pedidos', component: PedidolistComponent },
      { path: 'admin/pedidos/new', component: PedidodetailsComponent },
      { path: 'admin/pedidos/edit/:id', component: PedidodetailsComponent },
      // { path: 'admin/ingredientes', component: IngredientelistComponent },

      // Redirecionamento padrão dentro do layout
      { path: '', redirectTo: 'login-cliente', pathMatch: 'full' },
    ],
  },
  // 🔹 Rota coringa → redireciona
  // { path: '**', redirectTo: 'login-cliente' },
];
