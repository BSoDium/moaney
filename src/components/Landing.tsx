import React, { useMemo } from 'react';
import { Button, Spacer, Text } from '@nextui-org/react';
import Auth from '../utils/Auth';

export default function Landing() {
  
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
    </div>
  );
}