import React, { useEffect, useState } from 'react';
import { Text } from '@nextui-org/react';
import { Layout } from './Layout';

export default function Dashboard() {
  const [heartbeat, setHeartbeat] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      // Heartbeat

      setHeartbeat(Date.now());
    }, 10000);
    return () => clearInterval(interval);
  }, [])

  return (
    <Layout>
      <Text>
        {heartbeat}
      </Text>
    </Layout>
  );
}