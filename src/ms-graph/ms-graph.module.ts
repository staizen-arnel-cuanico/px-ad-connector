import { DynamicModule, Module, Scope } from '@nestjs/common';
import MSGraphServiceOptions from './interface/ms-graph.interface';
import { MS_GRAPH_SERVICE_OPTIONS } from './ms-graph.constants';
import { MsGraphService } from './ms-graph.service';

@Module({})
export class MsGraphModule {
  static register(options: MSGraphServiceOptions): DynamicModule {
    return {
      module: MsGraphModule,

      providers: [
        {
          provide: MS_GRAPH_SERVICE_OPTIONS,
          useValue: options,
          scope: Scope.TRANSIENT,
        },
        MsGraphService,
      ],
      exports: [MsGraphService],
    };
  }

  static registerAsync(options: MSGraphServiceOptions): DynamicModule {
    return {
      module: MsGraphModule,
      imports: options.imports,
      providers: [
        {
          provide: MS_GRAPH_SERVICE_OPTIONS,
          useFactory: options.useFactory,
          inject: options.inject,
        },
        MsGraphService,
      ],
      exports: [MsGraphService],
    };
  }
}
