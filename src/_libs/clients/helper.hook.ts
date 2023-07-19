'use client';

import copy from 'copy-to-clipboard';
import { useRouter } from 'next/navigation';

export function useHelperHook() {
  const router = useRouter();
  
  const pasteTheUrl = (path: string) => `${process.env.NEXT_PUBLIC_PROJECT_URL}/${path}`;
  const copy2Clipboard = (id: string) => copy(`${process.env.NEXT_PUBLIC_PROJECT_URL}/${id}`, {
    debug: false,
  });
  const refreshPage = () => {
    location.replace('/')
  };
  
  return { pasteTheUrl, copy2Clipboard, refreshPage };
}
