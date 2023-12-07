import { PartialType } from '@nestjs/swagger';
import { CreateDireccioneDto } from './create-direccion.dto';

export class UpdateDireccioneDto extends PartialType(CreateDireccioneDto) {}
