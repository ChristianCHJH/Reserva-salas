import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SalasModule } from './salas/salas.module';
import { ReservasModule } from './reservas/reservas.module';
import { DatabaseModule } from './config/database.config';
import { UsuariosModule } from './usuarios/usuarios.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    SalasModule,
    ReservasModule,
    UsuariosModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
