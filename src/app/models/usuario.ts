export class Usuario {
  id!: number;
  nome!: string;
  username!: string;
  email!: string;
  senha!: string;
  cpf!: string;
  tipo!: 'CLIENTE' | 'ADMIN' | 'FUNCIONARIO';
  pedidos!: any[];
}
