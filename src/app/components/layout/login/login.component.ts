import { Component, inject } from '@angular/core';
import { Login } from '../../../auth/login';
import { Router } from '@angular/router';
import { LoginService } from '../../../auth/login.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  login: Login = new Login();
  username: string = '';
  password: string = '';
  mostrarSenha: boolean = false;

  router = inject(Router);

  loginService = inject(LoginService);


  constructor(){
    this.loginService.removerToken();
  }


  logar() {

    this.loginService.logar({username: this.username, password: this.password}).subscribe({
      next: token => {

        if (token)
          this.loginService.addToken(token); //MUITO IMPORTANTE

        this.gerarToast().fire({ icon: "success", title: "Seja bem-vindo!" });
        // this.router.navigate(['admin/dashboard']);

        this.router.navigate(['/admin/pedidos']);
      },
      error: erro => {
        Swal.fire('Usuário ou senha incorretos!', '', 'error');
      }
    });

  }

  gerarToast() {
    return Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
  }

  abrirCadastro() {
    this.router.navigate(['/cadastro-cliente']);
  }
}
