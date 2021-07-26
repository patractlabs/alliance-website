import type { bool } from '@polkadot/types';
import type { Codec } from '@polkadot/types/types';
import type {
  ProposalIndex
} from '@polkadot/types/interfaces';

import { SubstrateEvent } from '@subql/types';
import { Motion, MotionAction } from '../types';

export async function handleAllianceMotion(
  method: string,
  event: SubstrateEvent
): Promise<void> {
  const {
    event: { data, index },
    extrinsic,
    block
  } = event;

  if (method === 'Approved') {
  } else if (method === 'Closed') {
    const motion = await Motion.get(data[0].toHex());
    motion.closeTime = block.timestamp;

    await motion.save();
  } else if (method === 'Disapproved') {
  } else if (method === 'Executed') {
  } else if (method === 'MemberExecuted') {
  } else if (method === 'Proposed') {
    const motion = Motion.create({
      id: data[2].toHex(),
      hash: data[2].toHex(),
      proposer: data[0].toString(),
      index: (data[1] as ProposalIndex).toBigInt(),
      createTime: block.timestamp
    });

    await motion.save();
  } else if (method === 'Voted') {
    const [accountId, hash, approve, yes, no]: Codec[] = data.map((d) => d);

    const motionAction = MotionAction.create({
      id: event.hash.toHex(),
      motionHash: hash.toHex(),
      account: accountId.toString(),
      approve: (approve as bool).valueOf()
    });
    await motionAction.save();
  }
}
