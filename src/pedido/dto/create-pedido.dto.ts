import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsDefined, IsNotEmpty, IsNumber} from "class-validator";

export class CreatePedidoDto {

    @ApiProperty()
    @IsNotEmpty({ message: 'El campo cantidad no de ser vacío' })
    @IsNumber({}, { message: 'El campo cantidad debe ser de tipo número' })
    readonly cantidad:number;

    @ApiProperty()
    @IsNotEmpty({ message: 'El campo total no de ser vacío' })
    @IsNumber({}, { message: 'El campo total debe ser de tipo número' })
    readonly total:number;

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

    @ApiProperty()
    @IsDefined({ message: 'El campo Cliente debe estar definido' })
    @IsNumber({}, { message: 'El campo Cliente debe ser de tipo numérico' })
    readonly idCliente: number;

    @ApiProperty()
    @IsDefined({ message: 'El campo Platillo debe estar definido' })
    @IsNumber({}, { message: 'El campo Platillo debe ser de tipo numérico' })
    readonly idPlatillo: number;

    @ApiProperty()
    @IsDefined({ message: 'El campo Direccion debe estar definido' })
    @IsNumber({}, { message: 'El campo Direccion debe ser de tipo numérico' })
    readonly idDireccion: number;
}
