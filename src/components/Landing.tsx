import React, { useState } from 'react';
import { Input, Link, Spacer, Text } from '@nextui-org/react';
import Layout from './Layout';
import { BsCheck2 } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import Client from '../utils/Client';

/**
 * The landing page, where the user can provide his WakaTime API key.
 */
export default function Landing() {
  const [keyIsValid, setKeyIsValid] = useState(Client.isConnected());

  const navigate = useNavigate();

  return (
    <Layout viewport centered gap="0">
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
        contentRight={keyIsValid ? <BsCheck2 /> : null}
        status={keyIsValid ? 'success' : 'default'}
        readOnly={keyIsValid}
        value={Client.getApiKey()}
        onChange={async (e) => {
          Client.setApiKey(e.target.value).then((valid) => {
            setKeyIsValid(valid);
            valid && setTimeout(() => navigate('/dashboard'), 1000);
          });
        }}
      />
      <Spacer y={1} />
      {keyIsValid &&
        <Link block color="success" href="dashboard">
          Not getting redirected? Click here.
        </Link>}
    </Layout>
  );
}