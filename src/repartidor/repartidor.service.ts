import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRepartidorDto } from './dto/create-repartidor.dto';
import { UpdateRepartidorDto } from './dto/update-repartidor.dto';
import { RepartidorEntity } from './entities/repartidor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RepartidorService {
  constructor(
    @InjectRepository(RepartidorEntity)
    private repartidorRepository: Repository<RepartidorEntity>,
  ) {}

  async create(
    createRepartidorDto: CreateRepartidorDto,
  ): Promise<RepartidorEntity> {
    const existe = await this.repartidorRepository.findOneBy({
      nombreR: createRepartidorDto.nombreR.trim(),
    });

    if (existe) {
      throw new ConflictException(`El repartidor ${createRepartidorDto.nombreR} ya existe.`);
    }

    return this.repartidorRepository.save({
      nombreR:createRepartidorDto.nombreR.trim(),
      carnet:createRepartidorDto.carnet,
      edad:createRepartidorDto.edad,

    });
  }
  async findAll(): Promise<RepartidorEntity[]> {
    return this.repartidorRepository.find();
  }

  async findOne(id: number): Promise<RepartidorEntity> {
    const repartidor = await this.repartidorRepository.findOneBy({id});

    if (!repartidor) {
      throw new NotFoundException(`El repartidor ${id} no existe.`);
    }

    return repartidor;
  }

  async update(id: number, updateRepartidorDto: UpdateRepartidorDto) {
    const repartidor = await this.repartidorRepository.findOneBy({id});

    if (!repartidor) {
      throw new NotFoundException(`El repartidor ${id} no existe.`);
    }

    const repartidorUpdate = Object.assign(repartidor, updateRepartidorDto);
    return this.repartidorRepository.save(repartidorUpdate);
  }

  async remove(id: number) {
    const existe = await this.repartidorRepository.findOneBy({id});

    if (!existe) {
      throw new NotFoundException(`El repartidor ${id} no existe.`);
    }

    return this.repartidorRepository.delete(id);
  }
}
