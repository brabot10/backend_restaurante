import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { DireccionesService } from './direcciones.service';
import { CreateDireccioneDto } from './dto/create-direccion.dto';
import { UpdateDireccioneDto } from './dto/update-direccion.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';


@ApiTags('Direcciones')
@Controller('direcciones')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class DireccionesController {
  constructor(private readonly direccionesService: DireccionesService) {}

  @Post()
  create(@Body() createDireccioneDto: CreateDireccioneDto) {
    return this.direccionesService.create(createDireccioneDto);
  }

  @Get()
  findAll() {
    return this.direccionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.direccionesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDireccioneDto: UpdateDireccioneDto,
  ) {
    return this.direccionesService.update(+id, updateDireccioneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.direccionesService.remove(+id);
  }
}
