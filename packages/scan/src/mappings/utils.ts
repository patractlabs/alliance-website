import https from 'https';

import CID from 'cids';

export function getIpfsContent(cid: string | null): Promise<string | null> {
  return new Promise((resolve) => {
    if (!cid) resolve(null);
    setTimeout(() => {
      resolve(null);
    }, 12000);
    https.get(`https://gateway.pinata.cloud/ipfs/${cid}`, (res) => {
      res.on('data', (data) => {
        resolve(data);
      });
      res.on('error', () => resolve(null));
    });
  });
}

export function decodeCid(cidStr?: string): string | null {
  if (!cidStr) {
    return null;
  }

  const cidCodec = api.registry.createType('Cid' as any, cidStr);

  const cid = new CID(
    cidCodec.version.isV0 ? 0 : 1,
    cidCodec.codec.toNumber(),
    cidCodec.multihash.toMultihash()
  );

  return cid.toString();
}
