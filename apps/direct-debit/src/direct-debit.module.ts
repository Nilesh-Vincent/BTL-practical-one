import { Module } from '@nestjs/common';
import { DirectDebitService } from './direct-debit.service';
import { DirectDebitController } from './direct-debit.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AUTH_SERVICE, DatabaseModule, LoggerModule } from 'y/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';
import { DirectDebitDocument, DirectDebitSchema } from './model/direct-debit.model';
import { DirectDebitRepository } from './direct-debit.repository';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: DirectDebitDocument.name, schema: DirectDebitSchema },
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
  controllers: [DirectDebitController],
  providers: [DirectDebitService, DirectDebitRepository],
})
export class DirectDebitModule {}
