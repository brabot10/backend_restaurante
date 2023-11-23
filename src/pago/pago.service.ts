import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePagoDto } from './dto/create-pago.dto';
import { UpdatePagoDto } from './dto/update-pago.dto';
import { Pago } from './entities/pago.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RepartidorEntity } from 'src/repartidor/entities/repartidor.entity';

@Injectable()
export class PagoService {
  constructor(
    @InjectRepository(Pago)
    private pagoRepository: Repository<Pago>,
  ) {}

  async create(createPagoDto: CreatePagoDto): Promise<Pago> {
    const existePago = await this.pagoRepository.findOneBy({
      mes: createPagoDto.mes.trim(),
      repartidor: { id: createPagoDto.idRepartidor },
    });

    if (existePago) {
      throw new ConflictException('El pago ya existe');
    }
    return this.pagoRepository.save({
      mes: createPagoDto.mes.trim(),
      tiempoExtra: createPagoDto.tiempoExtra.trim(),
      total: createPagoDto.total,
      repartidor: { id: createPagoDto.idRepartidor },
    });
  }
  async findAll(): Promise<Pago[]> {
    return this.pagoRepository.find({
      relations: ['repartidor'],
    });
  }

  async findOne(id: number): Promise<Pago> {
    const pago = await this.pagoRepository.findOne({
      where: { id },
      relations: ['repartidor'],
    });
    if (!pago) {
      throw new NotFoundException(`El pago no existe ${id}`);
    }
    return pago;
  }

  async update(
    id: number,
    updatePagoDto: UpdatePagoDto,
  ): Promise<Pago> {
    const pago = await this.pagoRepository.findOneBy({ id });
    if (!pago) {
      throw new NotFoundException(`El pago no existe ${id}`);
    }
    const pagoUpdate = Object.assign(pago, updatePagoDto);
    pagoUpdate.repartidor = { id: updatePagoDto.idRepartidor } as RepartidorEntity;
    return this.pagoRepository.save(pagoUpdate);
  }

  async remove(id: number) {
    const pago = await this.pagoRepository.findOneBy({ id });
    if (!pago) {
      throw new NotFoundException(`El pago no existé ${id}`);
    }
    return this.pagoRepository.delete(id);
  }
}
