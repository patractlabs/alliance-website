import CID from 'cids';
import type { Registry } from '@polkadot/types/types';
import { TypeRegistry } from '@polkadot/types';
import { GenericCidMultihash } from './CidMultihash';

const registry: Registry = new TypeRegistry();

registry.register({
  GenericCidMultihash,
  CidVersion: {
    _enum: ['V0', 'V1']
  },
  CidMultihash: 'GenericCidMultihash',
  Cid: {
    version: 'CidVersion',
    codec: 'u64',
    multihash: 'CidMultihash'
  }
});

export function decodeCid(cidStr?: string): string | undefined {
  if (!cidStr) {
    return;
  }

  const cidCodec = registry.createType('Cid' as any, cidStr);
  const cid = new CID(cidCodec.version.isV0 ? 0 : 1, cidCodec.codec.toNumber(), cidCodec.multihash.toMultihash());

  return cid.toString();
}
