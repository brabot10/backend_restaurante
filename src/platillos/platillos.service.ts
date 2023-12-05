import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePlatilloDto } from './dto/create-platillo.dto';
import { UpdatePlatilloDto } from './dto/update-platillo.dto';
import { PlatilloEntity } from './entities/platillo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PlatillosService {
  constructor(
    @InjectRepository(PlatilloEntity)
    private platilloRepository: Repository<PlatilloEntity>,
  ) {}
  async create(createPlatilloDto: CreatePlatilloDto): Promise<PlatilloEntity> {
    const existe = await this.platilloRepository.findOneBy({
      nombre: createPlatilloDto.nombre.trim(),
      precio: createPlatilloDto.precio,
      idPedido: createPlatilloDto.idPedido,
    });

    if (existe) {
      throw new ConflictException(
        `El nombre del producto ${createPlatilloDto.nombre} ya existe.`,
      );
    }

    return this.platilloRepository.save({
      nombre: createPlatilloDto.nombre.trim(),
      precio: createPlatilloDto.precio,
      idPedido: createPlatilloDto.idPedido,
    });
  }

  async findAll(): Promise<PlatilloEntity[]> {
    return this.platilloRepository.find({ 
      relations: { pedidos : true }, 
    });
  }

  async findOne(id: number): Promise<PlatilloEntity> {
    const platillo = await this.platilloRepository.findOne({ 
      where: { id },
      relations: { pedidos : true },
    });

    if (!platillo) {
      throw new NotFoundException(`El platillo ${id} no existe.`);
    }

    return platillo;
  }

  async update(id: number, updatePlatilloDto: UpdatePlatilloDto): Promise<PlatilloEntity> {
    const platillo = await this.platilloRepository.findOneBy({ id });
    if (!platillo) {
      throw new NotFoundException(`El platillo ${id} no existe.`);
    }
    const platilloUpdate = Object.assign(platillo, updatePlatilloDto);
    return this.platilloRepository.save(platilloUpdate);
  }

  async remove(id: number) {
    const existe = await this.platilloRepository.findOneBy({ id });

    if (!existe) {
      throw new NotFoundException(`El platillo ${id} no existe.`);
    }

    return this.platilloRepository.delete(id);
  }
}
