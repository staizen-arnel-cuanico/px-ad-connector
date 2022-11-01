import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { STAFF_PACKAGE_NAME } from './proto/staff.pb';
import { StaffService } from './staff.service';
import * as grpc from '@grpc/grpc-js';

@Module({
  providers: [
    StaffService,
    {
      provide: STAFF_PACKAGE_NAME,
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.GRPC,
          options: {
            url:
              configService.get<string>('STAFF_SERVICE_URL') || '0.0.0.0:5001',
            package: STAFF_PACKAGE_NAME,
            protoPath: join(__dirname, '../../staff/proto/staff.proto'),
            // Check if SSL is enabled on the service URL
            credentials: Boolean(
              Number.parseInt(configService.get<string>('STAFF_SERVICE_SSL')),
            )
              ? grpc.ChannelCredentials.createSsl()
              : grpc.ChannelCredentials.createInsecure(),
          },
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: [StaffService],
})
export class StaffModule {}
