import React, { useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button, Spacer, Text } from '@nextui-org/react';
import Auth from '../utils/Auth';

export default function Landing() {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');
    code && Auth.setSessionCode(code);
  }, [searchParams]);


  return (
    <div className="container">
      <Text h1 size={60} css={{
        textGradient: "45deg, $blue600 -20%, $pink600 50%",
      }}
        weight="bold"
      >Moneytor.</Text>
      <Text h2>Your time is worth money.</Text>
      <Spacer y={1} />
      <Button color="gradient" bordered onClick={Auth.loadCredentials}>
        Wakatime login
      </Button>
      {searchParams.get('code') && (
        <>
          <Spacer y={1} />
          <Text>Code: {searchParams.get('code')}</Text>
        </>
      )}
    </div>
  );
}