import { PlatilloEntity } from "src/platillos/entities/platillo.entity";
import { RepartidorEntity } from "src/repartidor/entities/repartidor.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('valoraciones')
export class Valoracion {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'varchar', length: 50, nullable: false })
    descripcion: string;

    @Column({ name: 'id_platillo' })
    idPlatillo: number;

    @Column({ name: 'id_repartidor' })
    idRepartidor: number;

    @ManyToOne(() => PlatilloEntity, (platillos) => platillos.valoraciones)
    @JoinColumn({ name: 'id_platillo', referencedColumnName: 'id' })
    platillos: PlatilloEntity;

    @ManyToOne(() => RepartidorEntity, (repartidor) => repartidor.valoraciones)
    @JoinColumn({ name: 'id_repartidor', referencedColumnName: 'id' })
    repartidor: RepartidorEntity;
}
