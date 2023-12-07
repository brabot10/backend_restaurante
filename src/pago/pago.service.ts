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


@Injectable()
export class PagoService {
  constructor(
    @InjectRepository(Pago)
    private pagoRepository: Repository<Pago>,
  ) {}

  async create(createPagoDto: CreatePagoDto): Promise<Pago> {
    const existePago = await this.pagoRepository.findOneBy({
      sueldo: createPagoDto.sueldo,
      dia: createPagoDto.dia,
      diaExtra: createPagoDto.diaExtra,
      descuento: createPagoDto.descuento,
      total: createPagoDto.total,
      fechaCancelado: createPagoDto.fechaCancelado.trim(),
      idRepartidor: createPagoDto.idRepartidor,
    });

    if (existePago) {
      throw new ConflictException('El pago ya existe');
    }
    return this.pagoRepository.save({
      sueldo: createPagoDto.sueldo,
      dia: createPagoDto.dia,
      diaExtra: createPagoDto.diaExtra,
      descuento: createPagoDto.descuento,
      total: createPagoDto.total,
      fechaCancelado: createPagoDto.fechaCancelado.trim(),
      idRepartidor: createPagoDto.idRepartidor,
    });
  }
  async findAll(): Promise<Pago[]> {
    return this.pagoRepository.find({
      relations: { repartidor: true },
    });
  }

  async findOne(id: number): Promise<Pago> {
    const pago = await this.pagoRepository.findOne({
      where: { id },
      relations: { repartidor: true },
    });
    if (!pago) {
      throw new NotFoundException(`El pago no existe ${id}`);
    }
    return pago;
  }

  async update(id: number, updatePagoDto: UpdatePagoDto): Promise<Pago> {
    const pago = await this.pagoRepository.findOneBy({ id });
    if (!pago) {
      throw new NotFoundException(`El pago no existe ${id}`);
    }
    const pagoUpdate = Object.assign(pago, updatePagoDto);
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
