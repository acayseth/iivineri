'use client';

import copy from 'copy-to-clipboard';
import { PrefetchKind } from 'next/dist/client/components/router-reducer/router-reducer-types';
import { useRouter } from 'next/navigation';

export function useHelperHook() {
  const router = useRouter();
  
  const pasteTheUrl = (path: string) => `${process.env.NEXT_PUBLIC_PROJECT_URL}/${path}`;
  const copy2Clipboard = (id?: string) => copy(`${process.env.NEXT_PUBLIC_PROJECT_URL}/${id}`, {
    debug: false,
  });
  const refreshPage = (previewId?: string) => {
    location.replace(new URL(`${process.env.NEXT_PUBLIC_PROJECT_URL as string}`));
  };
  
  return { pasteTheUrl, copy2Clipboard, refreshPage };
}
