import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  HttpClient,
  HttpClientModule,
  HttpErrorResponse,
} from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

type Regras = {
  minLen: boolean;
  upper: boolean;
  lower: boolean;
  number: boolean;
  special: boolean;
};

@Component({
  selector: 'app-trocar-senha',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './trocarsenha.component.html',
  styleUrls: ['./trocarsenha.component.scss'],
})
export class TrocarSenhaComponent implements OnInit {

  usuarioId?: number;

  senhaAtual = '';
  novaSenha = '';
  confirmarSenha = '';

  mostrarAtual = false;
  mostrarNova = false;
  mostrarConfirm = false;
  submitted = false;
  loading = false;

  regras: Regras = { minLen: false, upper: false, lower: false, number: false, special: false };
  rotuloForca = 'Fraca';
  classeForca = 'text-danger';

  // API CORRETA
  private readonly API = '/api/usuario';

  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    // Pega ID da rota
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.usuarioId = Number(idParam);
      return;
    }

    // Pega ID do token decodificado
    try {
      const raw = localStorage.getItem('token');
      if (raw) {
        const token = JSON.parse(atob(raw.split('.')[1])); // decodifica payload
        if (token?.id) {
          this.usuarioId = Number(token.id);
          return;
        }
      }
    } catch {}

    Swal.fire({
      title: 'Não foi possível identificar o usuário.',
      icon: 'error',
      confirmButtonText: 'OK',
    });
  }

  podeSalvar(): boolean {
    return (
      !!this.usuarioId &&
      !!this.senhaAtual &&
      !!this.novaSenha &&
      !!this.confirmarSenha &&
      this.senhasConferem() &&
      this.atendeRegrasMinimas()
    );
  }

  senhasConferem(): boolean {
    return this.novaSenha.length > 0 && this.novaSenha === this.confirmarSenha;
  }

  atendeRegrasMinimas(): boolean {
    const classes =
      Number(this.regras.upper) +
      Number(this.regras.lower) +
      Number(this.regras.number) +
      Number(this.regras.special);

    return this.regras.minLen && classes >= 3;
  }

  calcularForca(): void {
    const s = this.novaSenha ?? '';
    this.regras = {
      minLen: s.length >= 8,
      upper: /[A-Z]/.test(s),
      lower: /[a-z]/.test(s),
      number: /\d/.test(s),
      special: /[^A-Za-z0-9]/.test(s),
    };

    const score =
      Number(this.regras.minLen) +
      Number(this.regras.upper) +
      Number(this.regras.lower) +
      Number(this.regras.number) +
      Number(this.regras.special);

    if (score <= 2) {
      this.rotuloForca = 'Fraca';
      this.classeForca = 'text-danger';
    } else if (score === 3 || score === 4) {
      this.rotuloForca = 'Média';
      this.classeForca = 'text-warning';
    } else {
      this.rotuloForca = 'Forte';
      this.classeForca = 'text-success';
    }
  }

  voltarParaPerfil() {
    window.history.back();
  }

  trocarSenha(): void {
    this.submitted = true;

    if (!this.usuarioId) {
      Swal.fire({ title: 'Usuário não identificado.', icon: 'error', confirmButtonText: 'OK' });
      return;
    }

    if (!this.podeSalvar()) {
      Swal.fire({ title: 'Preencha tudo corretamente.', icon: 'warning', confirmButtonText: 'OK' });
      return;
    }

    this.loading = true;

    // Agora usando /usuario/senha/{id}
    const url = `${this.API}/senha/${this.usuarioId}`;
    const body = {
      senhaAtual: this.senhaAtual.trim(),
      novaSenha: this.novaSenha.trim(),
      confirmacao: this.confirmarSenha.trim(),
    };

    this.http.put<void>(url, body).subscribe({
      next: () => {
        this.loading = false;
        Swal.fire({ title: 'Senha alterada!', icon: 'success', confirmButtonText: 'OK' });
        this.senhaAtual = '';
        this.novaSenha = '';
        this.confirmarSenha = '';
        this.submitted = false;
        this.calcularForca();
      },
      error: (err: HttpErrorResponse) => {
        this.loading = false;

        if (err.status === 401) {
          Swal.fire({ title: 'Senha atual incorreta.', icon: 'error', confirmButtonText: 'OK' });
          return;
        }
        if (err.status === 404) {
          Swal.fire({ title: 'Usuário não encontrado.', icon: 'error', confirmButtonText: 'OK' });
          return;
        }

        Swal.fire({ title: 'Erro ao alterar senha.', icon: 'error', confirmButtonText: 'OK' });
      },
    });
  }
}
