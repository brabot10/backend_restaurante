import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
  ) {}
  async create(createClienteDto: CreateClienteDto) {
    const existeCliente = await this.clienteRepository.findOneBy({
      nombreCliente: createClienteDto.nombreCliente.trim(),
      carnetIdentidad: createClienteDto.carnetIdentidad,
      fechaEdad: createClienteDto.fechaEdad,
      celular: createClienteDto.celular,

    });

    if (existeCliente) {
      throw new ConflictException(
        `El cliente ${createClienteDto.nombreCliente} ya existe.`,
      );
    }

    return this.clienteRepository.save({
      nombreCliente: createClienteDto.nombreCliente.trim(),
      carnetIdentidad: createClienteDto.carnetIdentidad,
      fechaEdad: createClienteDto.fechaEdad,
      celular: createClienteDto.celular,
    });
  }

  async findAll(): Promise<Cliente[]> {
    return this.clienteRepository.find({
    });
  }

  async findOne(id: number): Promise<Cliente> {
    const Clientes = await this.clienteRepository.findOne({
      where: { id },
    });
    if (!Clientes) {
      throw new NotFoundException(`El Cliente no existe ${id}`);
    }
    return Clientes;
  }

  async update(
    id: number,
    updateClienteDto: UpdateClienteDto,
  ): Promise<Cliente> {
    const cliente = await this.clienteRepository.findOneBy({ id });
    if (!cliente) {
      throw new NotFoundException(`El Cliente no existe ${id}`);
    }
    const clienteUpdate = Object.assign(cliente, updateClienteDto);
    return this.clienteRepository.save(clienteUpdate);
  }

  async remove(id: number) {
    const cliente = await this.clienteRepository.findOneBy({ id });

    if (!cliente) {
      throw new NotFoundException(`El cliente ${id} no existe.`);
    }

    return this.clienteRepository.delete(id);
  }
}
