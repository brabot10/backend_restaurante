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
import { PedidoEntity } from 'src/pedido/entities/pedido.entity';

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
      pedidos: { id: createPlatilloDto.idPedido },
    });

    if (existe) {
      throw new ConflictException(
        `El nombre del producto ${createPlatilloDto.nombre} ya existe.`,
      );
    }

    return this.platilloRepository.save({
      nombre: createPlatilloDto.nombre.trim(),
      precio: createPlatilloDto.precio,
      pedidos: { id: createPlatilloDto.idPedido },
    });
  }

  async findAll(): Promise<PlatilloEntity[]> {
    return this.platilloRepository.find({ relations: ['pedidos'] });
  }

  async findOne(id: number): Promise<PlatilloEntity> {
    const platillo = await this.platilloRepository.findOne({ 
      where: { id },
      relations: ['pedidos'],
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
    platilloUpdate.pedidos = { id: updatePlatilloDto.idPedido } as PedidoEntity;
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
