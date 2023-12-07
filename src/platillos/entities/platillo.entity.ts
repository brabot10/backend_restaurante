import { PedidoEntity } from 'src/pedido/entities/pedido.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('platillos')
export class PlatilloEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  nombre: string;

  @Column({ type: 'varchar', length: 250, nullable: false })
  urlPlatillo: string;

  @Column({ type: 'int', nullable: false })
  precio: number;

  @Column({ type: 'int', nullable: false })
  tiempoPraparacion: number;

  @Column({ type: 'int', nullable: false })
  disponibilidad: number;

  @OneToMany(() => PedidoEntity, pedidos => pedidos.platillos)
  pedidos: PedidoEntity[];
}
