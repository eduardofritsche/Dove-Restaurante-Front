export class Usuario {
  id!: number;
  nome!: string;
  email!: string;
  senha!: string;
  cpf!: string;
  tipo!: 'CLIENTE' | 'ADMIN' | 'FUNCIONARIO';
  pedidos!: any[];
}
