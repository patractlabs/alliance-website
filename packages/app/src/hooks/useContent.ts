import { useEffect, useState } from 'react';

export const IPFS_GATEWAY_GROUPs = [
  ['https://cloudflare-ipfs.com/ipfs', 'https://ipfs.infura.io/ipfs'],
  ['https://ipfs.io/ipfs', 'https://dweb.link/ipfs', 'https://astyanax.io'],
  ['https://ipfs.fleek.co/ipfs', 'https://ipfs.decoo.io/ipfs', 'https://ipfs.eth.aragon.network/ipfs'],
  ['https://cf-ipfs.com/ipfs', 'https://trusted-setup.filecoin.io/ipfs', 'https://gateway.pinata.cloud/ipfs'],
  ['https://ipfs.tubby.cloud/ipfs', 'https://crustwebsites.net/ipfs', 'https://ravencoinipfs-gateway.com/ipfs'],
  ['https://video.oneloveipfs.com/ipfs', 'https://10.via0.com/ipfs']
];

interface UseContent {
  content: string | null;
  fetching: boolean;
}

async function fetchData(url: string): Promise<string | null> {
  const text = await Promise.race([
    fetch(url).then((response) => {
      if (response.headers.get('content-type')?.includes('text') && response.status >= 200 && response.status < 400) {
        return response.text();
      } else {
        return Promise.reject('Reponse Error');
      }
    }),
    new Promise<string | null>((_, reject) => setTimeout(() => reject(null), 5000))
  ]);

  return text ?? null;
}

export function useContent(cid?: string): UseContent {
  const [content, setContent] = useState<string | null>(null);
  const [fetching, setFetching] = useState<boolean>(false);

  useEffect((): void => {
    if (cid) {
      setFetching(true);

      (async function () {
        // try by group
        for (let i = 0; i < IPFS_GATEWAY_GROUPs.length; i++) {
          try {
            const content = await Promise.any(
              IPFS_GATEWAY_GROUPs[i].map((IPFS_GATEWAY) => fetchData(`${IPFS_GATEWAY}/${cid}`))
            );
            return setContent(content);
          } catch (e) {}
        }
      })();

      setFetching(false);
    }
  }, [cid]);

  return {
    content,
    fetching
  };
}
