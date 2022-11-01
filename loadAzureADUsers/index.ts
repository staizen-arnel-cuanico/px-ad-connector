import { AzureFunction, Context } from '@azure/functions';
import { AzureFunctionTriggerAdapter } from 'nestjs-azure-func-trigger';
import { createApp } from '../src/main.azure';

const timerTrigger: AzureFunction = async function (
  context: Context,
): Promise<void> {
  const timeStamp = new Date().toISOString();

  context.log('Timer trigger function is being executed - ', timeStamp);
  return AzureFunctionTriggerAdapter.handle(createApp, context);
};

export default timerTrigger;
