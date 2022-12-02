import React, { useEffect, useState } from 'react';
import { Card, Container, Grid, Text } from '@nextui-org/react';
import { Layout } from './Layout';
import Client from '../utils/Client';
import ProjectSelector from './ProjectSelector';

export default function Dashboard() {
  const [monitoredProjects, setMonitoredProjects] = useState([]);
  const [heartbeat, setHeartbeat] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {

      setHeartbeat(Date.now());
    }, 10000);
    return () => clearInterval(interval);
  }, [])

  return (
    <Layout>
      <ProjectSelector />
      <Grid.Container gap={2} justify="center"> 
        <Grid>
          <Card>
            <Text h3>Monitored Projects</Text>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  );
}