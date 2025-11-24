import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-funcionario-relatorio',
  imports: [DatePipe],
  templateUrl: './funcionario-relatorio.component.html',
  styleUrls: ['./funcionario-relatorio.component.scss']
})
export class FuncionarioRelatorioComponent implements OnInit {

  relatorio: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    const funcionarioId = Number(this.route.snapshot.paramMap.get('id'));
    if (funcionarioId) {
      this.usuarioService.getRelatorio(funcionarioId).subscribe({
        next: (data) => {
          // converter strings "HH:mm:ss" para Date
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
        error: (err) => console.error('Erro ao carregar relatório', err)
      });
    }
  }

  voltar(): void {
    this.router.navigate(['/admin/funcionarios']);
  }
}
