import { PedidoEntity } from "src/pedido/entities/pedido.entity";
import { Valoracion } from "src/valoraciones/entities/valoracion.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('platillos')
export class PlatilloEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  nombre: string;
  
  @Column({ type: 'int', nullable: false })
  precio:number;

  @Column({ name: 'id_pedido' })
  idPedido: number;

  @OneToMany(() => Valoracion, (valoraciones) => valoraciones.platillos)
  valoraciones: Valoracion[];

  @ManyToOne(() => PedidoEntity, (pedidos) => pedidos.platillos)
  @JoinColumn({ name: 'id_pedido', referencedColumnName: 'id' })
  pedidos: PedidoEntity;
}
