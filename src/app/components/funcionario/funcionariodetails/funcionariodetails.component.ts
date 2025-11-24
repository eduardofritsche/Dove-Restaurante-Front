import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario';
import { catchError, of, switchMap, throwError } from 'rxjs';

@Component({
  selector: 'app-funcionario-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './funcionariodetails.component.html',
  styleUrls: ['./funcionariodetails.component.scss'],
})
export class FuncionarioDetailsComponent {
  nome: string = '';
  cpf: string = '';
  email: string = '';
  senha: string = '';
  confirmarSenha: string = '';
  mostrarSenhaCadastro: boolean = false;
  usuarioService = inject(UsuarioService);

  constructor(private router: Router) {}

  CadastroFuncionario(): void {
    if (
      !this.nome?.trim() ||
      !this.email?.trim() ||
      !this.senha?.trim() ||
      !this.cpf?.trim()
    ) {
      Swal.fire({
        title: 'Preencha todos os campos obrigatórios.',
        icon: 'warning',
        confirmButtonText: 'Ok',
      });
      return;
    }

    this.usuarioService
      .findByEmail(this.email.trim())
      .pipe(
        catchError((err: any) => {
          if (err.status === 404) {
            return of(null);
          }
          return throwError(() => err);
        }),
        switchMap((usuarioExistente: Usuario | null) => {
          if (usuarioExistente) {
            return throwError(() => new Error('EMAIL_JA_CADASTRADO'));
          }

          const novoFuncionario: Partial<Usuario> = {
            nome: this.nome.trim(),
            cpf: this.cpf.trim(),
            email: this.email.trim(),
            username: this.email.trim(),
            senha: this.senha,
            tipo: 'FUNCIONARIO',
          };

          return this.usuarioService.save(novoFuncionario);
        })
      )
      .subscribe({
        next: (usuarioCriado: Usuario) => {
          Swal.fire({
            title: 'Cadastro realizado com sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok',
          });

          this.router.navigate(['/admin/funcionarios']);
        },
        error: (err: any) => {
          if (err?.message === 'EMAIL_JA_CADASTRADO' || err?.status === 409) {
            Swal.fire({
              title: 'E-mail já cadastrado!',
              icon: 'error',
              confirmButtonText: 'Ok',
            });
          } else {
            Swal.fire({
              title: 'Falha ao cadastrar funcionário.',
              text: 'Tente novamente mais tarde.',
              icon: 'error',
              confirmButtonText: 'Ok',
            });
          }
        },
      });
  }

  abrirLogin() {
    this.router.navigate(['/login']);
  }
}
