import { ClientSecretCredential } from '@azure/identity';
import { Client } from '@microsoft/microsoft-graph-client';
import { TokenCredentialAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import 'isomorphic-fetch';
import MSGraphServiceOptions from './interface/ms-graph.interface';
import { MS_GRAPH_SERVICE_OPTIONS } from './ms-graph.constants';

@Injectable()
export class MsGraphService {
  client: Client;

  constructor(
    @Inject(MS_GRAPH_SERVICE_OPTIONS) options: MSGraphServiceOptions,
  ) {
    this.initClient(options);
  }

  initClient(options: Record<string, any>) {
    const credential = new ClientSecretCredential(
      options.tenant,
      options.appClientId,
      options.appClientSecret,
    );

    const authProvider = new TokenCredentialAuthenticationProvider(credential, {
      scopes: options.appClientScope,
    });
    this.client = Client.initWithMiddleware({
      debugLogging: Boolean(Number.parseInt(options.debug)),
      authProvider,
    });

    return this.client;
  }

  users() {
    return this.client.api('/users/');
  }
}
