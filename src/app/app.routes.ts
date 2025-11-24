import { Routes } from '@angular/router';

// Imports dos componentes de login e cadastro
import { LoginComponent } from './components/layout/login/login.component';
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
import { FuncionariolistComponent } from './components/funcionario/funcionariolist/funcionariolist.component';
import { FuncionarioDetailsComponent } from './components/funcionario/funcionariodetails/funcionariodetails.component';
import { FuncionarioRelatorioComponent } from './components/funcionario/funcionario-relatorio/funcionario-relatorio.component';
import { IngredientelistComponent } from './components/ingrediente/ingredientelist/ingredientelist.component';
import { IngredienteDetailsComponent } from './components/ingrediente/ingredientedetails/ingredientedetails.component';

export const routes: Routes = [
  // Rota padrão → Landing page
  { path: '', redirectTo: "landing-page", pathMatch: 'full' },

  { path: 'landing-page', component: LandingpageComponent },
  // 🔹 Login / Cadastro
  { path: 'login', component: LoginComponent },
  //{ path: 'login-cliente', component: LoginClienteComponent },
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
      { path: 'admin/funcionarios', component: FuncionariolistComponent },
      { path: 'admin/funcionarios/new', component: FuncionarioDetailsComponent },
      { path: 'admin/funcionarios/:id/edit', component: FuncionarioDetailsComponent },
      { path: 'admin/funcionarios/:id/relatorio', component: FuncionarioRelatorioComponent },
      { path: 'admin/cardapios', component: CardapiolistComponent },
      { path: 'admin/cardapios/new', component: CardapiodetailsComponent },
      { path: 'admin/cardapios/edit/:id', component: CardapiodetailsComponent },
      { path: 'admin/pedidos', component: PedidolistComponent },
      { path: 'admin/pedidos/new', component: PedidodetailsComponent },
      { path: 'admin/pedidos/edit/:id', component: PedidodetailsComponent },
      { path: 'admin/ingredientes', component: IngredientelistComponent },
      { path: 'admin/ingredientes/new', component: IngredienteDetailsComponent },
      { path: 'admin/ingredientes/:id/edit', component: IngredienteDetailsComponent },

      // Redirecionamento padrão dentro do layout
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },
  // 🔹 Rota coringa → redireciona
  // { path: '**', redirectTo: 'login-cliente' },
];
