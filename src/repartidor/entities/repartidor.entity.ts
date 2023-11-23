import { Pago } from "src/pago/entities/pago.entity";
import { PedidoEntity } from "src/pedido/entities/pedido.entity";
import { Valoracion } from "src/valoraciones/entities/valoracion.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('repartidor')
export class RepartidorEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100, nullable: false })
    nombreR:string;

    @Column({ type: 'int', nullable: false })
    carnet:number;

    @Column({ type: 'int', nullable: false })
    edad:number;

    @OneToMany(() => PedidoEntity, (pedidos) => pedidos.repartidor)
    pedidos: PedidoEntity[];

    @OneToMany(() => Valoracion, (valoraciones) => valoraciones.repartidor)
    valoraciones: Valoracion[];

    @OneToMany(() => Pago, (pagos) => pagos.repartidor)
    pagos: Pago[];
}
