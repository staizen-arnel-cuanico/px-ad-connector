import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import {
  CreateStaffRequest,
  StaffServiceClient,
  STAFF_PACKAGE_NAME,
  STAFF_SERVICE_NAME,
} from './proto/staff.pb';

@Injectable()
export class StaffService implements OnModuleInit {
  constructor(@Inject(STAFF_PACKAGE_NAME) private client: ClientGrpc) {}

  private staffServiceClient: StaffServiceClient;

  onModuleInit() {
    this.staffServiceClient =
      this.client.getService<StaffServiceClient>(STAFF_SERVICE_NAME);
  }

  async createManyIfNotExists(staffs: CreateStaffRequest[]) {
    return await firstValueFrom(
      this.staffServiceClient.createManyStaffs({ staffs }),
    );
  }
}
