// Copyright 2017-2021 @polkadot/app-alliance authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useEffect, useState } from 'react';

export const IPFS_GATEWAY = 'https://ipfs.io';

interface UseContent {
  content: string | null;
  fetching: boolean;
}

async function fetchData(url: string): Promise<string | null> {
  const text = await Promise.race([
    fetch(url)
      .then((response) => {
        if (response.headers.get('content-type')?.includes('text')) {
          return response.text();
        } else {
          return null;
        }
      })
      .catch((e) => console.error(e)),
    new Promise<string | null>((resolve) => setTimeout(() => resolve(null), 100000))
  ]);

  return text ?? null;
}

export function useContent(cid: string | null): UseContent {
  const [content, setContent] = useState<string | null>(null);
  const [fetching, setFetching] = useState<boolean>(false);

  useEffect((): void => {
    if (cid) {
      setFetching(true);

      fetchData(`${IPFS_GATEWAY}/ipfs/${cid}`)
        .then(setContent)
        .catch(console.error)
        .finally(() => setFetching(false));
    }
  }, [cid]);

  return {
    content,
    fetching
  };
}
