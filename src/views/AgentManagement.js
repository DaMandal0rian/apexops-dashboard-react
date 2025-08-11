import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Card, CardHeader, CardBody, CardTitle, Table } from "reactstrap";

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
};

function AgentManagement() {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    const fetchAgents = () => {
      fetch("/api/agents")
        .then((res) => res.json())
        .then((data) => setAgents(data))
        .catch(() => setAgents([]));
    };
    fetchAgents();
    const id = setInterval(fetchAgents, 5000);
    return () => clearInterval(id);
  }, []);

  const chartData = {
    labels: agents.map((a) => a.name),
    datasets: [
      {
        label: "Latency",
        data: agents.map((a) => a.latency),
        backgroundColor: "#1f8ef1",
      },
    ],
  };

  return (
    <div className="content">
      <Card className="card-chart">
        <CardHeader>
          <CardTitle tag="h4">Agent Latency</CardTitle>
        </CardHeader>
        <CardBody>
          <div className="chart-area" style={{ height: "300px" }}>
            <Bar data={chartData} options={chartOptions} />
          </div>
        </CardBody>
      </Card>
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
