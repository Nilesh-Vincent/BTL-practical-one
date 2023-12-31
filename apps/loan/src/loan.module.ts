import { Module } from '@nestjs/common';
import { LoanController } from './loan.controller';
import { LoanService } from './loan.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AUTH_SERVICE, DatabaseModule, LoggerModule } from 'y/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';
import { LoanDocument, LoanSchema } from './model/loan.schema';
import { LoanRepository } from './loan.repository';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    HttpModule,
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: LoanDocument.name, schema: LoanSchema },
    ]),
    ClientsModule.registerAsync([
      {
        name: AUTH_SERVICE,
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('AUTH_SERVICE_HOST'),
            port: configService.get('TCP_PORT'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
    JwtModule.register({}),
  ],
  controllers: [LoanController],
  providers: [LoanService, LoanRepository],
})
export class LoanModule {}
