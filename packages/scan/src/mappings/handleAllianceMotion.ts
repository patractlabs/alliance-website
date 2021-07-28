import type { bool } from '@polkadot/types';
import type { Codec } from '@polkadot/types/types';
import type { ProposalIndex } from '@polkadot/types/interfaces';

import { SubstrateEvent } from '@subql/types';
import { Motion, MotionAction } from '../types';
import { createAccount } from './createAccount';
import { getMotionFromExtrinsic } from './motionHelper';

export async function handleAllianceMotion(
  method: string,
  event: SubstrateEvent
): Promise<void> {
  const {
    event: { data },
    extrinsic,
    block
  } = event;

  if (method === 'Approved') {
  } else if (method === 'Closed') {
    const motion = await Motion.getByIndex(
      getMotionFromExtrinsic(extrinsic).index
    );
    motion.closeTime = block.timestamp;
    motion.closeBlock = block.block.header.number.toBigInt();

    await motion.save();
  } else if (method === 'Disapproved') {
  } else if (method === 'Executed') {
  } else if (method === 'MemberExecuted') {
  } else if (method === 'Proposed') {
    await createAccount(data[0].toString());

    const motion = Motion.create({
      id: (data[1] as ProposalIndex).toString(),
      hash: data[2].toHex(),
      proposerId: data[0].toString(),
      index: (data[1] as ProposalIndex).toBigInt(),
      createTime: block.timestamp,
      createBlock: block.block.header.number.toBigInt()
    });

    await motion.save();
  } else if (method === 'Voted') {
    const [accountId, hash, approve, yes, no]: Codec[] = data.map((d) => d);
    await createAccount(accountId.toString());

    const _motion = getMotionFromExtrinsic(extrinsic);

    const motionAction = MotionAction.create({
      id: event.hash.toHex(),
      motionIndex: _motion.index,
      accountId: accountId.toString(),
      approve: (approve as bool).valueOf(),
      block: block.block.header.number.toBigInt()
    });
    await motionAction.save();
  }
}
