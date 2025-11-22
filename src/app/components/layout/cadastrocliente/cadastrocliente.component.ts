import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { of, switchMap, throwError } from 'rxjs';
import { Cliente } from '../../../models/cliente';
import { ClienteService } from '../../../services/cliente.service';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastrocliente',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './cadastrocliente.component.html',
  styleUrls: ['./cadastrocliente.component.scss'],
})
export class CadastroclienteComponent {
  nome: string = '';
  email: string = '';
  senha: string = '';
  confirmarSenha: string = '';
  mostrarSenhaCadastro: boolean = false;
  clienteservice = inject(ClienteService);

  constructor(
    private router: Router,
    private clienteService: ClienteService,
  ) {}

  CadastroCliente(): void {
    if (!this.nome?.trim() || !this.email?.trim() || !this.senha?.trim()) {
      Swal.fire({
        title: 'Preencha todos os campos obrigatórios.',
        icon: 'warning',
        confirmButtonText: 'Ok',
      });
      return;
    }

    this.clienteservice
      .findByEmail(this.email.trim())
      .pipe(
        catchError((err: any) => {
          if (err.status === 404) {
            return of(null);
          }
          return throwError(() => err);
        }),
        switchMap((clienteExistente: Cliente | null) => {
          if (clienteExistente) {
            return throwError(() => new Error('EMAIL_JA_CADASTRADO'));
          }

          const novoCliente: Partial<Cliente> = {
            nome: this.nome.trim(),
            email: this.email.trim(),
            senha: this.senha,
          };

          return this.clienteservice.create(novoCliente);
        })
      )
      .subscribe({
        next: (clienteCriado: Cliente) => {

          Swal.fire({
            title: 'Cadastro realizado com sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok',
          });

          this.router.navigate(['/cliente/pedidos']);
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
    this.router.navigate(['/login-cliente']);
  }
}
