import { FormElement, Input, Table } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import {Selection} from '@react-types/shared';
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


export default function ProjectSelector({
  onChange,
}: {
  onChange?: (projects: Project["name"][]) => void;
}) {
  const [query, setQuery] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);

  const handleQueryChange = (e: React.ChangeEvent<FormElement>) => {
    setQuery(e.target.value);
  }

  const handleSelectionChange = (keys: Selection) => {
    if (onChange) {
    }
  }

  useEffect(() => {
    Client.getProjects(query).then((projects) => {
      setProjects(projects.data.data);
      console.log(projects.data.data);
    });
  }, [query]);


  return (
    <>
      <Input
        type="search"
        placeholder="Search for a project"
        value={query}
        onChange={handleQueryChange}
      />
      <Table
        aria-label="Choose the projects you want to track"
        selectionMode="multiple"
        onSelectionChange={handleSelectionChange}
      >
        <Table.Header>
          <Table.Column>NAME</Table.Column>
          <Table.Column>LAST EDITED</Table.Column>
          <Table.Column>PROVIDER</Table.Column>
        </Table.Header>
        <Table.Body>
          {projects.map((project) => (
            <Table.Row key={project.name}>
              <Table.Cell>{project.name}</Table.Cell>
              <Table.Cell>{new Date(project.last_heartbeat_at).toDateString()}</Table.Cell>
              <Table.Cell>{project.repository?.provider}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>

      </Table>
    </>
  );
}