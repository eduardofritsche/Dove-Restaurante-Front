import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { of, switchMap, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FuncionarioService } from '../../../services/funcionario.service';
import { UsuarioService } from '../../../services/usuario.service';
import { Funcionario } from '../../../models/funcionario';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../../models/usuario';

@Component({
  selector: 'app-funcionario-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './funcionariodetails.component.html',
  styleUrls: ['./funcionariodetails.component.scss'],
})
export class FuncionarioDetailsComponent implements OnInit {
  // funcionarioService = inject(UsuarioService);
  usuarioService = inject(UsuarioService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  nome: string = '';
  username: string = '';
  cpf: string = '';
  email: string = '';
  senha: string = '';
  confirmarSenha: string = '';
  tipo: 'FUNCIONARIO' = 'FUNCIONARIO';
  mostrarSenhaCadastro: boolean = false;
  funcionario: Usuario = new Usuario();

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.usuarioService.findById(+id).subscribe({
        next: (func: Usuario) => (this.funcionario = func),
        error: (err) => console.error(err),
      });
    }
  }

  salvar(): void {
      if (!this.nome?.trim() || !this.email?.trim() || !this.senha?.trim() || !this.cpf?.trim() || !this.username?.trim()) {
        Swal.fire({
          title: 'Preencha todos os campos obrigatórios.',
          icon: 'warning',
          confirmButtonText: 'Ok',
        });
        return;
      }
  
      this.usuarioService
        .findByEmail(this.email.trim())
        .pipe(
          catchError((err: any) => {
            if (err.status === 404) {
              return of(null);
            }
            return throwError(() => err);
          }),
          switchMap((usuarioExistente: Usuario | null) => {
            if (usuarioExistente) {
              return throwError(() => new Error('EMAIL_JA_CADASTRADO'));
            }
  
            const novoCliente: Partial<Usuario> = {
              nome: this.nome.trim(),
              cpf: this.cpf.trim(),
              email: this.email.trim(),
              username: this.username.trim(),
              senha: this.senha,
              tipo: this.tipo
            };
  
            return this.usuarioService.save(novoCliente);
          })
        )
        .subscribe({
          next: (clienteCriado: Usuario) => {
            Swal.fire({
              title: 'Cadastro realizado com sucesso!',
              icon: 'success',
              confirmButtonText: 'Ok',
            });
  
            this.router.navigate(['/admin/pedidos']);
          },
          error: (err: any) => {
            if (err?.message === 'EMAIL_JA_CADASTRADO' || err?.status === 409) {
              Swal.fire({
                title: 'E-mail já cadastrado!',
                icon: 'error',
                confirmButtonText: 'Ok',
              });
            } else {
              Swal.fire({
                title: 'Falha ao cadastrar cliente.',
                text: 'Tente novamente mais tarde.',
                icon: 'error',
                confirmButtonText: 'Ok',
              });
            }
          },
        });
    }

  // salvar() {
  //   if (this.funcionario.id == null) {
  //     // Criar funcionário
  //     this.funcionarioService.save(this.funcionario).subscribe({
  //       next: () => {
  //         Swal.fire({
  //           title: 'Funcionário salvo com sucesso!',
  //           icon: 'success',
  //           confirmButtonText: 'Ok',
  //         });
  //         this.router.navigate(['/admin/funcionarios']);
  //       },
  //       error: (erro) => {
  //         console.error(erro);
  //         Swal.fire({
  //           title: 'Erro ao salvar funcionário!',
  //           icon: 'error',
  //           confirmButtonText: 'Ok',
  //         });
  //       },
  //     });
  //   } else {
  //     // Editar funcionário
  //     this.funcionarioService.update(this.funcionario.id, this.funcionario).subscribe({
  //       next: () => {
  //         Swal.fire({
  //           title: 'Funcionário editado com sucesso!',
  //           icon: 'success',
  //           confirmButtonText: 'Ok',
  //         });
  //         this.router.navigate(['/admin/funcionarios']);
  //       },
  //       error: (erro) => {
  //         console.error(erro);
  //         Swal.fire({
  //           title: 'Erro ao editar funcionário!',
  //           icon: 'error',
  //           confirmButtonText: 'Ok',
  //         });
  //       },
  //     });
  //   }
  // }
}
