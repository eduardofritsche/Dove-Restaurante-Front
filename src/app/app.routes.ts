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
      { 
        path: 'cliente',
        children: [
          { path: 'pedidos', component: MeuspedidosComponent },
          { path: 'pedidos/new', component: PedidodetailsComponent },
          { path: 'pedidos/edit/:id', component: PedidodetailsComponent },
          { path: 'perfil', component: PerfilclienteComponent },
          { path: 'senha', component: TrocarSenhaComponent },
        ]
      },
      // Área do admin
      { 
        path: 'admin',
        children: [
          { path: 'funcionarios', component: FuncionariolistComponent },
          { path: 'funcionarios/new', component: FuncionarioDetailsComponent },
          { path: 'funcionarios/:id/edit', component: FuncionarioDetailsComponent },
          { path: 'funcionarios/:id/relatorio', component: FuncionarioRelatorioComponent },
        ]
      },
      // Área do funcionario
      { 
        path: 'funcionario',
        children: [
          { path: 'cardapios', component: CardapiolistComponent },
          { path: 'cardapios/new', component: CardapiodetailsComponent },
          { path: 'cardapios/edit/:id', component: CardapiodetailsComponent },
          { path: 'pedidos', component: PedidolistComponent },
          { path: 'pedidos/new', component: PedidodetailsComponent },
          { path: 'pedidos/edit/:id', component: PedidodetailsComponent },
          { path: 'ingredientes', component: IngredientelistComponent },
          { path: 'ingredientes/new', component: IngredienteDetailsComponent },
          { path: 'ingredientes/:id/edit', component: IngredienteDetailsComponent },
        ]
      },

      // Área do funcionário (admin)
      // { path: 'admin/clientes', component: ClientelistComponent },
      
      

      // Redirecionamento padrão dentro do layout
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },
  // 🔹 Rota coringa → redireciona
  // { path: '**', redirectTo: 'login-cliente' },
];
