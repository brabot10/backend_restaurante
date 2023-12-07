import { Cliente } from 'src/clientes/entities/cliente.entity';
import { Detalle } from 'src/detalles/entities/detalle.entity';
import { Direccion } from 'src/direcciones/entities/direccion.entity';
import { PlatilloEntity } from 'src/platillos/entities/platillo.entity';
import { RepartidorEntity } from 'src/repartidor/entities/repartidor.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('pedidos')
export class PedidoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: false })
  cantidad: number;

  @Column({ type: 'int', nullable: false })
  total: number;

  @CreateDateColumn({ name: 'fecha_pedido' })
  fechaPedido: Date;

  @Column({ name: 'id_repartidor' })
  idRepartidor: number;

  @Column({ name: 'id_cliente' })
  idCliente: number;

  @Column({ name: 'id_platillo' })
  idPlatillo: number;

  @Column({ name: 'id_direccion' })
  idDireccion: number;


  @ManyToOne(() => RepartidorEntity, repartidor => repartidor.pedidos)
  @JoinColumn({ name: 'id_repartidor', referencedColumnName: 'id' })
  repartidor: RepartidorEntity;

  @ManyToOne(() => Cliente, clientes => clientes.pedidos)
  @JoinColumn({ name: 'id_cliente', referencedColumnName: 'id' })
  clientes: Cliente;
  
  @ManyToOne(() => PlatilloEntity, platillos => platillos.pedidos)
  @JoinColumn({ name: 'id_platillo', referencedColumnName: 'id' })
  platillos: PlatilloEntity;

  @ManyToOne(() => Direccion, direcciones => direcciones.pedidos)
  @JoinColumn({ name: 'id_direccion', referencedColumnName: 'id' })
  direcciones: PlatilloEntity;

  @OneToMany(() => Detalle, detalles => detalles.pedidos)
  detalles: Detalle;


}
