import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario';

@Component({
  selector: 'app-funcionariolist',
  imports: [RouterLink, DatePipe],
  templateUrl: './funcionariolist.component.html',
  styleUrl: './funcionariolist.component.scss',
})
export class FuncionariolistComponent {
  usuarioService = inject(UsuarioService);
  funcionarios: Usuario[] = [];

  relatorio: any | null = null; // guarda o relatório carregado

  ngOnInit(): void {
    this.findAll();
  }
  
  findAll() {
    this.usuarioService.findAll().subscribe({
      next: (usuarios) => {
        const funcionariosFiltrados = usuarios.filter(
          (usuario) => usuario.role === 'FUNCIONARIOS'
        );
        this.funcionarios = funcionariosFiltrados.sort(
          (a, b) => (b.id || 0) - (a.id || 0)
        );
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  deletar(funcionario: Usuario) {
    Swal.fire({
      title: 'Você tem certeza que deseja deletar este funcionário?',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: 'Sim',
      denyButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.delete(funcionario.id!).subscribe({
          next: () => {
            this.findAll();
            Swal.fire({
              title: 'Funcionário deletado com sucesso!',
              icon: 'success',
              confirmButtonText: 'Ok',
            });
          },
          error: () => {
            Swal.fire({
              title: 'Erro ao deletar funcionário',
              icon: 'error',
              confirmButtonText: 'Ok',
            });
          },
        });
      }
    });
  }

  abrirRelatorio(funcionario: Usuario): void {
    this.usuarioService.getRelatorio(funcionario.id!).subscribe({
      next: (data) => {
        // converte strings "HH:mm:ss" em objetos Date
        data.pedidos.forEach((p: any) => {
          if (p.horaInicio) {
            const [h, m, s] = p.horaInicio.split(':').map(Number);
            p.horaInicio = new Date();
            p.horaInicio.setHours(h, m, s, 0);
          }
          if (p.horaFim) {
            const [h, m, s] = p.horaFim.split(':').map(Number);
            p.horaFim = new Date();
            p.horaFim.setHours(h, m, s, 0);
          }
        });

        this.relatorio = data;
      },
      error: (err) => console.error('Erro ao gerar relatório', err),
    });
  }

  fecharRelatorio(): void {
    this.relatorio = null;
  }
}
