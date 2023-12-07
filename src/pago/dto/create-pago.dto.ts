import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreatePagoDto {

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo sueldo no de ser vacío' })
  @IsNumber({}, { message: 'El campo sueldo debe ser de tipo número' })
  readonly sueldo: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo dia no de ser vacío' })
  @IsNumber({}, { message: 'El campo dia debe ser de tipo número' })
  readonly dia: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo dia Extra no de ser vacío' })
  @IsNumber({}, { message: 'El campo dia Extra debe ser de tipo número' })
  readonly diaExtra: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo descuento no de ser vacío' })
  @IsNumber({}, { message: 'El campo descuento debe ser de tipo número' })
  readonly descuento: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo total no de ser vacío' })
  @IsNumber({}, { message: 'El campo total debe ser de tipo número' })
  readonly total: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo fecha Cancelado no debe ser vacío' })
  @IsString({ message: 'El campo fecha Cancelado debe ser de tipo cadena' })
  @MaxLength(50, {
    message: 'El campo fecha Cancelado  no debe ser mayor a 250 caracteres',
  })
  readonly fechaCancelado: string;


  @ApiProperty()
  @IsDefined({ message: 'El campo Repartidor debe estar definido' })
  @IsNumber({}, { message: 'El campo Repartidor debe ser de tipo numérico' })
  readonly idRepartidor: number;
}
