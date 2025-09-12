import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Cardapio } from '../../../models/cardapio';
import { CardapioService } from '../../../services/cardapio.service';

@Component({
  selector: 'app-cardapiodetails',
  imports: [FormsModule],
  templateUrl: './cardapiodetails.component.html',
  styleUrl: './cardapiodetails.component.scss',
})
export class CardapiodetailsComponent {
  cardapio: Cardapio = new Cardapio();
  cardapioService = inject(CardapioService);
  activedRoute = inject(ActivatedRoute);
  router = inject(Router);

  constructor() {
    const id = this.activedRoute.snapshot.params['id'];
    if (id > 0) {
      this.findById(id);
    }
  }

  findById(id: number) {
    this.cardapioService.findById(id).subscribe({
      next: (cardapio) => {
        this.cardapio = cardapio;
      },
      error: (erro) => {
        console.error(erro);
      },
    });
  }

  salvar(cardapio: Cardapio) {
    if (cardapio.id == null) {
      // criar cardápio
      this.cardapioService.save(cardapio).subscribe({
        next: () => {
          Swal.fire({
            title: 'Salvo com Sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.router.navigate(['/admin/cardapios']);
        },
        error: (erro) => {
          console.error(erro);
        },
      });
    } else {
      // editar cardápio
      this.cardapioService.update(cardapio).subscribe({
        next: () => {
          Swal.fire({
            title: 'Editado com Sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.router.navigate(['/admin/cardapios']);
        },
        error: (erro) => {
          console.error(erro);
        },
      });
    }
  }
}
