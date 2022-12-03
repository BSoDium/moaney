import React, { useEffect, useState } from 'react';
import { Card, Container, Grid, Input, Link, Spacer, Text, Tooltip } from '@nextui-org/react';
import Layout from '../components/Layout';
import { BsCheck2 } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import Client from '../utils/Client';

/**
 * The landing page, where the user can provide his WakaTime API key.
 */
export default function Landing() {
  const [keyIsValid, setKeyIsValid] = useState(Client.isConnected());
  const [providedKey, setProvidedKey] = useState(Client.getApiKey());

  const navigate = useNavigate();

  useEffect(() => {
    if (Client.isConnected()) {
      setTimeout(() => navigate('/dashboard'), 1000);
    }

  }, []);


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
          status={keyIsValid ? 'success' : (providedKey.length > 0 ? 'error' : 'default')}
          readOnly={keyIsValid}
          value={providedKey}
          onChange={async (e) => {
            setProvidedKey(e.target.value);
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
        </Link>
      }
      <Spacer y={2} />
      <Grid.Container gap={2} justify="center">
        <Grid xs={12} md={6} lg={4}>
        <Card isHoverable css={{ p: "$6" }}>
          <Card.Body>
            <Text>Your income for the current month</Text>
            <Text h2>00</Text>
          </Card.Body>
        </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  );
}