import { Module } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { PedidoController } from './pedido.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidoEntity } from './entities/pedido.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PedidoEntity])],
  controllers: [PedidoController],
  providers: [PedidoService]
})
export class PedidoModule {}
