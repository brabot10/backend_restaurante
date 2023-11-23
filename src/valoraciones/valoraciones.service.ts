import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateValoracionDto } from './dto/create-valoracion.dto';
import { UpdateValoracionDto } from './dto/update-valoracion.dto';
import { Valoracion } from './entities/valoracion.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PlatilloEntity } from 'src/platillos/entities/platillo.entity';
import { RepartidorEntity } from 'src/repartidor/entities/repartidor.entity';

@Injectable()
export class ValoracionesService {
  constructor(
    @InjectRepository(Valoracion)
    private valoracionRepository: Repository<Valoracion>,
  ) {}

  async create(createValoracionDto: CreateValoracionDto): Promise<Valoracion> {
    const existeValoracion = await this.valoracionRepository.findOneBy({
      descripcion: createValoracionDto.descripcion,
      platillos: { id: createValoracionDto.idPlatillo },
    });

    if (existeValoracion) {
      throw new ConflictException('La valoracion ya existe');
    }

    return this.valoracionRepository.save({
      descripcion: createValoracionDto.descripcion.trim(),
      platillos: { id: createValoracionDto.idPlatillo },
      repartidor: { id: createValoracionDto.idRepartidor },
    });
  }
  async findAll(): Promise<Valoracion[]> {
    return this.valoracionRepository.find({
      relations: ['platillos', 'repartidor'],
    });
  }

  async findOne(id: number): Promise<Valoracion> {
    const valoracion = await this.valoracionRepository.findOne({
      where: { id },
      relations: ['platillos', 'repartidor'],
    });
    if (!valoracion) {
      throw new NotFoundException(`La valoración no existe ${id}`);
    }
    return valoracion;
  }

  async update(
    id: number,
    updateValoracionDto: UpdateValoracionDto,
  ): Promise<Valoracion> {
    const valoracion = await this.valoracionRepository.findOneBy({ id });
    if (!valoracion) {
      throw new NotFoundException(`La valoración no existe ${id}`);
    }
    const valoracionUpdate = Object.assign(valoracion, updateValoracionDto);
    valoracionUpdate.platillos = { id: updateValoracionDto.idPlatillo } as PlatilloEntity;
    valoracionUpdate.repartidor = { id: updateValoracionDto.idRepartidor } as RepartidorEntity;
    return this.valoracionRepository.save(valoracionUpdate);
  }

  async remove(id: number) {
    const valoracion = await this.valoracionRepository.findOneBy({ id });
    if (!valoracion) {
      throw new NotFoundException(`La valoración no existé ${id}`);
    }
    return this.valoracionRepository.delete(id);
  }
}
