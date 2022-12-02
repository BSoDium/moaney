import React from 'react';
import { Input, Link, Spacer, Text } from '@nextui-org/react';
import { Layout } from './Layout';
import { BsCheck2 } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import WakatimeClient from '../utils/WakatimeClient';

export default function Landing({
  client,
  connected,
  setConnected,
}: {
  client: WakatimeClient;
  connected: boolean;
  setConnected: (connected: boolean) => void;
}) {
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
        readOnly={connected}
        value={client.getApiKey()}
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
      <Spacer y={1} />
      {connected && 
      <Link block color="success" href="dashboard">
        Not getting redirected? Click here.
      </Link>}
    </Layout>
  )
}