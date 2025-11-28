import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario';
import { catchError, of, switchMap, throwError } from 'rxjs';

@Component({
  selector: 'app-funcionario-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './funcionariodetails.component.html',
  styleUrls: ['./funcionariodetails.component.scss'],
})
export class FuncionarioDetailsComponent implements OnInit {
  id: number = 0;
  nome: string = '';
  cpf: string = '';
  username: string = '';
  email: string = '';
  senha: string = '';
  confirmarSenha: string = '';
  mostrarSenhaCadastro: boolean = false;
  usuarioService = inject(UsuarioService);

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      if (this.id) {
        this.usuarioService.findById(this.id).subscribe({
          next: (funcionario: Usuario) => {
            this.nome = funcionario.nome;
            this.cpf = funcionario.cpf;
            this.username = funcionario.username;
            this.email = funcionario.email;
            this.senha = '';
          },
          error: (err: any) => {
            console.error('Erro ao carregar funcionário:', err);
            Swal.fire({
              title: 'Funcionário não encontrado.',
              icon: 'error',
              confirmButtonText: 'Ok',
            });
            this.router.navigate(['/admin/funcionarios']);
          },
        });
      }
    });
  }

  salvarFuncionario(): void {
    if (this.id) {
      this.editarFuncionario();
    } else {
      this.cadastroFuncionario();
    }
  }

  cadastroFuncionario(): void {
    if (
      !this.nome?.trim() ||
      !this.email?.trim() ||
      !this.senha?.trim() ||
      !this.username?.trim() ||
      !this.cpf?.trim()
    ) {
      Swal.fire({
        title: 'Preencha todos os campos obrigatórios.',
        icon: 'warning',
        confirmButtonText: 'Ok',
      });
      return;
    }

    this.usuarioService
      .findByUsername(this.username.trim())
      .pipe(
        catchError((err: any) => {
          if (err.status === 404) {
            return of(null);
          }
          return throwError(() => err);
        }),
        switchMap((usuarioExistente: Usuario | null) => {
          if (usuarioExistente) {
            return throwError(() => new Error('USERNAME_JA_CADASTRADO'));
          }

          const novoFuncionario: Partial<Usuario> = {
            nome: this.nome.trim(),
            cpf: this.cpf.trim(),
            email: this.email.trim(),
            username: this.username.trim(),
            senha: this.senha,
            tipo: 'FUNCIONARIO',
          };

          return this.usuarioService.save(novoFuncionario);
        })
      )
      .subscribe({
        next: (usuarioCriado: Usuario) => {
          Swal.fire({
            title: 'Cadastro realizado com sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok',
          });

          this.router.navigate(['/admin/funcionarios']);
        },
        error: (err: any) => {
          if (err?.message === 'USERNAME_JA_CADASTRADO' || err?.status === 409) {
            Swal.fire({
              title: 'Username já cadastrado!',
              icon: 'error',
              confirmButtonText: 'Ok',
            });
          } else {
            Swal.fire({
              title: 'Falha ao cadastrar funcionário.',
              text: 'Tente novamente mais tarde.',
              icon: 'error',
              confirmButtonText: 'Ok',
            });
          }
        },
      });
  }

  editarFuncionario(): void {
    if (
      !this.nome?.trim() ||
      !this.email?.trim() ||
      !this.username?.trim() ||
      !this.cpf?.trim()
    ) {
      Swal.fire({
        title: 'Preencha os campos obrigatórios.',
        icon: 'warning',
        confirmButtonText: 'Ok',
      });
      return;
    }

    const funcionarioAtualizado: Partial<Usuario> = {
      id: this.id,
      nome: this.nome.trim(),
      cpf: this.cpf.trim(),
      email: this.email.trim(),
      username: this.email.trim(),
      ...(this.senha && { senha: this.senha }),
      tipo: 'FUNCIONARIO',
    };

    this.usuarioService.update(this.id, funcionarioAtualizado).subscribe({
      next: (usuarioAtualizado: Usuario) => {
        Swal.fire({
          title: 'Funcionário atualizado com sucesso!',
          icon: 'success',
          confirmButtonText: 'Ok',
        });
        this.router.navigate(['/admin/funcionarios']);
      },
      error: (err: any) => {
        console.error('Erro na edição:', err);
        Swal.fire({
          title: 'Falha ao atualizar funcionário.',
          text: 'Verifique se o e-mail não está em uso por outro usuário e tente novamente.',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      },
    });
  }

  abrirLogin() {
    this.router.navigate(['/login']);
  }
}