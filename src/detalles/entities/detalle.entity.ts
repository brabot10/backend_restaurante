import { Cliente } from 'src/clientes/entities/cliente.entity';
import { PedidoEntity } from 'src/pedido/entities/pedido.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('detalles')
export class Detalle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 15, nullable: false })
  direccionEstado: string;

  @Column({ type: 'varchar', length: 150, nullable: false })
  puntuacion: string;

  @Column({ type: 'varchar', length: 150, nullable: false })
  credibilidad: string;

  @Column({ type: 'varchar', length: 150, nullable: false })
  amabilidad: string;

  
  @Column({ name: 'id_cliente' })
  idCliente: number;

  @Column({ name: 'id_pedido' })
  idPedido: number;

  @ManyToOne(() => Cliente, clientes => clientes.detalles)
  @JoinColumn({ name: 'id_cliente', referencedColumnName: 'id' })
  clientes: Cliente;
  
  @ManyToOne(() => PedidoEntity, pedidos => pedidos.detalles)
  @JoinColumn({ name: 'id_pedido', referencedColumnName: 'id' })
  pedidos: PedidoEntity;


}
