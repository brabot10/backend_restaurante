import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PedidoEntity } from './entities/pedido.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(PedidoEntity)
    private pedidoRepository: Repository<PedidoEntity>,
  ) {}
  async create(createPedidoDto: CreatePedidoDto): Promise<PedidoEntity> {
    const existe = await this.pedidoRepository.findOneBy({
      idRepartidor: createPedidoDto.idRepartidor,
      nombreProducto: createPedidoDto.nombreProducto.trim(),
    });

    if (existe) {
      throw new ConflictException('El Pedido ya existe');
    }

    return this.pedidoRepository.save({
      nombreProducto: createPedidoDto.nombreProducto.trim(),
      direccion: createPedidoDto.direccion.trim(),
      nombreC: createPedidoDto.nombreC.trim(),
      cantidad: createPedidoDto.cantidad,
      idRepartidor: createPedidoDto.idRepartidor,
    });
  }

  async findAll(): Promise<PedidoEntity[]> {
    return this.pedidoRepository.find({ 
      relations: { repartidor: true },
    });
  }

  async findOne(id: number): Promise<PedidoEntity> {
    const pedido = await this.pedidoRepository.findOne({ 
      where: { id },
      relations:{ repartidor: true },
    });

    if (!pedido) {
      throw new NotFoundException(`El pedido ${id} no existe.`);
    }
    return pedido;
  }

  async update(id: number, updatePedidoDto: UpdatePedidoDto): Promise<PedidoEntity> {
    const pedido = await this.pedidoRepository.findOneBy({ id });
    if (!pedido) {
      throw new NotFoundException(`El pedido ${id} no existe.`);
    }
    const pedidoUpdate = Object.assign(pedido, updatePedidoDto);
    //pedidoUpdate.repartidor = { id: updatePedidoDto.idRepartidor } as RepartidorEntity;
    return this.pedidoRepository.save(pedidoUpdate);
  }

  async remove(id: number) {
    const existe = await this.pedidoRepository.findOneBy({ id });

    if (!existe) {
      throw new NotFoundException(`El pedido ${id} no existe.`);
    }

    return this.pedidoRepository.delete(id);
  }
}
