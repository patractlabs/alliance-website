import { useEffect, useState } from 'react';
import { firstValueFrom, from, Observable } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { timeout, mergeMap } from 'rxjs/operators';

export const IPFS_GATEWAY_GROUPs = [
  ['https://cloudflare-ipfs.com/ipfs', 'https://ipfs.infura.io/ipfs'],
  ['https://ipfs.io/ipfs', 'https://dweb.link/ipfs', 'https://astyanax.io'],
  ['https://ipfs.fleek.co/ipfs', 'https://ipfs.decoo.io/ipfs', 'https://ipfs.eth.aragon.network/ipfs'],
  ['https://cf-ipfs.com/ipfs', 'https://trusted-setup.filecoin.io/ipfs', 'https://gateway.pinata.cloud/ipfs'],
  ['https://ipfs.tubby.cloud/ipfs', 'https://crustwebsites.net/ipfs', 'https://ravencoinipfs-gateway.com/ipfs'],
  ['https://video.oneloveipfs.com/ipfs', 'https://10.via0.com/ipfs']
];

interface UseContent {
  content: string | undefined;
  fetching: boolean;
}

function fetchData(url: string): Observable<string> {
  return fromFetch(url).pipe(
    mergeMap((response) => {
      if (response.headers.get('content-type')?.includes('text') && response.status >= 200 && response.status < 400) {
        return from(response.text());
      }

      throw new Error('');
    }),
    timeout(5000)
  );
}

export function useContent(cid?: string): UseContent {
  const [content, setContent] = useState<string>();
  const [fetching, setFetching] = useState<boolean>(false);

  useEffect((): void => {
    if (!cid) {
      return;
    }

    setFetching(true);

    (async function () {
      // try by group
      for (let i = 0; i < IPFS_GATEWAY_GROUPs.length; i++) {
        try {
          const content = await Promise.any(
            IPFS_GATEWAY_GROUPs[i].map((IPFS_GATEWAY) => firstValueFrom(fetchData(`${IPFS_GATEWAY}/${cid}`)))
          );

          return setContent(content);
        } catch (e) {}
      }
    })().then(() => setFetching(false));
  }, [cid]);

  return {
    content,
    fetching
  };
}
