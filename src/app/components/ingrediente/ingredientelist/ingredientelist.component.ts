import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { IngredienteService } from '../../../services/ingrediente.service';
import { Ingrediente } from '../../../models/ingrediente';

@Component({
  selector: 'app-ingredientelist',
  imports: [CommonModule, RouterModule],
  templateUrl: './ingredientelist.component.html',
  styleUrl: './ingredientelist.component.scss',
})
export class IngredientelistComponent implements OnInit {
  ingredienteService = inject(IngredienteService);
  ingredientes: Ingrediente[] = [];

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.ingredienteService.findAll().subscribe({
      next: (ingredientes) => {
        this.ingredientes = ingredientes.sort((a, b) => (b.id || 0) - (a.id || 0));
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  deletar(ingrediente: Ingrediente) {
    Swal.fire({
      title: 'Você tem certeza que deseja deletar este ingrediente?',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: 'Sim',
      denyButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed) {
        this.ingredienteService.deleteById(ingrediente.id!).subscribe({
          next: () => {
            this.findAll();
            Swal.fire({
              title: 'Ingrediente deletado com sucesso!',
              icon: 'success',
              confirmButtonText: 'Ok',
            });
          },
          error: () => {
            Swal.fire({
              title: 'Erro ao deletar ingrediente',
              icon: 'error',
              confirmButtonText: 'Ok',
            });
          },
        });
      }
    });
  }
}
