import type {
  DispatchResult,
  Hash,
  ProposalIndex
} from '@polkadot/types/interfaces';

import { SubstrateExtrinsic } from '@subql/types';

export type Motion = {
  index: number;
  hash: Hash;
  isOk: boolean;
};

export function getMotionFromExtrinsic(extrinsic: SubstrateExtrinsic): Motion {
  const index = (extrinsic.extrinsic.args[1] as ProposalIndex).toNumber();
  const hash = extrinsic.extrinsic.args[0] as Hash;
  let isOk: boolean = false;
  for (const event of extrinsic.events) {
    if (
      event.event.section === 'allianceMotion' &&
      event.event.method === 'Executed'
    ) {
      isOk = (event.event.data[1] as DispatchResult).isOk;
    }
  }

  return {
    index,
    hash,
    isOk
  };
}
