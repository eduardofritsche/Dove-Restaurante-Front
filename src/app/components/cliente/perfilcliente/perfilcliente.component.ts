import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../../models/usuario';
import { LoginService } from '../../../auth/login.service';

@Component({
  selector: 'perfil-cliente',
  templateUrl: './perfilcliente.component.html',
  styleUrls: ['./perfilcliente.component.scss']
})
export class PerfilclienteComponent implements OnInit {
  cliente: Usuario | null = null;

  private loginService = inject(LoginService);
  private router = inject(Router);

  ngOnInit() {
    this.cliente = this.loginService.getUsuarioLogado() as Usuario;
  }

  abrirTrocarSenha() {
    // navega para a rota definida: /cliente/senha
    this.router.navigate(['/cliente/senha']);
  }
}
