import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsDefined, IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export class CreatePedidoDto {

    @ApiProperty()
    @IsNotEmpty({ message: 'El campo nombre cliente del producto no debe ser vacío' })
    @IsString({ message: 'El campo nombre cliente debe ser de tipo cadena' })
    @MaxLength(100, {
        message: 'El campo nombre cliente no debe ser mayor a 100 caracteres',
      })
    readonly nombreC: string;

    @ApiProperty()
    @IsNotEmpty({message:'el campo de dirección no debe estar vacío'})
    @IsString({ message: 'El campo de dirección debe ser de tipo cadena' })
    @MaxLength(100, {
        message: 'El campo dirección no debe ser mayor a 100 caracteres',
      })
    readonly direccion:string;

    @ApiProperty()
    @IsNotEmpty({ message: 'El campo nombre del producto no debe ser vacío' })
    @IsString({ message: 'El campo nombre del producto debe ser de tipo cadena' })
    @MaxLength(100, {
        message: 'El campo nombre del producto  no debe ser mayor a 100 caracteres',
      })
    readonly nombreProducto: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'El campo cantidad no de ser vacío' })
    @IsNumber({}, { message: 'El campo cantidad debe ser de tipo número' })
    readonly cantidad:number;

    @ApiProperty({ example: '2005-05-01' })
    @IsDefined({ message: 'El campo fecha del Pedido no de ser vacío' })
    @IsDateString(
      {},
      { message: 'El campo fecha del Pedido debe ser de tipo fecha' },
    )
    readonly fechaPedido: Date;

    @ApiProperty()
    @IsDefined({ message: 'El campo Repartidor debe estar definido' })
    @IsNumber({}, { message: 'El campo Repartidor debe ser de tipo numérico' })
    readonly idRepartidor: number;
}
