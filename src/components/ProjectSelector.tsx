import { Button, FormElement, Grid, Input, Loading, Modal, Table, Text } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { Selection } from '@react-types/shared';
import Client from '../utils/Client';

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
    "provider": string,
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
      console.log(queryProjects);
    } else {
      const selectedProjects: Project[] = [];
      selection.forEach((id) => {
        const project = queryProjects.find((project) => project.id === id);
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
      setQueryProjects(projects.data.data);
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
      <Grid css={{
        display: "flex",
        justifyContent: "center",
      }}>
        {
          monitoredProjects.length > 0 ? (

            <Table
              aria-label="Monitored Projects"
            >
              <Table.Header>
                <Table.Column>NAME</Table.Column>
                <Table.Column>LAST EDITED</Table.Column>
                <Table.Column>PROVIDER</Table.Column>
              </Table.Header>
              <Table.Body>
                {monitoredProjects.map((project) => (
                  <Table.Row key={project.id}>
                    <Table.Cell>{project.name}</Table.Cell>
                    <Table.Cell>{new Date(project.last_heartbeat_at).toDateString()}</Table.Cell>
                    <Table.Cell>{project.repository?.provider}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
              {monitoredProjects.length > 4 ? (
                <Table.Pagination
                  shadow
                  noMargin
                  align='center'
                  rowsPerPage={4}
                />
              ) : (<></>)}
            </Table>
          ) : (
            <Text>
              No projects are being monitored. Click the button above to add some.
            </Text>
          )
        }
      </Grid>
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
            selectedKeys={monitoredProjects.map((project) => project.id)}
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
                <Table.Row key={project.id}>
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
        <Modal.Footer>
          <Button auto shadow onPress={toggleModal}>
            Add Projects
          </Button>
        </Modal.Footer>
      </Modal>
    </Grid.Container>
  );
}