'use client';

import { useTransition } from 'react';
import { handleUpload } from '@/app/upload/actions';

export default function UploadComponent() {
  let [isPending, startTransition] = useTransition();
  return (
    <>
      <form
        action={(data: FormData) => startTransition(() => handleUpload(data))}
      >
        <button
          type="submit"
          className="text-blue-600"
        >Add to Cart {isPending ? 'Yes' : 'No'}</button>
      </form>
    </>
  );
}
