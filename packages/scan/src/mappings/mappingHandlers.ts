import { SubstrateEvent } from '@subql/types';
import { Extrinsic } from '../types';
import { handleAlliance } from './handleAlliance';
import { handleAllianceMotion } from './handleAllianceMotion';
import { handleIdentity } from './handleIdentity';

export async function handleEvent(event: SubstrateEvent): Promise<void> {
  const {
    event: { method, section },
    extrinsic,
    block
  } = event;
  if (['alliance', 'allianceMotion'].includes(section)) {
    await Extrinsic.create({
      id: extrinsic.extrinsic.hash.toHex(),
      hash: extrinsic.extrinsic.hash.toHex(),
      blockNumber: block.block.header.number,
      blockTime: block.timestamp,
      extrinsicIndex: extrinsic.idx,
      section: extrinsic.extrinsic.method.section,
      method: extrinsic.extrinsic.method.method,
      signature: extrinsic.extrinsic.signature.toHex(),
      signer: extrinsic.extrinsic.signer.toString(),
      type: extrinsic.extrinsic.type,
      version: extrinsic.extrinsic.version
    }).save();
  }

  if (section === 'alliance') {
    await handleAlliance(method, event).catch((error) =>
      logger.error(`${section}.${method}: ${error.toString()}`)
    );
  }

  if (section === 'allianceMotion') {
    await handleAllianceMotion(method, event).catch((error) =>
      logger.error(`${section}.${method}: ${error.toString()}`)
    );
  }

  if (section === 'identity') {
    await handleIdentity(method, event).catch((error) =>
      logger.error(`${section}.${method}: ${error.toString()}`)
    );
  }
}
