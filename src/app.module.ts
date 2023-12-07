import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './usuario/usuario.module';
import { PedidoModule } from './pedido/pedido.module';
import { PlatillosModule } from './platillos/platillos.module';
import { RepartidorModule } from './repartidor/repartidor.module';
import { PagoModule } from './pago/pago.module';
import { DetallesModule } from './detalles/detalles.module';
import { ClientesModule } from './clientes/clientes.module';
import { DireccionesModule } from './direcciones/direcciones.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '**/*.entity.ts'],
      synchronize: true,
      autoLoadEntities: true,
    }),

    AuthModule,
    RepartidorModule,
    PedidoModule,
    DetallesModule,
    PagoModule,
    PlatillosModule,
    UsuarioModule,
    ClientesModule,
    DireccionesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
