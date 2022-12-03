import React, { useEffect, useState } from 'react';
import { Card, Grid, Text } from '@nextui-org/react';
import Layout from '../components/Layout';
import Client from '../utils/Client';
import ProjectSelector, { Project } from '../components/ProjectSelector';
import { useNavigate } from 'react-router-dom';
import Budget from '../components/Budget';

/**
 * The main dashboard page.
 */
export default function Dashboard() {
  const [monitoredProjects, setMonitoredProjects] = useState<Project[]>([]);
  const [userInfo, setUserInfo] = useState<{ username: string, display_name: string, photo: string }>();

  const navigate = useNavigate();

  useEffect(() => {
    // If the user is not connected, redirect to the landing page.
    if (!Client.isConnected()) {
      navigate('/landing');
    }

    // Fetch the user's info.
    Client.getUserInfo().then((info) => {
      setUserInfo(info);
    });

    // Load data from the local storage.
    const saved = localStorage.getItem('monitoredProjects');
    saved && setMonitoredProjects(saved?.split(',').map((id) => ({ id } as Project)));

  }, []);

  useEffect(() => {
    localStorage.setItem('monitoredProjects', monitoredProjects.map((project) => project.id).join(','));
  }, [monitoredProjects]);


  return (
    <Layout viewport centered>
      <Text h2>
        Welcome, {userInfo?.display_name.split(" ")[0] || 'user'}!
      </Text>
      <ProjectSelector monitoredProjects={monitoredProjects} setMonitoredProjects={setMonitoredProjects} />
      <Budget monitoredProjects={monitoredProjects}/>
    </Layout>
  );
}