import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { Ingrediente } from '../../../models/ingrediente';
import { IngredienteService } from '../../../services/ingrediente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ingrediente-details',
  templateUrl: './ingredientedetails.component.html',
  styleUrls: ['./ingredientedetails.component.scss'],
  imports: [CommonModule, FormsModule, RouterModule],
  standalone: true
})
export class IngredienteDetailsComponent implements OnInit {
  ingrediente: Ingrediente = new Ingrediente();

  constructor(
    private ingredienteService: IngredienteService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.ingredienteService.findById(+id).subscribe({
        next: (data) => (this.ingrediente = data),
        error: (erro) => console.error('Erro ao carregar ingrediente', erro),
      });
    }
  }

  cancelar() {
    this.router.navigate(['/admin/ingredientes']);
  }

  salvar() {
    if (this.ingrediente.id == null) {
      // Criar ingrediente
      this.ingredienteService.save(this.ingrediente).subscribe({
        next: () => {
          Swal.fire({
            title: 'Ingrediente salvo com sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.router.navigate(['/admin/ingredientes']);
        },
        error: (erro) => {
          console.error(erro);
          Swal.fire({
            title: 'Erro ao salvar ingrediente!',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        },
      });
    } else {
      // Editar ingrediente
      this.ingredienteService.update(this.ingrediente).subscribe({
        next: () => {
          Swal.fire({
            title: 'Ingrediente editado com sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.router.navigate(['/admin/ingredientes']);
        },
        error: (erro) => {
          console.error(erro);
          Swal.fire({
            title: 'Erro ao editar ingrediente!',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        },
      });
    }
  }
}
