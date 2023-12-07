import { Pago } from 'src/pago/entities/pago.entity';
import { PedidoEntity } from 'src/pedido/entities/pedido.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('repartidor')
export class RepartidorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  nombreRepartidor: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  carnetIdentidad: string;

  @Column({ name: 'fecha_Edad' })
  fechaEdad: Date;

  @Column({ name: 'fecha_Ingreso' })
  fechaIngreso: Date;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @OneToMany(() => PedidoEntity, pedidos => pedidos.repartidor)
  pedidos: PedidoEntity[];

  @OneToMany(() => Pago, pagos => pagos.repartidor)
  pagos: Pago[];
}
