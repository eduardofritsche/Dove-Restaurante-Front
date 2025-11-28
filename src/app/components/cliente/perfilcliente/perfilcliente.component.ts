import { Component, OnInit, inject } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import { LoginService } from '../../../auth/login.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'perfil-cliente',
  templateUrl: './perfilcliente.component.html',
  styleUrls: ['./perfilcliente.component.scss']
})
export class PerfilclienteComponent implements OnInit {

  cliente: Usuario | null = null;

  loginService = inject(LoginService);
  http = inject(HttpClient);

  API = "http://localhost:8080/api/usuarios";

  ngOnInit() {
    const usuario = this.loginService.getUsuarioLogado() as Usuario;

    if (usuario?.id) {
      this.http.get<Usuario>(`${this.API}/${usuario.id}`)
        .subscribe({
          next: res => { this.cliente = res; },
          error: err => console.error("Erro ao buscar cliente:", err)
        });
    }
  }

  abrirTrocarSenha() {
    window.location.href = "/cliente/senha";
  }
}
