import { Component, Input, OnInit, inject } from '@angular/core';
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
})
export class TrocarSenhaComponent implements OnInit {
  /** Caso queira receber o id do pai, mantenha @Input; senão, pegamos do AuthService/rota */
  clienteId?: number;

  // Campos do formulário
  senhaAtual = '';
  novaSenha = '';
  confirmarSenha = '';

  // UI
  mostrarAtual = false;
  mostrarNova = false;
  mostrarConfirm = false;
  submitted = false;
  loading = false;

  // Força da senha
  regras: Regras = { minLen: false, upper: false, lower: false, number: false, special: false };
  rotuloForca = 'Fraca';
  classeForca = 'text-danger';

  /** Ajuste se usar environment.apiUrl */
  private readonly API = '/api/cliente'; // seu back está em singular e usa /senha/{id}

  // Injeções
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  // private auth = inject(AuthService);

  ngOnInit(): void {
    // 1) Tenta pelo AuthService (login salvou o usuário com id)
    // const authId = this.auth.getUserId?.() ?? null;
    // if (authId) {
    //   this.clienteId = authId;
    //   // console.log('[TrocarSenha] id via AuthService =', this.clienteId);
    //   return;
    // }

    // 2) Tenta pela rota (/.../:id/...)
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.clienteId = Number(idParam);
      // console.log('[TrocarSenha] id via rota =', this.clienteId);
      return;
    }

    // 3) Tenta recuperar do localStorage (caso o AuthService use outra key)
    try {
      const raw = localStorage.getItem('app.user');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.id) {
          this.clienteId = Number(parsed.id);
          // console.log('[TrocarSenha] id via localStorage =', this.clienteId);
          return;
        }
      }
    } catch {
      // ignore
    }

    // Se nada funcionou, avise e mantenha botão inoperante
    Swal.fire({
      title: 'Não foi possível identificar o cliente (id ausente).',
      icon: 'error',
      confirmButtonText: 'OK',
    });
  }

  /** Habilita o botão quando tudo estiver ok */
  podeSalvar(): boolean {
    return (
      !!this.clienteId &&
      !!this.senhaAtual &&
      !!this.novaSenha &&
      !!this.confirmarSenha &&
      this.senhasConferem() &&
      this.atendeRegrasMinimas()
    );
  }

  /** Nova senha === confirmação */
  senhasConferem(): boolean {
    return this.novaSenha.length > 0 && this.novaSenha === this.confirmarSenha;
  }

  /** Defina seu mínimo: 8+ e pelo menos 3 classes de caracteres */
  atendeRegrasMinimas(): boolean {
    const classes =
      Number(this.regras.upper) +
      Number(this.regras.lower) +
      Number(this.regras.number) +
      Number(this.regras.special);
    return this.regras.minLen && classes >= 3;
  }

  /** Recalcula força da senha conforme digita */
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

  /** Envia JSON no corpo para PUT /api/cliente/senha/{id} */
  trocarSenha(): void {
    this.submitted = true;

    if (!this.clienteId) {
      Swal.fire({
        title: 'Não foi possível identificar o cliente (id ausente).',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    if (!this.podeSalvar()) {
      Swal.fire({
        title: 'Preencha os campos corretamente antes de salvar.',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
      return;
    }

    this.loading = true;

    const url = `${this.API}/senha/${this.clienteId}`; // /senha/{id}
    const body = {
      senhaAtual: this.senhaAtual.trim(),
      novaSenha: this.novaSenha.trim(),
      confirmacao: this.confirmarSenha.trim(),
    };

    this.http.put<void>(url, body).subscribe({
      next: () => {
        this.loading = false;
        Swal.fire({
          title: 'Senha alterada com sucesso.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        // Limpar campos
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
          Swal.fire({ title: 'Cliente não encontrado.', icon: 'error', confirmButtonText: 'OK' });
          return;
        }
        if (err.status === 400) {
          const msg =
            (err.error && (err.error.message || err.error.error)) ||
            'Requisição inválida. Verifique os campos.';
          Swal.fire({ title: msg, icon: 'error', confirmButtonText: 'OK' });
          return;
        }
        if (err.status === 415) {
          Swal.fire({ title: 'Formato não suportado (415). Envie application/json.', icon: 'error', confirmButtonText: 'OK' });
          return;
        }
        Swal.fire({ title: 'Erro ao alterar a senha. Tente novamente.', icon: 'error', confirmButtonText: 'OK' });
        // console.error('Erro trocarSenha:', err);
      },
    });
  }
}