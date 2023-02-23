import React, { useEffect, useState } from 'react';
import { Badge, Card, FormElement, Grid, Input, Loading, Switch, SwitchEvent, Text, Tooltip } from '@nextui-org/react';
import { Project } from './ProjectSelector';
import settings from '../res/settings.json';
import Client from '../utils/Client';

const monthStart = new Date();
monthStart.setDate(1);

export default function Budget({
  monitoredProjects,
}: {
  monitoredProjects: Project[],
}) {
  const [hourlyRate, setHourlyRate] = useState<number>(parseFloat(localStorage.getItem('hourlyRate') || '0'));
  const [heartbeat, setHeartbeat] = useState<number>(Date.now());
  const [timeRange, setTimeRange] = useState({
    start: monthStart,
    end: new Date(),
  })
  const [income, setIncome] = useState<number>();
  const [isLoading, setIsLoading] = useState(false);

  const handleRateChange = (e: React.ChangeEvent<FormElement>) => {
    setHourlyRate(parseFloat(e.target.value));
    localStorage.setItem('hourlyRate', e.target.value);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setIsLoading(true);
      let sum = 0;
      Promise.all(monitoredProjects.map((project) => Client.getProjectTime(
        project.name,
        timeRange.start.toISOString().split('T')[0],
        timeRange.end.toISOString().split('T')[0],
      ))).then((summaries) => {
        summaries.forEach((summary) => {
          sum += summary.cumulative_total.decimal * hourlyRate;
        });
        setIncome(sum);
        setIsLoading(false);
      }).catch((err) => {
        console.error(err);
        setIsLoading(false);
      });

      setHeartbeat(Date.now());
    }, settings.updateInterval);
    return () => clearInterval(interval);
  }, [hourlyRate, monitoredProjects, timeRange]);

  return (
    <Grid.Container gap={2} justify="center">
      <Grid xs={12} md={6} lg={4}>
        <Card css={{ p: "$6" }}>
          <Card.Body>
            <Grid.Container gap={2} justify="center">
              <Grid xs={12} md={6} direction="column">
                <Text>Your income for this month
                </Text>
                <Text h2>{income !== undefined ? `${income.toFixed(2)} €` : (<Loading />)}</Text>
              </Grid>
              <Grid xs={12} md={6} direction="column">
                <Text>
                  Estimated total income
                </Text>
                <Text h2>{income !== undefined ? `${(income * 30 / timeRange.end.getDate()).toFixed(2)} €` : (<Loading />)}</Text>
              </Grid>
            </Grid.Container>
            <Input
              type="number"
              placeholder="Hourly rate"
              aria-label='Hourly rate'
              bordered
              labelLeft="wage"
              labelRight="€/h"
              value={hourlyRate}
              onChange={handleRateChange}
            />
          </Card.Body>
          <Card.Footer>
            <Grid xs={12} alignItems="center">
              <Badge variant="dot" color={
                isLoading ? 'warning' : 'success'
              } />
              <Text b size={12} css={{ ml: "$2", color: "$accents7" }}>
                Updated at {new Date(heartbeat).toLocaleTimeString()}
              </Text>
            </Grid>
          </Card.Footer>
        </Card>
      </Grid>
    </Grid.Container>
  );
}