import { Cardapio } from './cardapio';
import { Funcionario } from './funcionario';
import { Cliente } from './cliente';
import { Ingrediente } from './ingrediente';

export class Pedido {
  id!: number;
  marmita!: string;
  status!: string;
  hora_inicio!: string;
  hora_fim!: string;
  cardapio!: Cardapio;
  funcionario!: Funcionario;
  cliente!: Cliente;
  ingredientes: Ingrediente[] = [];
}
