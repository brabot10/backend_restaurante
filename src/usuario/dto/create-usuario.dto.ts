import { ApiProperty } from "@nestjs/swagger";
import {  IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateUsuarioDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo usuario no debe ser vacío' })
  @IsString({ message: 'El campo usuario debe ser de tipo cadena' })
  @MaxLength(20, { message: 'El campo usuario no debe ser mayor a 20 caracteres' })
  readonly usuario: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo email no debe ser vacío' })
  @IsEmail({}, { message: 'El campo email debe ser un email válido' })
  @MaxLength(50, { message: 'El campo email no debe ser mayor a 50 caracteres' })
  readonly email: string;

}
