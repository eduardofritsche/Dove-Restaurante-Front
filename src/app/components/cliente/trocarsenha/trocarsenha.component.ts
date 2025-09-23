// trocar-senha.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';   // <- ngClass
import { FormsModule } from '@angular/forms';      // <- ngModel
import Swal from 'sweetalert2';
import { AuthService } from '../../../services/auth.service';
import { ClienteService } from '../../../services/cliente.service';

type ClasseForca = 'text-secondary' | 'text-danger' | 'text-warning' | 'text-success';

@Component({
  selector: 'app-trocar-senha',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './trocarsenha.component.html',
})
export class TrocarSenhaComponent {
  senhaAtual: string = '';
  novaSenha: string = '';
  confirmarSenha: string = '';

  mostrarAtual: boolean = false;
  mostrarNova: boolean = false;
  mostrarConfirm: boolean = false;
  submitted: boolean = false;
  loading: boolean = false;

  rotuloForca: string = '—';
  classeForca: ClasseForca = 'text-secondary';
  regras = {
    minLen: false,
    upper:  false,
    lower:  false,
    number: false,
    special:false,
  };

  constructor(
    private auth: AuthService,
    private clienteService: ClienteService
  ) {}

  calcularForca(): void {
    const s = this.novaSenha ?? '';
    this.regras.minLen  = s.length >= 8;
    this.regras.upper   = /[A-Z]/.test(s);
    this.regras.lower   = /[a-z]/.test(s);
    this.regras.number  = /[0-9]/.test(s);
    this.regras.special = /[^A-Za-z0-9]/.test(s);

    const score = (Object.values(this.regras).filter(Boolean).length);
    if (!s.length)        { this.rotuloForca = '—';     this.classeForca = 'text-secondary'; }
    else if (score <= 2)  { this.rotuloForca = 'Fraca'; this.classeForca = 'text-danger'; }
    else if (score === 3) { this.rotuloForca = 'Média'; this.classeForca = 'text-warning'; }
    else                  { this.rotuloForca = 'Forte'; this.classeForca = 'text-success'; }
  }

  senhasConferem(): boolean {
    return !!this.novaSenha && this.novaSenha === this.confirmarSenha;
  }

  regrasValidas(): boolean {
    const r = this.regras;
    return r.minLen && r.upper && r.lower && r.number && r.special;
  }

  podeSalvar(): boolean {
    return !!this.senhaAtual && !!this.novaSenha && !!this.confirmarSenha
        && this.senhasConferem() && this.regrasValidas();
  }

  trocarSenha(): void {
    this.submitted = true;
    if (!this.podeSalvar()) return;

    const user = this.auth.getUser();
    if (!user?.id) {
      Swal.fire({ title: 'Sessão inválida.', text: 'Faça login novamente.', icon: 'error', confirmButtonText: 'Ok' });
      return;
    }

    this.loading = true;
    this.clienteService.changePassword(user.id, {
      senhaAtual: this.senhaAtual,
      novaSenha: this.novaSenha
    }).subscribe({
      next: () => {
        this.loading = false;
        this.senhaAtual = this.novaSenha = this.confirmarSenha = '';
        this.calcularForca();
        this.submitted = false;
        Swal.fire({ title: 'Senha alterada com sucesso!', icon: 'success', confirmButtonText: 'Ok' });
      },
      error: (err) => {
        this.loading = false;
        if (err?.status === 400 || err?.status === 401) {
          Swal.fire({ title: 'Senha atual incorreta.', icon: 'error', confirmButtonText: 'Ok' });
        } else {
          Swal.fire({ title: 'Falha ao alterar senha.', text: 'Tente novamente mais tarde.', icon: 'error', confirmButtonText: 'Ok' });
        }
      }
    });
  }
}
