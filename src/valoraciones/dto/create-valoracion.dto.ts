import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";
export class CreateValoracionDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'El campo descripcion no de ser vacío' })
    @IsString({ message: 'El campo descripcion debe ser de tipo cadena' })
    @MaxLength(50, { message: 'El campo descripcion no debe ser mayor a 50 caracteres' })
    readonly descripcion: string;

    @ApiProperty()
    @IsDefined({ message: 'El campo Platillo debe estar definido' })
    @IsNumber({}, { message: 'El campo Platillo debe ser de tipo numérico' })
    readonly idPlatillo: number;

    @ApiProperty()
    @IsDefined({ message: 'El campo Repartidor debe estar definido' })
    @IsNumber({}, { message: 'El campo Repartidor debe ser de tipo numérico' })
    readonly idRepartidor: number;
}
