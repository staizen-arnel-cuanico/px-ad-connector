import { FactoryProvider, ModuleMetadata } from '@nestjs/common';

export interface IMSGraphServiceOptions {
  tenant: string;
  appClientId: string;
  appClientSecret: string;
  appClientScope: string[];
  debug?: boolean;
}

type MSGraphServiceOptions = Pick<ModuleMetadata, 'imports'> &
  Pick<FactoryProvider<IMSGraphServiceOptions>, 'useFactory' | 'inject'>;

export default MSGraphServiceOptions;
