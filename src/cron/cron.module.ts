import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MsGraphModule } from 'src/ms-graph/ms-graph.module';
import { StaffModule } from 'src/staff/staff.module';
import { CronService } from './cron.service';

@Module({
  imports: [
    ConfigModule,
    StaffModule,
    MsGraphModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          tenant: configService.get<string>('AZ_TENANT_ID'),
          appClientId: configService.get<string>('AZ_CLIENT_APP_ID'),
          appClientSecret: configService.get<string>('AZ_CLIENT_APP_SECRET'),
          appClientScope: [configService.get<string>('AZ_CLIENT_APP_SCOPE')],
          debug: true,
        };
      },
    }),
  ],
  providers: [CronService],
})
export class CronModule {}
