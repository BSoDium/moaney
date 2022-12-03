import { Container, styled } from '@nextui-org/react';
import React from 'react';

export default function Layout({ 
  children,
  viewport,
  centered,
  flexDirection,
  gap,
}: { 
  children: React.ReactNode,
  viewport?: boolean,
  centered?: boolean,
  flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse',
  gap?: string,
}) {
  return (
    <Container 
      css={{
        display: 'flex',
        flexDirection: flexDirection || 'column',
        height: viewport ? '100vh' : 'auto',
        width: viewport ? '100vw' : 'auto',
        alignItems: centered ? 'center' : 'flex-start',
        justifyContent: centered ? 'center' : 'flex-start',
        columnGap: gap || '1rem',
        rowGap: gap || '1rem',
      }}
    >
      {children}
    </Container>
  );
}
