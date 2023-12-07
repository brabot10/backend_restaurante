import { Detalle } from 'src/detalles/entities/detalle.entity';
import { Direccion } from 'src/direcciones/entities/direccion.entity';
import { PedidoEntity } from 'src/pedido/entities/pedido.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('clientes')
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  nombreCliente: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  carnetIdentidad: string;

  @Column({ name: 'fecha_Edad' })
  fechaEdad: Date;

  @Column({ type: 'int', nullable: false })
  celular: number;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @OneToMany(() => PedidoEntity, pedidos => pedidos.clientes)
  pedidos: PedidoEntity;

  @OneToMany(() => Detalle, detalles => detalles.clientes)
  detalles: Detalle;

  @OneToMany(() => Direccion, direcciones => direcciones.clientes)
  direcciones: Detalle;
}
