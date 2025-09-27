import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Pedido } from '../../../models/pedido';
import { PedidoService } from '../../../services/pedido.service';
import { CardapioService } from '../../../services/cardapio.service';
import { IngredienteService } from '../../../services/ingrediente.service';
import { Cardapio } from '../../../models/cardapio';
import { Ingrediente } from '../../../models/ingrediente';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-pedidodetails',
  imports: [FormsModule],
  templateUrl: './pedidodetails.component.html',
  styleUrl: './pedidodetails.component.scss',
})
export class PedidodetailsComponent {
  pedido: Pedido = new Pedido();
  ingredientes: Ingrediente[] = [];

  pedidoService = inject(PedidoService);
  cardapioService = inject(CardapioService);
  ingredienteService = inject(IngredienteService);
  authService = inject(AuthService);
  activedRoute = inject(ActivatedRoute);
  router = inject(Router);

  constructor() {
    const id = this.activedRoute.snapshot.params['id'];
    if (id) {
      this.findById(id);
    } else {
      // cadastro novo
      this.prepareNewPedido();
    }
  }

  private prepareNewPedido() {
    // status padrão
    this.pedido.status = 'PREPARANDO';

    // pegar usuário autenticado
    const user = this.authService.getUser();

    if (this.authService.isCliente() && user && 'email' in user) {
      // Garantimos que é Cliente
      this.pedido.cliente = user;
    } else if (this.authService.isFuncionario() && user && 'cpf' in user) {
      // Garantimos que é Funcionário
      this.pedido.funcionario = user;
    }

    // pegar cardápio do dia
    this.cardapioService.getCardapioDoDia().subscribe({
      next: (cardapio: Cardapio) => {
        this.pedido.cardapio = cardapio;

        // ingredientes do cardápio do dia
        this.ingredientes = cardapio.ingredientes ?? [];
      },
      error: (err) => console.error('Erro ao buscar cardápio do dia', err),
    });
  }

  findById(id: number) {
    this.pedidoService.findById(id).subscribe({
      next: (pedido) => {
        this.pedido = pedido;
        this.pedido.ingredientes = this.pedido.ingredientes ?? [];

        if (pedido.cardapio?.id) {
          // Buscar o cardápio completo (com ingredientes)
          this.cardapioService.findById(pedido.cardapio.id).subscribe({
            next: (cardapio) => {
              this.pedido.cardapio = cardapio;
              this.ingredientes = cardapio.ingredientes; // todos os ingredientes
            },
            error: (err) =>
              console.error('Erro ao carregar cardápio do pedido', err),
          });
        }
      },
      error: (erro) => console.error('Erro ao buscar pedido', erro),
    });
  }

  salvar(pedido: Pedido) {
    // validação antes de salvar
    if (!pedido.marmita || !pedido.marmita.trim()) {
      Swal.fire({
        title: 'Atenção!',
        text: 'O pedido precisa ter uma marmita selecionada.',
        icon: 'warning',
        confirmButtonText: 'Ok',
      });
      return;
    }

    if (!pedido.ingredientes || pedido.ingredientes.length === 0) {
      Swal.fire({
        title: 'Atenção!',
        text: 'O pedido precisa ter pelo menos um ingrediente.',
        icon: 'warning',
        confirmButtonText: 'Ok',
      });
      return;
    }

    // hora de início só na criação
    if (!pedido.id) {
      const agora = new Date();
      pedido.hora_inicio = agora.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }); // HH:mm:ss
    }

    const salvarObs = pedido.id
      ? this.pedidoService.update(pedido)
      : this.pedidoService.save(pedido);

    salvarObs.subscribe({
      next: () => {
        Swal.fire({
          title: pedido.id ? 'Editado com Sucesso!' : 'Salvo com Sucesso!',
          icon: 'success',
          confirmButtonText: 'Ok',
        }).then(() => {
          if (this.authService.isFuncionario()) {
            this.router.navigate(['/admin/pedidos']);
          } else if (this.authService.isCliente()) {
            this.router.navigate(['/cliente/pedidos']);
          } else {
            this.router.navigate(['/']);
          }
        });
      },
      error: (erro) => console.error(erro),
    });
  }

  // Função para marcar/desmarcar ingredientes
  toggleIngrediente(ing: Ingrediente, event: any) {
    if (event.target.checked) {
      this.pedido.ingredientes.push(ing);
    } else {
      this.pedido.ingredientes = this.pedido.ingredientes.filter(
        (i) => i.id !== ing.id
      );
    }
  }

  // verificar se já está selecionado
  isChecked(ing: Ingrediente): boolean {
    return this.pedido.ingredientes.some((i) => i.id === ing.id);
  }
}
