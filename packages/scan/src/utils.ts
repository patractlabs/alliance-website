import {
  u8aToHex,
} from '@polkadot/util';
import { decodeAddress, encodeAddress } from '@polkadot/util-crypto';

export function accountId2Hex (accountId: string, ss58Format: number): string {
  return u8aToHex(
    decodeAddress(
      accountId,
      undefined,
      Number(ss58Format),
    ),
  )
}