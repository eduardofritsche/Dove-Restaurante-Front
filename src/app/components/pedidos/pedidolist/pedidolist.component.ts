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
export class PedidoslistComponent {
  pedidoService = inject(PedidoService);
  pedidos: Pedido[] = [];

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.pedidoService.findAll().subscribe({
      next: (pedidos) => {
        this.pedidos = pedidos;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  deletar(id: number) {
    Swal.fire({
      title: 'Você tem certeza que deseja deletar o pedido?',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: 'Sim',
      denyButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed) {
        this.pedidoService.deleteById(id).subscribe({
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
}
