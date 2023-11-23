import { RepartidorEntity } from "src/repartidor/entities/repartidor.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity ('pagos')
export class Pago {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'varchar', length: 50, nullable: false })
    mes: string;

    @Column({ type: 'varchar', length: 250, nullable: false })
    tiempoExtra: string;


    @Column({ type: 'int', nullable: false })
    total: number;


    @ManyToOne(() => RepartidorEntity, (repartidor) => repartidor.pagos)
    @JoinColumn({ name: 'id_repartidor', referencedColumnName: 'id' })
    repartidor: RepartidorEntity;
}
