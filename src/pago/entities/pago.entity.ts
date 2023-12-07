import { RepartidorEntity } from 'src/repartidor/entities/repartidor.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('pagos')
export class Pago {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: false })
  sueldo: number;

  @Column({ type: 'int', nullable: false })
  dia: number;

  @Column({ type: 'int', nullable: false })
  diaExtra: number;

  @Column({ type: 'int', nullable: false })
  descuento: number;
  
  @Column({ type: 'int', nullable: false })
  total: number;

  @Column({ type: 'varchar', length: 250, nullable: false })
  fechaCancelado: string;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @Column({ name: 'id_repartidor' })
  idRepartidor: number;

  @ManyToOne(() => RepartidorEntity, repartidor => repartidor.pagos)
  @JoinColumn({ name: 'id_repartidor', referencedColumnName: 'id' })
  repartidor: RepartidorEntity;
}
