import React, { useMemo, useState } from 'react';
import { Button, Card, Input, Loading, Spacer, Text } from '@nextui-org/react';
import { BsCheck2 } from 'react-icons/bs';
import WakatimeClient from '../utils/WakatimeClient';
import { useNavigate } from 'react-router-dom';
import { Layout } from './Layout';

export default function Landing() {
  const client = useMemo(() => new WakatimeClient(""), []);
  const [connected, setConnected] = useState(false);

  const navigate = useNavigate();

  return (
    <Layout>
      <Text h1 size={60} css={{
        textGradient: "45deg, $blue600 -20%, $pink600 50%",
      }}
        weight="bold"
      >Moneytor.</Text>
      <Text h2>Your time is worth money.</Text>
      <Spacer y={1} />
      <Input
        clearable
        type='password'
        labelPlaceholder='Wakatime API Key'
        width='min(90%, 400px)'
        contentRight={connected ? <BsCheck2 /> : null}
        status={connected ? 'success' : 'default'}
        onChange={async (e) => {
          client.setApiKey(e.target.value);
          if (await client.isApiKeyValid()) {
            setConnected(true);
            // Wait for the animation to finish
            setTimeout(() => {
              navigate('/dashboard');
            }, 1000);
          }
        }}
      />
    </Layout>
  );
}