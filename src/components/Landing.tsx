import React, { useMemo, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button, Loading, Spacer, Text } from '@nextui-org/react';
import storage from '../res/storage.json';

// TODO: Put this in a separate file (Ideally encrypted, but that's a bit useless since 
// these will be sent to the client anyway)
const clientId: string = "T1VBlX4sjYhhIIk8Dk7n8po7";
const clientSecret: string = "waka_sec_kLwKssyVVcJu5vl5RdnnUKPR5gV3bBGglTmsOuyGHbmc2LvysfncI4MhMHZlroHfujaHFgD8Mnqr5GKp";
const redirectUri: string = "https://www.bsodium.fr/moneytor";

function authorizeAccess() {
  window.open(`https://wakatime.com/oauth/authorize?client_id=${
      clientId
    }&response_type=code&redirect_uri=${
      redirectUri
    }&scope=read_stats`, '_blank');
}

async function getToken(code:string) {
  return fetch('https://wakatime.com/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `client_id=${clientId}&client_secret=${clientSecret}&code=${code}&grant_type=authorization_code&redirect_uri=${redirectUri}`,
  })
}

export default function Landing() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [sessionCode, setSessionCode] = useState(localStorage.getItem(storage.auth.sessionCode))
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");

  const sessionCodeParam = useMemo(() => searchParams.get('code'), [searchParams]);

  useEffect(() => {
    // API redirect, overwrite session code
    if (sessionCodeParam) {
      setSessionCode(sessionCodeParam);
      localStorage.setItem(storage.auth.sessionCode, sessionCodeParam);
    }
  }, [sessionCodeParam]);

  useEffect(() => {
    // Retrieve access token
    if (sessionCode) {
      getToken(sessionCode).then((res) => {
        res.json().then((data) => {
          setAccessToken(data.access_token);
          setRefreshToken(data.refresh_token);
          console.log(data); // TODO: Remove
        });
      });
    }
  }, [sessionCode]);

  return (
    <div className="container">
      <Text h1 size={60} css={{
        textGradient: "45deg, $blue600 -20%, $pink600 50%",
      }}
        weight="bold"
      >Moneytor.</Text>
      <Text h2>Your time is worth money.</Text>
      <Spacer y={1} />
      <Button color="gradient" bordered onPress={authorizeAccess}>
        Wakatime login
      </Button>
      {sessionCodeParam && (
        <>
          <Spacer y={1} />
          <Text>Code: {sessionCodeParam}</Text>
        </>
      )}
    </div>
  );
}