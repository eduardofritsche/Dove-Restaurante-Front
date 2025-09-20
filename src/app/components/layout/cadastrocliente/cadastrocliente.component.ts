import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap, throwError } from 'rxjs';
import { Cliente } from '../../../models/cliente';
import { ClienteService } from '../../../services/cliente.service';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastrocliente',
  templateUrl: './cadastrocliente.component.html',
  styleUrls: ['./cadastrocliente.component.scss'],
  imports: [FormsModule],
  standalone: true
})
export class CadastroclienteComponent {
  nome: string = '';
  email: string = '';
  senha: string = '';
  confirmarSenha: string = '';

  constructor(
    private router: Router,
    private clienteservice: ClienteService,
    private authservice: AuthService
  ) {}

  CadastroCliente(): void {
  
    if (!this.nome?.trim() || !this.email?.trim() || !this.senha?.trim()) {
      Swal.fire({ title: 'Preencha todos os campos obrigatórios.', icon: 'warning', confirmButtonText: 'Ok' });
      return;
    }
    
    this.clienteservice.findByEmail(this.email.trim()).pipe(
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
    ).subscribe({
      next: (clienteCriado: Cliente) => {
        this.authservice.setRole('CLIENTE');
        this.authservice.setUser(clienteCriado);

        Swal.fire({
          title: 'Cadastro realizado com sucesso!',
          icon: 'success',
          confirmButtonText: 'Ok',
        });

        this.router.navigate(['/cliente/pedidos']);
      },
      error: (err: any) => {
        if (err?.message === 'EMAIL_JA_CADASTRADO' || err?.status === 409) {
          Swal.fire({ title: 'E-mail já cadastrado!', icon: 'error', confirmButtonText: 'Ok' });
        } else {
          Swal.fire({ title: 'Falha ao cadastrar cliente.', text: 'Tente novamente mais tarde.', icon: 'error', confirmButtonText: 'Ok' });
        }
      }
    });
    
  }

  abrirLoginCliente() {
    this.router.navigate(['/login-cliente']);
  }
}
