import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RepartidorService } from './repartidor.service';
import { CreateRepartidorDto } from './dto/create-repartidor.dto';
import { UpdateRepartidorDto } from './dto/update-repartidor.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RepartidorEntity } from './entities/repartidor.entity';


@ApiTags('Repartidor')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('repartidor')
export class RepartidorController {
  constructor(private readonly repartidorService: RepartidorService) {}

  @Post()
  @ApiCreatedResponse({ type: RepartidorEntity })
  create(@Body() createRepartidorDto: CreateRepartidorDto) {
    return this.repartidorService.create(createRepartidorDto);
  }

  @Get()
  @ApiOkResponse({ type: RepartidorEntity, isArray: true })
  findAll() {
    return this.repartidorService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: RepartidorEntity })
  findOne(@Param('id') id: string) {
    return this.repartidorService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: RepartidorEntity })
  update(@Param('id') id: string, @Body() updateRepartidorDto: UpdateRepartidorDto) {
    return this.repartidorService.update(+id, updateRepartidorDto);
  }

  @Delete(':id')
  @ApiOkResponse()
  remove(@Param('id') id: string) {
    return this.repartidorService.remove(+id);
  }
}
