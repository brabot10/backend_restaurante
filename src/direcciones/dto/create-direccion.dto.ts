import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateDireccioneDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo direccion no de ser vacío' })
  @IsString({ message: 'El campo direccion debe ser de tipo cadena' })
  @MaxLength(250, {
    message: 'El campo direccion no debe ser mayor a 250 caracteres',
  })
  readonly direccion: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo piso no de ser vacío' })
  @IsString({ message: 'El campo piso debe ser de tipo cadena' })
  @MaxLength(100, {
    message: 'El campo piso no debe ser mayor a 100 caracteres',
  })
  readonly piso: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo indicaciones no de ser vacío' })
  @IsString({ message: 'El campo indicaciones debe ser de tipo cadena' })
  @MaxLength(100, {
    message: 'El campo indicaciones no debe ser mayor a 100 caracteres',
  })
  readonly indicaciones: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo estado no de ser vacío' })
  @IsString({ message: 'El campo estado debe ser de tipo cadena' })
  @MaxLength(30, {
    message: 'El campo estado no debe ser mayor a 30 caracteres',
  })
  readonly estado: string;

  @ApiProperty()
  @IsDefined({ message: 'El campo Cliente debe estar definido' })
  @IsNumber({}, { message: 'El campo Cliente debe ser de tipo numérico' })
  readonly idCliente: number;
}
