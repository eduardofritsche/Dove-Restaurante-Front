import { Routes } from '@angular/router';

// Imports dos componentes de login e cadastro
import { LoginClienteComponent } from './components/layout/logincliente/logincliente.component';
import { LoginfuncionarioComponent } from './components/layout/loginfuncionario/loginfuncionario.component';
import { CadastroclienteComponent } from './components/layout/cadastrocliente/cadastrocliente.component';

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
  // Rota padrão → login cliente
  { path: '', redirectTo: 'login-cliente', pathMatch: 'full' },

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
      { path: '', redirectTo: 'login-cliente', pathMatch: 'full' },
    ],
  },
  // 🔹 Rota coringa → redireciona
  // { path: '**', redirectTo: 'login-cliente' },
];
