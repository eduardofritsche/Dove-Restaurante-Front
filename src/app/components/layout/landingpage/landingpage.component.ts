import { AfterViewInit, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landingpage',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss']
})
export class LandingpageComponent implements AfterViewInit {

  // se quiser apontar para outra rota depois:
  // loginPath = '/login-cliente';
  loginPath = '/login';

  ngAfterViewInit(): void {
    try {
      // Implementation can be added here if needed
    } catch (err: any) {
      console.warn("LandingPage Ignored Error:", err);
    }
  }
}


