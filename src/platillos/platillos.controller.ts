import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PlatillosService } from './platillos.service';
import { CreatePlatilloDto } from './dto/create-platillo.dto';
import { UpdatePlatilloDto } from './dto/update-platillo.dto';
import { PlatilloEntity } from './entities/platillo.entity';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';


@ApiTags('Platillos')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('platillos')
export class PlatillosController {
  constructor(private readonly platillosService: PlatillosService) {}

  @Post()
  @ApiCreatedResponse({ type: PlatilloEntity })
  create(@Body() createPlatilloDto: CreatePlatilloDto) {
    return this.platillosService.create(createPlatilloDto);
  }

  @Get()
  @ApiOkResponse({ type: PlatilloEntity, isArray: true })
  findAll() {
    return this.platillosService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: PlatilloEntity })
  findOne(@Param('id') id: string) {
    return this.platillosService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: PlatilloEntity })
  update(@Param('id') id: string, @Body() updatePlatilloDto: UpdatePlatilloDto) {
    return this.platillosService.update(+id, updatePlatilloDto);
  }

  @Delete(':id')
  @ApiOkResponse()
  remove(@Param('id') id: string) {
    return this.platillosService.remove(+id);
  }
}
