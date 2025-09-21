import { Pedido } from './pedido';
import { Ingrediente } from './ingrediente';

export class Cardapio {
  id!: number;
  data!: string;
  pedidos: Pedido[] = [];
  ingredientes: Ingrediente[] = [];
}
