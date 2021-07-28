import CID from 'cids';
import type { Registry } from '@polkadot/types/types';
import { u8aConcat } from '@polkadot/util';
import { TypeRegistry } from '@polkadot/types';

export function enocdeCid(cid?: any): string | null {
  if (!cid || cid.isEmpty) {
    return null;
  }

  const cidStr = new CID(cid.version.isV0 ? 0 : 1, cid.codec.toNumber(), cid.multihash.toMultihash());

  return cidStr.toString();
}

function createCid(registry: Registry, cidStr: string) {
  try {
    console.log('cid', cidStr);

    const _cid = new CID(cidStr);

    return registry.createType('Cid' as any, {
      codec: registry.createType('u64', _cid.code),
      multihash: registry.createType(
        'CidMultihash' as any,
        u8aConcat(
          registry.createType('u64', _cid.multihash.slice(0, 1)).toU8a(),
          registry.createType('u8', _cid.multihash.slice(1, 2)).toU8a(),
          _cid.multihash.slice(2)
        )
      ),
      version: registry.createType('CidVersion' as any, _cid.version)
    });
  } catch (error: any) {
    console.log('err', error);

    return null;
  }
}

export function decodeCid(cidStr: string): string {
  const cid = createCid(new TypeRegistry(), cidStr);
  console.log('cid', cid);

  if (!cid) {
    return '';
  }

  return enocdeCid(cid) || '';
}
