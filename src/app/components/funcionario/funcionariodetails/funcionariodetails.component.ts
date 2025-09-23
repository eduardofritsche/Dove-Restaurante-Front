import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FuncionarioService } from '../../../services/funcionario.service';
import { Funcionario } from '../../../models/funcionario';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-funcionario-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './funcionariodetails.component.html',
  styleUrls: ['./funcionariodetails.component.scss'],
})
export class FuncionarioDetailsComponent implements OnInit {
  funcionarioService = inject(FuncionarioService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  funcionario: Funcionario = {
    nome: '',
    cpf: '',
    pedidos: [],
  };

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.funcionarioService.findByID(+id).subscribe({
        next: (func: Funcionario) => (this.funcionario = func),
        error: (err) => console.error(err),
      });
    }
  }

  salvar() {
    if (this.funcionario.id == null) {
      // Criar funcionário
      this.funcionarioService.create(this.funcionario).subscribe({
        next: () => {
          Swal.fire({
            title: 'Funcionário salvo com sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.router.navigate(['/admin/funcionarios']);
        },
        error: (erro) => {
          console.error(erro);
          Swal.fire({
            title: 'Erro ao salvar funcionário!',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        },
      });
    } else {
      // Editar funcionário
      this.funcionarioService.update(this.funcionario).subscribe({
        next: () => {
          Swal.fire({
            title: 'Funcionário editado com sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.router.navigate(['/admin/funcionarios']);
        },
        error: (erro) => {
          console.error(erro);
          Swal.fire({
            title: 'Erro ao editar funcionário!',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        },
      });
    }
  }
}
