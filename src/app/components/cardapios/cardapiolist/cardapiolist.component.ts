import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { CardapioService } from '../../../services/cardapio.service';
import { Cardapio } from '../../../models/cardapio';

@Component({
  selector: 'app-cardapiolist',
  imports: [RouterLink],
  templateUrl: './cardapiolist.component.html',
  styleUrl: './cardapiolist.component.scss',
})
export class CardapiolistComponent {
  cardapioService = inject(CardapioService);
  cardapios: Cardapio[] = [];

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.cardapioService.findAll().subscribe({
      next: (cardapios) => {
        this.cardapios = cardapios;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  deletar(id: number) {
    Swal.fire({
      title: 'Você tem certeza que deseja deletar o cardápio?',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: 'Sim',
      denyButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed) {
        this.cardapioService.deleteById(id).subscribe({
          next: () => {
            this.findAll();
            Swal.fire({
              title: 'Cardápio deletado com sucesso!',
              icon: 'success',
              confirmButtonText: 'Ok',
            });
          },
          error: () => {
            Swal.fire({
              title: 'Erro ao deletar cardápio',
              icon: 'error',
              confirmButtonText: 'Ok',
            });
          },
        });
      }
    });
  }
}
