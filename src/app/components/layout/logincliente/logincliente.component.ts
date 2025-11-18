import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ClienteService } from '../../../services/cliente.service';
import { Cliente } from '../../../models/cliente';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-logincliente',
  imports: [FormsModule, CommonModule],
  templateUrl: './logincliente.component.html',
  styleUrl: './logincliente.component.scss',
})
export class LoginClienteComponent {
  email: string = '';
  senha: string = '';
  mostrarSenha: boolean = false;
  router = inject(Router);
  clienteService = inject(ClienteService);
  authService = inject(AuthService);


  loginCliente() {
    this.clienteService.findByEmail(this.email).subscribe({
      next: (cliente: Cliente) => {
        if (cliente && cliente.senha === this.senha) {
          this.authService.setRole('CLIENTE');
          this.authService.setUser(cliente);

          Swal.fire({
            title: 'Login realizado com sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok',
          });

          this.router.navigate(['/cliente/pedidos']);
        } else {
          Swal.fire({
            title: 'Senha incorreta!',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        }
      },
      error: () => {
        Swal.fire({
          title: 'Cliente não encontrado!',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      },
    });
  }

  abrirCadastro() {
    this.router.navigate(['/cadastro-cliente']);
  }

  abrirLoginFuncionario() {
    this.router.navigate(['/login-funcionario']);
  }
}


