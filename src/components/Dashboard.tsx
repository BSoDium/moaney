import React, { useEffect, useState } from 'react';
import { Button, Card, Container, Grid, Modal, Table, Text } from '@nextui-org/react';
import Layout from './Layout';
import Client from '../utils/Client';
import ProjectSelector, { Project } from './ProjectSelector';
import { useNavigate } from 'react-router-dom';

/**
 * The main dashboard page.
 */
export default function Dashboard() {
  const [monitoredProjects, setMonitoredProjects] = useState<Project[]>([]);
  const [heartbeat, setHeartbeat] = useState(Date.now());

  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem('monitoredProjects');
    saved && setMonitoredProjects(saved?.split(',').map((id) => ({ id } as Project)));

    if (!Client.isConnected()) {
      navigate('/landing');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('monitoredProjects', monitoredProjects.map((project) => project.id).join(','));
  }, [monitoredProjects]);


  useEffect(() => {
    const interval = setInterval(() => {
      // Update the heartbeat every 5 seconds.
        
      setHeartbeat(Date.now());
    }, 5000);
    return () => clearInterval(interval);
  }, [])

  return (
    <Layout viewport centered>
      <ProjectSelector monitoredProjects={monitoredProjects} setMonitoredProjects={setMonitoredProjects} />
      <Grid.Container gap={2} justify="center">
        <Grid xs={12} md={6} lg={4}>
          <Card isPressable isHoverable css={{p: "$6"}}>
            <Card.Body>
              <Text>Your current income</Text>
              <Text h2>00.00 €</Text>
            </Card.Body>
            <Card.Footer>
              <Text>Updated at {new Date(heartbeat).toLocaleTimeString()}</Text>
            </Card.Footer>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  );
}