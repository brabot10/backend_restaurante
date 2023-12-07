import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateRepartidorDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo nombre del repartidor no debe ser vacío' })
  @IsString({
    message: 'El campo nombre del repartidor debe ser de tipo cadena',
  })
  @MaxLength(100, {
    message:
      'El campo nombre del repartidor  no debe ser mayor a 100 caracteres',
  })
  readonly nombreRepartidor: string;


  @ApiProperty()
  @IsNotEmpty({ message: 'El campo carnet de Identidad no debe ser vacío' })
  @IsString({
    message: 'El campo ncarnet de Identidad  debe ser de tipo cadena',
  })
  @MaxLength(100, {
    message:
      'El campo carnet de Identidad  no debe ser mayor a 100 caracteres',
  })
  readonly carnetIdentidad: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo Edad debe estar definido' })
  @IsDateString({}, { message: 'El campo Edad debe ser de tipo fecha' })
  readonly fechaEdad: Date;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo ingreso a trabajar debe estar definido' })
  @IsDateString({}, { message: 'El campo ingreso a trabajar debe ser de tipo fecha' })
  readonly fechaIngreso: Date;
}
