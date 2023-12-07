import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDireccioneDto } from './dto/create-direccion.dto';
import { UpdateDireccioneDto } from './dto/update-direccion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Direccion } from './entities/direccion.entity';


@Injectable()
export class DireccionesService {
  constructor(
    @InjectRepository(Direccion)
    private direccionRepository: Repository<Direccion>,
  ) {}
  
  async create(CreateDireccionDto: CreateDireccioneDto): Promise<Direccion> {
    const existe = await this.direccionRepository.findOneBy({
      direccion: CreateDireccionDto.direccion.trim(),
      piso: CreateDireccionDto.piso.trim(),
      indicaciones: CreateDireccionDto.indicaciones.trim(),
      estado: CreateDireccionDto.estado.trim(),
      idCliente: CreateDireccionDto.idCliente,
    });

    if (existe) {
      throw new ConflictException('El direccion ya existe');
    }

    return this.direccionRepository.save({
      direccion: CreateDireccionDto.direccion.trim(),
      piso: CreateDireccionDto.piso.trim(),
      indicaciones: CreateDireccionDto.indicaciones.trim(),
      estado: CreateDireccionDto.estado.trim(),
      idCliente: CreateDireccionDto.idCliente,
    });
  }

  async findAll(): Promise<Direccion[]> {
    return this.direccionRepository.find({
      relations: { clientes: true },
    });
  }

  async findOne(id: number): Promise<Direccion> {
    const direccion = await this.direccionRepository.findOne({
      where: { id },
      relations: { clientes: true },
    });

    if (!direccion) {
      throw new NotFoundException(`El direccion ${id} no existe.`);
    }
    return direccion;
  }

  async update(
    id: number,
    updatedireccionDto: UpdateDireccioneDto,
  ): Promise<Direccion> {
    const direccion = await this.direccionRepository.findOneBy({ id });
    if (!direccion) {
      throw new NotFoundException(`El direccion ${id} no existe.`);
    }
    const direccionUpdate = Object.assign(direccion, updatedireccionDto);
    //direccionUpdate.repartidor = { id: updatedireccionDto.idRepartidor } as RepartidorEntity;
    return this.direccionRepository.save(direccionUpdate);
  }

  async remove(id: number) {
    const existe = await this.direccionRepository.findOneBy({ id });

    if (!existe) {
      throw new NotFoundException(`El direccion ${id} no existe.`);
    }

    return this.direccionRepository.delete(id);
  }
}
