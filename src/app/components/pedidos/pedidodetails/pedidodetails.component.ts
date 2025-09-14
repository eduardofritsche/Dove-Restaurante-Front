import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Pedido } from '../../../models/pedido';
import { PedidoService } from '../../../services/pedido.service';

@Component({
  selector: 'app-pedidodetails',
  imports: [FormsModule],
  templateUrl: './pedidodetails.component.html',
  styleUrl: './pedidodetails.component.scss',
})
export class PedidodetailsComponent {
  pedido: Pedido = new Pedido();
  pedidoService = inject(PedidoService);
  activedRoute = inject(ActivatedRoute);
  router = inject(Router);

  constructor() {
    const id = this.activedRoute.snapshot.params['id'];
    if (id > 0) {
      this.findById(id);
    }
  }

  findById(id: number) {
    this.pedidoService.findById(id).subscribe({
      next: (pedido) => {
        this.pedido = pedido;
      },
      error: (erro) => {
        console.error(erro);
      },
    });
  }

  salvar(pedido: Pedido) {
    if (pedido.id == null) {
      // criar pedido
      this.pedidoService.save(pedido).subscribe({
        next: () => {
          Swal.fire({
            title: 'Salvo com Sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.router.navigate(['/admin/pedidos']);
        },
        error: (erro) => {
          console.error(erro);
        },
      });
    } else {
      // editar pedido
      this.pedidoService.update(pedido).subscribe({
        next: () => {
          Swal.fire({
            title: 'Editado com Sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.router.navigate(['/admin/pedidos']);
        },
        error: (erro) => {
          console.error(erro);
        },
      });
    }
  }
}
