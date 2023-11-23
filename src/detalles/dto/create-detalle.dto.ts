import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export class CreateDetalleDto {

    @ApiProperty()
    @IsNotEmpty({ message: 'El campo dirección Estado no de ser vacío' })
    @IsString({ message: 'El campo dirección Estado debe ser de tipo cadena' })
    @MaxLength(15, { message: 'El campo dirección Estado no debe ser mayor a 15 caracteres' })
    readonly direccionEstado: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'El campo puntuación no de ser vacío' })
    @IsString({ message: 'El campo puntuación debe ser de tipo cadena' })
    @MaxLength(150, { message: 'El campo puntuación no debe ser mayor a 150 caracteres' })
    readonly puntuacion: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'El campo credibilidad no de ser vacío' })
    @IsString({ message: 'El campo credibilidad debe ser de tipo cadena' })
    @MaxLength(150, { message: 'El campo credibilidad no debe ser mayor a 150 caracteres' })
    readonly credibilidad: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'El campo amabilidad no de ser vacío' })
    @IsString({ message: 'El campo amabilidad debe ser de tipo cadena' })
    @MaxLength(150, { message: 'El campo amabilidad no debe ser mayor a 150 caracteres' })
    readonly amabilidad: string;

    @ApiProperty()
    @IsDefined({ message: 'El campo Pedido debe estar definido' })
    @IsNumber({}, { message: 'El campo Pedido debe ser de tipo numérico' })
    readonly idPedido: number;
}
