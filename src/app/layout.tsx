import type { ReactNode } from 'react';

// Root layout is intentionally minimal — html/body are provided by [locale]/layout.tsx
export default function RootLayout({ children }: { children: ReactNode }) {
  return children as React.ReactElement;
}
