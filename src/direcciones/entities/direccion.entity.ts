import { Cliente } from "src/clientes/entities/cliente.entity";
import { PedidoEntity } from "src/pedido/entities/pedido.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";

@Entity('direcciones')
export class Direccion {
    @PrimaryColumn()
    id: number;
  
    @Column({ type: 'varchar', length: 250, nullable: false })
    direccion: string;
  
    @Column({ type: 'varchar', length: 100, nullable: false })
    piso: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    indicaciones: string;

    @Column({ type: 'varchar', length: 30, nullable: false })
    estado: string;

    @Column({ name: 'fecha_registro' })
    fechaRegistro: Date;

    @Column({ name: 'id_cliente' })
    idCliente: number;

    @OneToMany(() => PedidoEntity, pedidos => pedidos.direcciones)
    pedidos: PedidoEntity;

    @ManyToOne(() => Cliente, clientes => clientes.direcciones)
    @JoinColumn({ name: 'id_cliente', referencedColumnName: 'id' })
    clientes: Cliente;
}
