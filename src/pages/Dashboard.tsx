import React, { useEffect, useState } from 'react';
import { Button, Container, Navbar, Text, Tooltip, User } from '@nextui-org/react';
import Layout from '../components/Layout';
import Client from '../utils/Client';
import ProjectSelector, { Project } from '../components/ProjectSelector';
import { useNavigate } from 'react-router-dom';
import Budget from '../components/Budget';
import links from '../res/links.json';

/**
 * The main dashboard page.
 */
export default function Dashboard() {
  const [monitoredProjects, setMonitoredProjects] = useState<Project[]>([]);
  const [userInfo, setUserInfo] = useState<{ username: string, display_name: string, photo: string }>();

  const navigate = useNavigate();

  const handleSignOut = () => {
    Client.signOut();
    localStorage.clear();
    navigate('/');
  }

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


  // Save the monitored projects to the local storage.
  useEffect(() => {
    localStorage.setItem('monitoredProjects', monitoredProjects.map((project) => project.id).join(','));
  }, [monitoredProjects]);

  return (
    <Layout viewport gap="2rem" centered justifyContent='start'>
      <Navbar variant="sticky">
        <Navbar.Brand>
          <Text b h3>Moneytor.</Text>
        </Navbar.Brand>
        <Navbar.Content>
          <Navbar.Link href={links.repository}>
            GitHub
          </Navbar.Link>
          <Navbar.Link href={links.documentation}>
            Documentation
          </Navbar.Link>
          <Navbar.Link href="dashboard" isActive>
            Dashboard
          </Navbar.Link>
        </Navbar.Content>
        <Navbar.Content>
          <User
            src={`${userInfo?.photo}?s=420`}
            name={userInfo?.display_name}
            size="md"
          >
            <User.Link href={`https://wakatime.com/@${userInfo?.username}`}>@{userInfo?.username}</User.Link>
          </User>
          <Tooltip content="This will delete all stored credentials 🍪" color="primary" placement="bottom">
            <Navbar.Item>
              <Button auto flat onPress={handleSignOut} size="sm">
                Sign out
              </Button>
            </Navbar.Item>
          </Tooltip>
        </Navbar.Content>
      </Navbar>
      <Text h2>
        Welcome, {userInfo?.display_name.split(" ")[0] || 'user'}!
      </Text>
      <ProjectSelector monitoredProjects={monitoredProjects} setMonitoredProjects={setMonitoredProjects} />
      <Budget monitoredProjects={monitoredProjects} />
    </Layout>
  );
}