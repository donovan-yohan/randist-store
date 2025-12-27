import { Suspense } from 'react';
import { RandistAppShell } from '@/components/RandistAppShell/RandistAppShell';

export default function StoreLayout({ children }: { children: any }) {
  return (
    <Suspense>
      <RandistAppShell>{children}</RandistAppShell>
    </Suspense>
  );
}
