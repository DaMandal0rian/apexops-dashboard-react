import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, CardTitle, Table } from "reactstrap";

function AgentManagement() {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    fetch("/api/agents")
      .then((res) => res.json())
      .then((data) => setAgents(data))
      .catch(() => setAgents([]));
  }, []);

  return (
    <div className="content">
      <Card>
        <CardHeader>
          <CardTitle tag="h4">AI Agents</CardTitle>
        </CardHeader>
        <CardBody>
          <Table responsive>
            <thead className="text-primary">
              <tr>
                <th>Name</th>
                <th>Model</th>
                <th>Task</th>
                <th>Status</th>
                <th>Latency</th>
              </tr>
            </thead>
            <tbody>
              {agents.map((a, idx) => (
                <tr key={idx}>
                  <td>{a.name}</td>
                  <td>{a.model}</td>
                  <td>{a.task}</td>
                  <td>{a.status}</td>
                  <td>{a.latency}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
}

export default AgentManagement;
