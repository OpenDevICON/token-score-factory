import {iconService} from 'Constant';

function timeout(instance) {
    const seconds = instance === 1 ? 2000 : 1000;
    return new Promise(resolve => setTimeout(resolve, seconds));
  }

export async function getTxResultService (txHash, instance) {
    try {
      await timeout(instance);
      return await iconService.getTransactionResult(txHash).execute();
    } catch (err) {
      // Attempt for 5 times before throwing error
      if (instance >= 5) {
        throw (err);
      }
      console.log("Retrying getting txResult..., Attempt ", instance);
      instance = instance + 1;
      return await getTxResultService(txHash, instance);
    }
  }