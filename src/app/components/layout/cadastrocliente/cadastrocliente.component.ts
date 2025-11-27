import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { of, switchMap, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario';
import { LoginService } from '../../../auth/login.service';
import { Login } from '../../../auth/login';

@Component({
  selector: 'app-cadastrocliente',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './cadastrocliente.component.html',
  styleUrls: ['./cadastrocliente.component.scss'],
})
export class CadastroclienteComponent {
  nome: string = '';
  cpf: string = '';
  username: string = '';
  email: string = '';
  senha: string = '';
  confirmarSenha: string = '';
  mostrarSenhaCadastro: boolean = false;
  usuarioService = inject(UsuarioService);
  loginService = inject(LoginService);
  
  constructor(private router: Router) {}

  CadastroCliente(): void {
  if (!this.nome?.trim() || !this.email?.trim() || !this.username || !this.senha?.trim() || !this.cpf?.trim()) {
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
        if (err.status === 404) return of(null);
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
          tipo: 'CLIENTE',
        };

        return this.usuarioService.save(novoCliente);
      })
    )
    .subscribe({
      next: (clienteCriado: Usuario) => {
        // Criando objeto Login do jeito EXATO que o service precisa
        const login: Login = {
          username: this.username.trim(),
          password: this.senha.trim()  // <<-- precisa ser password
        };

        this.loginService.logar(login).subscribe({
          next: (token: string) => {
            this.loginService.addToken(token);

            Swal.fire({
              title: 'Cadastro realizado com sucesso!',
              text: 'Você foi logado automaticamente.',
              icon: 'success',
              confirmButtonText: 'Ok',
            });

            // Agora tem token e permissão
            this.router.navigate(['/cliente/pedidos']);
          },
          error: () => {
            Swal.fire({
              title: 'Cadastro concluído, mas falhou ao fazer login.',
              icon: 'warning',
            });

            this.router.navigate(['/login']);
          }
        });
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
