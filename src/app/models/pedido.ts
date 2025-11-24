import { Cardapio } from './cardapio';
import { Ingrediente } from './ingrediente';
import { Usuario } from './usuario';

export class Pedido {
  id!: number;
  marmita!: string;
  status!: string;
  hora_inicio!: string;
  hora_fim!: string;
  cardapio!: Cardapio;
  // funcionario!: Funcionario;
  // cliente!: Cliente;
  usuario?: Usuario;
  ingredientes: Ingrediente[] = [];
}
