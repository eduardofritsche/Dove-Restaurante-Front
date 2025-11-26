import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { PedidoService } from '../../../services/pedido.service';
import { CardapioService } from '../../../services/cardapio.service';
import { Pedido } from '../../../models/pedido';
import { Cardapio } from '../../../models/cardapio';
@Component({
  selector: 'app-pedidolist',
  imports: [RouterLink],
  templateUrl: './pedidolist.component.html',
  styleUrl: './pedidolist.component.scss',
})
export class PedidolistComponent {
  pedidoService = inject(PedidoService);
  cardapioService = inject(CardapioService);
  pedidos: Pedido[] = [];
  cardapioDoDia: Cardapio | null = null;

  ngOnInit(): void {
    this.findAll();
    this.carregarCardapioDoDia();
  }

  carregarCardapioDoDia() {
    this.cardapioService.getCardapioDoDia().subscribe({
      next: (cardapio) => {
        this.cardapioDoDia = cardapio;
      },
      error: (err) => {
        console.error('Erro ao buscar cardápio do dia', err);
        this.cardapioDoDia = null;
      },
    });
  }

  findAll() {
    this.pedidoService.findAll().subscribe({
      next: (pedidos) => {
        this.pedidos = pedidos.sort((a, b) => b.id - a.id);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  deletar(pedido: Pedido) {
    if (pedido.status === 'FINALIZADO') return;

    Swal.fire({
      title: 'Você tem certeza que deseja deletar o pedido?',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: 'Sim',
      denyButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed) {
        this.pedidoService.deleteById(pedido.id).subscribe({
          next: () => {
            this.findAll();
            Swal.fire({
              title: 'Pedido deletado com sucesso!',
              icon: 'success',
              confirmButtonText: 'Ok',
            });
          },
          error: () => {
            Swal.fire({
              title: 'Erro ao deletar pedido',
              icon: 'error',
              confirmButtonText: 'Ok',
            });
          },
        });
      }
    });
  }

  podeEditar(pedido: Pedido): boolean {
    return pedido.status !== 'FINALIZADO';
  }

  getStatusIcon(pedido: Pedido) {
    if (pedido.status.toLowerCase() === 'finalizado') return '✅';
    if (pedido.status.toLowerCase() === 'preparando') return '⏱️';
    return '';
  }

  markAsPronto(pedido: Pedido) {
    if (pedido.status === 'FINALIZADO') {
      return; // não faz nada se já estiver finalizado
    }

    // altera o status e define a hora_fim
    pedido.status = 'FINALIZADO';

    // hora de fim
    const agora = new Date();
    pedido.hora_fim = agora.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    }); // HH:mm:ss

    // atualiza no backend
    this.pedidoService.update(pedido).subscribe({
      next: () => {
        Swal.fire({
          title: 'Pedido marcado como pronto!',
          icon: 'success',
          confirmButtonText: 'Ok',
        });
        this.findAll(); // atualiza a lista
      },
      error: (erro) => {
        Swal.fire({
          title: 'Erro ao atualizar pedido',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
        console.error(erro);
      },
    });
  }
}
