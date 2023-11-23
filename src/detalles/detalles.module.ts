import { Module } from '@nestjs/common';
import { DetallesService } from './detalles.service';
import { DetallesController } from './detalles.controller';
import { Detalle } from './entities/detalle.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Detalle])],
  controllers: [DetallesController],
  providers: [DetallesService]
})
export class DetallesModule {}
