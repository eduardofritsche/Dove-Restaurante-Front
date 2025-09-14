import { Component, inject } from '@angular/core';
import Swal from 'sweetalert2';
import { Pedido } from '../../../models/pedido';
import { PedidoService } from '../../../services/pedido.service';
import { AuthService } from '../../../services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-meuspedidos',
  imports: [RouterLink],
  templateUrl: './meuspedidos.component.html',
  styleUrl: './meuspedidos.component.scss',
})
export class MeuspedidosComponent {
  pedidoService = inject(PedidoService);
  authService = inject(AuthService);
  pedidos: Pedido[] = [];

  ngOnInit(): void {
    this.findPedidosCliente();
  }

  findPedidosCliente() {
    const clienteId = this.authService.getUser()?.id; // id do cliente logado
    if (!clienteId) return;

    this.pedidoService.findAll().subscribe({
      next: (pedidos) => {
        // filtra apenas pedidos do cliente
        this.pedidos = pedidos
          .filter((p) => p.cliente.id === clienteId)
          .sort((a, b) => {
            // Ordena pelo mais recente (hora_inicio mais nova primeiro)
            const dateA = new Date(a.hora_inicio ?? '');
            const dateB = new Date(b.hora_inicio ?? '');
            return dateB.getTime() - dateA.getTime();
          });
      },
      error: (erro) => console.error(erro),
    });
  }

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
            this.findPedidosCliente();
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
