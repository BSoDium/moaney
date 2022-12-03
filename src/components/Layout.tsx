import { Container } from '@nextui-org/react';
import React from 'react';

export default function Layout({
  children,
  viewport,
  fill,
  centered,
  alignItems,
  justifyContent,
  flexDirection,
  gap
}: {
  children: React.ReactNode,
  viewport?: boolean,
  fill?: boolean,
  centered?: boolean,
  alignItems?: 'start' | 'center' | 'end',
  justifyContent?: 'start' | 'center' | 'end',
  flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse',
  gap?: string,
}) {
  return (
    <div className="layout"
      style={{
        height: viewport ? '100vh' : 'auto',
        width: viewport ? '100vw' : 'auto',
        display: 'flex',
        alignItems: alignItems || 'center',
        justifyContent: justifyContent || 'center',
        flexDirection: flexDirection || 'column',
        gap: gap || '0px',
      }}
    >
      {children}
    </div>
  );
}
