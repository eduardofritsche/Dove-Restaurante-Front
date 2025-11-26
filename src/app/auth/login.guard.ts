import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './login.service';
import { inject } from '@angular/core';
import Swal from 'sweetalert2';


export const loginGuardAdmin: CanActivateFn = (route, state) => {
  let loginService = inject(LoginService);
  const router = inject(Router);

  if (loginService.hasRole("ADMIN")) {
    return true;
  };

  router.navigate(['/login']).then(() => {
    Swal.fire({
            title: 'Acesso negado',
            text: 'Você não tem permissão para acessar esta página.',
            icon: 'warning',
            confirmButtonText: 'Ok',
          });
  });

  return false;
};

export const loginGuardFuncionario: CanActivateFn = (route, state) => {
  let loginService = inject(LoginService);
  const router = inject(Router);

  if (loginService.hasRole("FUNCIONARIO") || loginService.hasRole("ADMIN")) {
    return true;
  };

  router.navigate(['/login']).then(() => {
    Swal.fire({
            title: 'Acesso negado',
            text: 'Você não tem permissão para acessar esta página.',
            icon: 'warning',
            confirmButtonText: 'Ok',
          });
  });
  
  return false;
};
