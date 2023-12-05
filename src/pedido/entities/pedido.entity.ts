
import { Detalle } from "src/detalles/entities/detalle.entity";
import { PlatilloEntity } from "src/platillos/entities/platillo.entity";
import { RepartidorEntity } from "src/repartidor/entities/repartidor.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('pedidos')
export class PedidoEntity {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({ type: 'varchar', length: 100, nullable: false })
  nombreC:string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  direccion: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  nombreProducto:string;

  @Column({ type: 'int', nullable: false })
  cantidad:number;

  @CreateDateColumn({ name: 'fecha_pedido' })
  fechaPedido: Date;

  @Column({ name: 'id_repartidor' })
  idRepartidor: number;

  @ManyToOne(() => RepartidorEntity, (repartidor) => repartidor.pedidos)
  @JoinColumn({ name: 'id_repartidor', referencedColumnName: 'id' })
  repartidor: RepartidorEntity;

  @OneToMany(() => PlatilloEntity, (platillos) => platillos.pedidos)
  platillos: PlatilloEntity[];

  @OneToMany(() => Detalle, (detalles) => detalles.pedidos)
  detalles: Detalle[];
}
