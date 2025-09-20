import { Pedido } from './pedido';

export class Funcionario {
  id?: number;
  nome!: string;
  cpf!: string;
  pedidos: Pedido[] = [];
}
