import { SubstrateEvent } from '@subql/types';
import { handleAlliance } from './handleAlliance';
import { handleAllianceMotion } from './handleAllianceMotion';
import { handleIdentity } from './handleIdentity';

export async function handleEvent(event: SubstrateEvent): Promise<void> {
  const {
    event: { method, section }
  } = event;
  if (section === 'alliance') {
    await handleAlliance(method, event).catch((error) =>
      logger.error(error.toString())
    );
  }

  if (section === 'allianceMotion') {
    await handleAllianceMotion(method, event).catch((error) =>
      logger.error(error.toString())
    );
  }

  if (section === 'identity') {
    await handleIdentity(method, event).catch((error) =>
      logger.error(error.toString())
    );
  }
}
