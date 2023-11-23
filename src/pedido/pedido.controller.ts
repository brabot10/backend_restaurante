import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PedidoEntity } from './entities/pedido.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Pedidos')
@Controller('pedido')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)

export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post()
  @ApiCreatedResponse({ type: PedidoEntity })
  create(@Body() createPedidoDto: CreatePedidoDto) {
    return this.pedidoService.create(createPedidoDto);
  }

  @Get()
  @ApiOkResponse({ type: PedidoEntity, isArray: true })
  findAll() {
    return this.pedidoService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: PedidoEntity })
  findOne(@Param('id') id: string) {
    return this.pedidoService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: PedidoEntity })
  update(@Param('id') id: string, @Body() updatePedidoDto: UpdatePedidoDto) {
    return this.pedidoService.update(+id, updatePedidoDto);
  }

  @Delete(':id')
  @ApiOkResponse()
  remove(@Param('id') id: string) {
    return this.pedidoService.remove(+id);
  }
}
