import { Module } from '@nestjs/common';
import { CronModule } from './cron/cron.module';
import { ConfigModule } from '@nestjs/config';
import { StaffModule } from './staff/staff.module';
import { MsGraphModule } from './ms-graph/ms-graph.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CronModule,
    MsGraphModule,
    StaffModule,
  ],
})
export class AppModule {}
