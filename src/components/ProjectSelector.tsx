import { Avatar, Badge, Button, FormElement, Grid, Input, Loading, Modal, Table, Text, Tooltip, User } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { Selection } from '@react-types/shared';
import Client from '../utils/Client';
import links from '../res/links.json';

export interface Project {
  badge: null,
  color: null,
  created_at: string,
  has_public_url: boolean,
  human_readable_last_heartbeat_at: string,
  id: string,
  last_heartbeat_at: string,
  name: string,
  repository: {
    "badge": null,
    "created_at": string,
    "default_branch": string,
    "description": string,
    "fork_count": number,
    "full_name": string,
    "homepage": string,
    "html_url": string,
    "id": string,
    "image_icon_url": string,
    "is_fork": boolean,
    "is_private": boolean,
    "last_synced_at": null,
    "modified_at": string,
    "name": string,
    "provider": 'github' | 'gitlab' | 'bitbucket',
    "star_count": number,
    "url": string,
    "urlencoded_name": string,
    "wakatime_project_name": string,
    "watch_count": number
  } | null,
  url: string,
  urlencoded_name: string
}

/**
 * A component that allows the user to select projects to monitor.
 */
export default function ProjectSelector({
  monitoredProjects,
  setMonitoredProjects,
}: {
  monitoredProjects: Project[],
  setMonitoredProjects: (projects: Project[]) => void,
}) {
  const [query, setQuery] = useState("");
  const [queryProjects, setQueryProjects] = useState<Project[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Selection update handler.
   * @param selection The new selection.
   */
  const handleSelectionChange = (selection: Selection) => {
    if (selection === "all") {
      setMonitoredProjects(queryProjects);
    } else {
      const selectedProjects: Project[] = [];
      selection.forEach((name) => {
        const project = queryProjects.find((project) => project.name === name);
        project && selectedProjects.push(project);
      });
      setMonitoredProjects(selectedProjects);
    }
  }

  /**
   * Query update handler.
   * @param e The event.
   */
  const handleQueryChange = (e: React.ChangeEvent<FormElement>) => {
    setQuery(e.target.value);
  }

  /**
   * Modal toggle handler.
   */
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  }

  // Schedule an update of the query projects every time the query changes.
  useEffect(() => {
    setIsLoading(true);
    Client.getProjects(query).then((projects) => {
      setQueryProjects(projects);
      setIsLoading(false);
    });
  }, [query]);

  return (
    <Grid.Container
      gap={2}
      direction='column'
      css={{
        width: "min(100%, 600px)",
      }}
    >
      <Grid css={{
        display: "flex",
        justifyContent: "center",
      }}>
        <Button
          auto
          shadow
          onPress={() => { setModalVisible(!modalVisible) }}
        >
          Edit Monitored Projects
        </Button>
      </Grid>
      {
        monitoredProjects.length > 0 ? (
          <Grid>
            <Table
              aria-label="Monitored Projects"
            >
              <Table.Header>
                <Table.Column>LOCATION</Table.Column>
                <Table.Column>NAME</Table.Column>
                <Table.Column>LAST EDITED</Table.Column>
              </Table.Header>
              <Table.Body>
                {monitoredProjects.map((project) => (
                  <Table.Row key={project.name}>
                    <Table.Cell>
                      {project.repository ? (
                        <User squared size="sm" color="gradient" bordered src={links.icons[project.repository?.provider]} name={project.repository?.provider}>
                          {project.repository?.full_name}
                        </User>
                      ) : (
                        <User squared color="gradient" bordered size="sm" name="Local" src={links.icons.local}>
                          {project.name}
                        </User>
                      )}
                    </Table.Cell>
                    <Table.Cell>
                      <Text>
                        {project.name}
                      </Text>
                    </Table.Cell>
                    <Table.Cell>
                      <Tooltip content={new Date(project.last_heartbeat_at).toUTCString()}>
                        <Badge variant="flat">
                          {new Date(project.last_heartbeat_at).toLocaleDateString()}
                        </Badge>
                      </Tooltip>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
              {monitoredProjects.length > 4 ? (
                <Table.Pagination
                  shadow
                  noMargin
                  align='center'
                  rowsPerPage={4}
                />) : (
                  null as any // HACK: This typing is wrong.
                )}
            </Table>
          </Grid>
        ) : (
          <Text css={{
            textAlign: "center",
          }}>
            No projects are being monitored. Click the button above to begin.
          </Text>
        )
      }
      <Modal
        closeButton
        aria-labelledby='modal-title'
        open={modalVisible}
        width="min(100%, 600px)"
        onClose={toggleModal}
      >
        <Modal.Header>
          <Input
            type="search"
            placeholder="Search project name"
            aria-label="Search project name"
            value={query}
            bordered
            onChange={handleQueryChange}
            contentRight={isLoading && <Loading size="xs" />}
          />
        </Modal.Header>
        <Modal.Body>
          <Table
            onSelectionChange={handleSelectionChange}
            selectedKeys={monitoredProjects.map((project) => project.name)}
            aria-label="Choose the projects you want to track"
            selectionMode="multiple"
            bordered
          >
            <Table.Header>
              <Table.Column>NAME</Table.Column>
              <Table.Column>LAST EDITED</Table.Column>
              <Table.Column>PROVIDER</Table.Column>
            </Table.Header>
            <Table.Body>
              {queryProjects.map((project) => (
                <Table.Row key={project.name}>
                  <Table.Cell>{project.name}</Table.Cell>
                  <Table.Cell>{new Date(project.last_heartbeat_at).toDateString()}</Table.Cell>
                  <Table.Cell>{project.repository?.provider}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
            <Table.Pagination
              shadow
              noMargin
              align='center'
              rowsPerPage={10}
            />
          </Table>
        </Modal.Body>
      </Modal>
    </Grid.Container>
  );
}