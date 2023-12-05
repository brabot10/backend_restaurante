import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDetalleDto } from './dto/create-detalle.dto';
import { UpdateDetalleDto } from './dto/update-detalle.dto';
import { Detalle } from './entities/detalle.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';



@Injectable()
export class DetallesService {
  constructor(
    @InjectRepository(Detalle)
    private detalleRepository: Repository<Detalle>,
  ) {}
  async create(createDetalleDto: CreateDetalleDto): Promise<Detalle> {
    const existe = await this.detalleRepository.findOneBy({
      direccionEstado: createDetalleDto.direccionEstado.trim(),
      idPedido: createDetalleDto.idPedido,
    });

    if (existe) {
      throw new ConflictException(
        `La dirección del pedido ${createDetalleDto.direccionEstado} ya existe.`,
      );
    }

    return this.detalleRepository.save({
      direccionEstado: createDetalleDto.direccionEstado.trim(),
      puntuacion: createDetalleDto.puntuacion.trim(),
      credibilidad: createDetalleDto.credibilidad.trim(),
      amabilidad: createDetalleDto.amabilidad.trim(),
      idPedido: createDetalleDto.idPedido,
    });
  }

  async findAll(): Promise<Detalle[]> {
    return this.detalleRepository.find({ 
      relations: { pedidos : true }, //referencia al entity
    });
  }

  async findOne(id: number): Promise<Detalle> {
    const detalle = await this.detalleRepository.findOne({ 
      where: { id },
      relations: { pedidos : true },
    });

    if (!detalle) {
      throw new NotFoundException(`El detalle ${id} no existe.`);
    }

    return detalle;
  }

  async update(id: number, updateDetalleDto: UpdateDetalleDto): Promise<Detalle> {
    const detalle = await this.detalleRepository.findOneBy({ id });
    if (!detalle) {
      throw new NotFoundException(`El detalle ${id} no existe.`);
    }
    const detalleUpdate = Object.assign(detalle, updateDetalleDto);
    return this.detalleRepository.save(detalleUpdate);
  }

  async remove(id: number) {
    const existe = await this.detalleRepository.findOneBy({ id });

    if (!existe) {
      throw new NotFoundException(`El detalle ${id} no existe.`);
    }

    return this.detalleRepository.delete(id);
  }
}
