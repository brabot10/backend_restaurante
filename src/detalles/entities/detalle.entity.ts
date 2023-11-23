import { PedidoEntity } from "src/pedido/entities/pedido.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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
  
    @ManyToOne(() => PedidoEntity, (pedidos) => pedidos.detalles)
    @JoinColumn({ name: 'id_pedido', referencedColumnName: 'id' })
    pedidos: PedidoEntity;
}
