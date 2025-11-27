import { Component, inject } from '@angular/core';
import Swal from 'sweetalert2';
import { Pedido } from '../../../models/pedido';
import { PedidoService } from '../../../services/pedido.service';
import { Cardapio } from '../../../models/cardapio';
import { CardapioService } from '../../../services/cardapio.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-meuspedidos',
  imports: [RouterLink],
  templateUrl: './meuspedidos.component.html',
  styleUrl: './meuspedidos.component.scss',
})
export class MeuspedidosComponent {
  pedidoService = inject(PedidoService);
  cardapioService = inject(CardapioService);
  cardapioDoDia: Cardapio | null = null;
  pedidos: Pedido[] = [];

  ngOnInit(): void {
    // this.findPedidosCliente();
    this.carregarCardapioDoDia();
  }

  carregarCardapioDoDia() {
    this.cardapioService.getCardapioDoDia().subscribe({
      next: (cardapio) => {
        console.log(cardapio.id);
        this.cardapioDoDia = cardapio;
      },
      error: (err) => {
        console.error('Erro ao buscar cardápio do dia', err);
        this.cardapioDoDia = null;
      },
    });
  }

  // findPedidosCliente() {
  //   const clienteId = this.authService.getUser()?.id; // id do cliente logado
  //   if (!clienteId) return;

  //   this.pedidoService.findAll().subscribe({
  //     next: (pedidos) => {
  //       // filtra apenas pedidos do cliente e ordena por ID decrescente
  //       this.pedidos = pedidos
  //         .filter((p) => p.cliente?.id === clienteId)
  //         .sort((a, b) => b.id - a.id);
  //     },
  //     error: (erro) => console.error(erro),
  //   });
  // }

  deletar(pedido: Pedido) {
    if (pedido.status.toLowerCase() === 'finalizado') {
      Swal.fire({
        title: 'Não é possível deletar um pedido finalizado',
        icon: 'warning',
        confirmButtonText: 'Ok',
      });
      return;
    }

    Swal.fire({
      title: 'Deseja realmente deletar o pedido?',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: 'Sim',
      denyButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed) {
        this.pedidoService.deleteById(pedido.id).subscribe({
          next: () => {
            Swal.fire({
              title: 'Pedido deletado com sucesso!',
              icon: 'success',
              confirmButtonText: 'Ok',
            });
            // this.findPedidosCliente();
          },
          error: () =>
            Swal.fire({
              title: 'Erro ao deletar pedido',
              icon: 'error',
              confirmButtonText: 'Ok',
            }),
        });
      }
    });
  }

  podeEditar(pedido: Pedido) {
    return pedido.status.toLowerCase() !== 'finalizado';
  }

  getStatusIcon(pedido: Pedido) {
    if (pedido.status.toLowerCase() === 'finalizado') return '✅';
    if (pedido.status.toLowerCase() === 'preparando') return '⏱️';
    return '';
  }
}
