import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../../services/auth.service';
import { Funcionario } from '../../../models/funcionario';
import { FuncionarioService } from '../../../services/funcionario.service';

@Component({
  selector: 'app-loginfuncionario',
  imports: [FormsModule],
  templateUrl: './loginfuncionario.component.html',
  styleUrl: './loginfuncionario.component.scss',
})
export class LoginfuncionarioComponent {
  cpf: string = '';
  router = inject(Router);
  authService = inject(AuthService);
  funcionarioService = inject(FuncionarioService);

  loginFuncionario() {
    this.funcionarioService.findByCpf(this.cpf).subscribe({
      next: (funcionario: Funcionario | null) => {
        if (funcionario) {
          Swal.fire({
            title: 'Login realizado com sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.router.navigate(['/admin']);
        } else {
          Swal.fire({
            title: 'CPF incorreto',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        }
      },
      error: () => {
        Swal.fire({
          title: 'Erro ao buscar funcionário',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      },
    });
  }

  voltarLoginCliente() {
    this.router.navigate(['/login-cliente']);
  }
}
