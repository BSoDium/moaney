import { Container, styled } from '@nextui-org/react';
import React from 'react';

export default function Layout({ 
  children,
  viewport,
  fill,
  centered,
  alignItems,
  justifyContent,
  flexDirection,
  gap,
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
    <Container 
      css={{
        display: 'flex',
        flexDirection: flexDirection || 'column',
        height: viewport ? '100vh' : fill ? '100%' : 'auto',
        width: viewport ? '100vw' : fill ? '100%' : 'auto',
        alignItems: centered ? 'center' : alignItems || 'flex-start',
        justifyContent: centered ? 'center' : justifyContent || 'flex-start',
        columnGap: gap || '1rem',
        rowGap: gap || '1rem',
      }}
    >
      {children}
    </Container>
  );
}
