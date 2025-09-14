import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Cardapio } from '../../../models/cardapio';
import { Ingrediente } from '../../../models/ingrediente';
import { CardapioService } from '../../../services/cardapio.service';
import { IngredienteService } from '../../../services/ingrediente.service';

@Component({
  selector: 'app-cardapiodetails',
  imports: [FormsModule],
  templateUrl: './cardapiodetails.component.html',
  styleUrl: './cardapiodetails.component.scss',
})
export class CardapiodetailsComponent {
  cardapio: Cardapio = new Cardapio();
  ingredientes: Ingrediente[] = [];
  cardapioService = inject(CardapioService);
  ingredienteService = inject(IngredienteService);
  activedRoute = inject(ActivatedRoute);
  router = inject(Router);

  constructor() {
    const id = this.activedRoute.snapshot.params['id'];
    if (id > 0) {
      this.findById(id);
    } else {
      // cadastro novo → define data de hoje
      this.cardapio.data = new Date().toISOString().split('T')[0]; // yyyy-MM-dd
    }

    this.loadIngredientes();
  }

  isChecked(ingId: number): boolean {
    return this.cardapio.ingredientes.some((i) => i.id === ingId);
  }

  loadIngredientes() {
    this.ingredienteService.findAll().subscribe({
      next: (lista) => (this.ingredientes = lista),
      error: (err) => console.error(err),
    });
  }

  findById(id: number) {
    this.cardapioService.findById(id).subscribe({
      next: (cardapio) => {
        this.cardapio = cardapio;
      },
      error: (erro) => console.error(erro),
    });
  }

  toggleIngrediente(ingrediente: Ingrediente, event: any) {
    if (event.target.checked) {
      this.cardapio.ingredientes.push(ingrediente);
    } else {
      this.cardapio.ingredientes = this.cardapio.ingredientes.filter(
        (i) => i.id !== ingrediente.id
      );
    }
  }

  salvar(cardapio: Cardapio) {
    if (cardapio.id == null) {
      // criar
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
          if (erro.status === 400 || erro.status === 409) {
            Swal.fire({
              title: 'Já existe um cardápio nesta data!',
              icon: 'error',
              confirmButtonText: 'Ok',
            });
          } else {
            console.error(erro);
          }
        },
      });
    } else {
      // editar
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
