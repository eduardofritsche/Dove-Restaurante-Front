import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { of, switchMap, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario';

@Component({
  selector: 'app-cadastrocliente',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './cadastrocliente.component.html',
  styleUrls: ['./cadastrocliente.component.scss'],
})
export class CadastroclienteComponent {
  nome: string = '';
  username: string = '';
  cpf: string = '';
  email: string = '';
  senha: string = '';
  confirmarSenha: string = '';
  tipo: 'CLIENTE' = 'CLIENTE';
  mostrarSenhaCadastro: boolean = false;
  usuarioService = inject(UsuarioService);

  constructor(private router: Router) {}

  CadastroCliente(): void {
    if (!this.nome?.trim() || !this.email?.trim() || !this.senha?.trim() || !this.cpf?.trim() || !this.username?.trim()) {
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

          const novoCliente: Partial<Usuario> = {
            nome: this.nome.trim(),
            cpf: this.cpf.trim(),
            email: this.email.trim(),
            username: this.username.trim(),
            senha: this.senha,
            tipo: this.tipo
          };

          return this.usuarioService.save(novoCliente);
        })
      )
      .subscribe({
        next: (clienteCriado: Usuario) => {
          Swal.fire({
            title: 'Cadastro realizado com sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok',
          });

          this.router.navigate(['/admin/pedidos']);
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
              title: 'Falha ao cadastrar cliente.',
              text: 'Tente novamente mais tarde.',
              icon: 'error',
              confirmButtonText: 'Ok',
            });
          }
        },
      });
  }

  abrirLoginCliente() {
    this.router.navigate(['/login']);
  }
}
