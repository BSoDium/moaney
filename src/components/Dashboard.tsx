import React, { useEffect, useState } from 'react';
import { Text } from '@nextui-org/react';
import { Layout } from './Layout';
import WakatimeClient from '../utils/WakatimeClient';

export default function Dashboard({
  client,
}: {
  client: WakatimeClient;
}) {
  const [heartbeat, setHeartbeat] = useState(Date.now());
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch project list
    client.getProjects().then((projects) => {
      setProjects(projects.data);
    });
  }, [heartbeat]);
  
  

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