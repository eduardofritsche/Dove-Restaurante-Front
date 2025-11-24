import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario';

@Component({
  selector: 'app-funcionario-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './funcionariodetails.component.html',
  styleUrls: ['./funcionariodetails.component.scss'],
})
export class FuncionarioDetailsComponent implements OnInit {
  usuarioService = inject(UsuarioService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  funcionario: Usuario = {
    nome: '',
    cpf: '',
    pedidos: [],
    id: 0,
    username: '',
    email: '',
    senha: '',
    tipo: 'CLIENTE'
  };

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.usuarioService.findByID(+id).subscribe({
        next: (func: Usuario) => (this.funcionario = func),
        error: (err) => console.error(err),
      });
    }
  }

  salvar() {
    if (this.funcionario.id == null) {
      // Criar funcionário
      this.usuarioService.save(this.funcionario).subscribe({
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
      this.usuarioService.update(this.funcionario.id, this.funcionario).subscribe({
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
