import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../../auth/login.service';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  router = inject(Router);
  loginService = inject(LoginService)

  logout() {
    this.router.navigate(['/login']);
  }
}
