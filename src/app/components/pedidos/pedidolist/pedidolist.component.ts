import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { PedidoService } from '../../../services/pedido.service';
import { Pedido } from '../../../models/pedido';
@Component({
  selector: 'app-pedidolist',
  imports: [RouterLink],
  templateUrl: './pedidolist.component.html',
  styleUrl: './pedidolist.component.scss',
})
export class PedidolistComponent {
  pedidoService = inject(PedidoService);
  pedidos: Pedido[] = [];

  ngOnInit(): void {
    this.findAll();
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
}
