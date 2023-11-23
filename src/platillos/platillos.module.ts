import { Module } from '@nestjs/common';
import { PlatillosService } from './platillos.service';
import { PlatillosController } from './platillos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlatilloEntity } from './entities/platillo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlatilloEntity])],
  controllers: [PlatillosController],
  providers: [PlatillosService]
})
export class PlatillosModule {}
