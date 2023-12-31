import { Module } from '@nestjs/common';
import { RepartidorService } from './repartidor.service';
import { RepartidorController } from './repartidor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RepartidorEntity } from './entities/repartidor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RepartidorEntity])],
  controllers: [RepartidorController],
  providers: [RepartidorService],
})
export class RepartidorModule {}
