import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Grid, Input, Link, Row, Spacer, Text, Tooltip, User } from '@nextui-org/react';
import axios from 'axios';
import Layout from '../components/Layout';
import { BsCheck2 } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import Client from '../utils/Client';

interface GhIssue {
  url: string;
  repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  html_url: string;
  id: number;
  node_id: string;
  number: number;
  title: string;
  user: { avatar_url: string, login: string };
  labels: { id: number, name: string }[];
  state: string;
  locked: boolean;
  assignee: unknown;
  assignees: unknown[];
  milestone: unknown;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at: string;
  author_association: string;
  active_lock_reason: string;
  body: string;
  reactions: unknown;
  timeline_url: string;
  performed_via_github_app: unknown;
  state_reason: string;
}


async function fetchIssues(): Promise<GhIssue[]> {
  const response = await axios.get('https://api.github.com/repos/bsodium/moneytor/issues');
  return response.data;
}

/**
 * The landing page, where the user can provide his WakaTime API key.
 */
export default function Landing() {
  const [keyIsValid, setKeyIsValid] = useState(Client.isConnected());
  const [providedKey, setProvidedKey] = useState(Client.getApiKey());
  const [attemptCount, setAttemptCount] = useState(0);
  const [relatedIssues, setRelatedIssues] = useState<GhIssue[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (Client.isConnected()) {
      setTimeout(() => navigate('/dashboard'), 1000);
    }

    fetchIssues().then((issues) => {
      setRelatedIssues(issues.reduce((acc, issue) => {
        if (issue.labels.some((label) => label.name === 'recommendation')) {
          acc.push(issue);
          }
          return acc;
          }, [] as GhIssue[]));
    });
  }, []);


  return (
    <Layout viewport centered gap="2rem">
      <Layout centered gap="0">
        <Text h1 size={60} css={{
          textGradient: "45deg, $blue600 -20%, $pink600 50%",
          textAlign: 'center',
        }}
          weight="bold"
        >Moneytor.</Text>
        <Text h2 css={{textAlign: "center"}}>Your time is worth money.</Text>
        <Spacer y={1} />
        <Input
          clearable
          type='password'
          labelPlaceholder='Wakatime API Key'
          contentRight={keyIsValid ? <BsCheck2 /> : null}
          status={keyIsValid ? 'success' : (providedKey.length > 0 ? 'error' : 'default')}
          readOnly={keyIsValid}
          value={providedKey}
          css={{
            width: "min(100%, 30rem)",
          }}
          onChange={async (e) => {
            setProvidedKey(e.target.value);
            Client.setApiKey(e.target.value).then((valid) => {
              setKeyIsValid(valid);
              setAttemptCount(attemptCount + 1);
              valid && setTimeout(() => navigate('/dashboard'), 1000);
            });
          }}
        />
      </Layout>
      {keyIsValid &&
        <Link block color="primary" href="dashboard">
          Not getting redirected? Click here.
        </Link>
      }
      {
        attemptCount > 10 && relatedIssues.length > 0 && (
          <Card
            css={{
              width: 'min(90%, 30rem)',
              p: "$3"
            }}
          >
            <Card.Header>
              <Col>
                <Row>
                  <Text b size={14} css={{ tt: "capitalize" }}>
                    Troube logging in?
                  </Text>
                </Row>
                <Row>
                  <Text b size={12} css={{ tt: "capitalize", color: "$accents7" }}>
                    Check out these issues from GitHub
                  </Text>
                </Row>
              </Col>
            </Card.Header>
            <Card.Body>
              {relatedIssues.map((issue) => (
                <Link href={issue.html_url}>
                  <User size="md" src={issue.user.avatar_url} name={issue.title}>
                    {issue.user.login} created on {new Date(issue.created_at).toLocaleDateString()}.
                  </User>
                </Link>
              ))}
            </Card.Body>
            <Card.Footer css={{justifyContent: "space-between"}}>
              <Tooltip placement='bottom' content={
                <Text size={12}>
                  Aww snap, you seem to be having trouble logging in, <br/>
                  worry not, for we&apos;ve found some issues on GitHub that might help you ✌️ <br/>
                </Text>
              }>
                <Text b size={12} css={{ tt: "capitalize", color: "$accents7" }}>
                  Why am I seeing this?
                </Text>
              </Tooltip>

              <Button auto flat size="sm" color="error" onClick={() => {setAttemptCount(0)}}>
                Dismiss
              </Button>
            </Card.Footer>
          </Card>
        )
      }
    </Layout>
  );
}