import { Injectable } from '@nestjs/common';
import {
  AzureFunctionTrigger,
  AzureFunctionContext,
} from 'nestjs-azure-func-trigger';
import { Context } from '@azure/functions';
import { CreateStaffRequest } from '../staff/proto/staff.pb';
import * as intercept from 'azure-function-log-intercept';
import { StaffService } from 'src/staff/staff.service';
import { MsGraphService } from 'src/ms-graph/ms-graph.service';
import * as grpc from '@grpc/grpc-js';

@Injectable()
export class CronService {
  constructor(
    private readonly msgraphService: MsGraphService,
    private readonly staffService: StaffService,
  ) {}

  @AzureFunctionTrigger('loadAzureADUsers')
  async loadAzureADUsers(@AzureFunctionContext() context: Context) {
    try {
      intercept(context);
      console.log('JOB:loadUsers:STATUS: started');
      let users = await this.msgraphService.client.api('/users/').get();

      users = users.value.filter((user: any) => !!user.mail);

      users = users.map((user: any) => {
        const [firstName, lastName] = user?.displayName.split(' ');

        return <CreateStaffRequest>{
          displayName: user?.displayName,
          firstName: user?.givenName || firstName,
          lastName: user?.surname || lastName,
          email: user?.mail,
          idpId: user?.id,
        };
      });

      if (!users?.length) {
        console.log('JOB:loadUsers:STATUS: nothing to load');
        return;
      }

      console.log('Calling Staff Microservice');
      const result = await this.staffService.createManyIfNotExists(users);
      console.log(result);
      console.log('JOB:loadUsers:STATUS: finished without errors');
    } catch (e) {
      console.log(e);
      console.log(`JOB:loadUsers:ERR: ${e}`);
    }
  }
}
