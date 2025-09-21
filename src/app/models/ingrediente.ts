import { Pedido } from './pedido';
import { Cardapio } from './cardapio';

export class Ingrediente {
  id!: number;
  descricao!: string;
  pedidos: Pedido[] = [];
  cardapios: Cardapio[] = [];
}
