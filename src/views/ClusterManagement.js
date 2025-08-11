import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Card, CardHeader, CardBody, CardTitle, Table, Button } from "reactstrap";

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
};

function ClusterManagement() {
  const [clusters, setClusters] = useState([]);

  useEffect(() => {
    const fetchClusters = () => {
      fetch("/api/clusters")
        .then((res) => res.json())
        .then((data) => setClusters(data))
        .catch(() => setClusters([]));
    };
    fetchClusters();
    const id = setInterval(fetchClusters, 5000);
    return () => clearInterval(id);
  }, []);

  const chartData = {
    labels: clusters.map((c) => c.name),
    datasets: [
      {
        label: "Nodes",
        data: clusters.map((c) => c.nodes),
        backgroundColor: "#1f8ef1",
      },
    ],
  };

  return (
    <div className="content">
      <Card className="card-chart">
        <CardHeader>
          <CardTitle tag="h4">Cluster Nodes</CardTitle>
        </CardHeader>
        <CardBody>
          <div className="chart-area" style={{ height: "300px" }}>
            <Bar data={chartData} options={chartOptions} />
          </div>
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">Cluster Management</CardTitle>
        </CardHeader>
        <CardBody>
          <Button color="primary" size="sm" className="mb-3">
            Create Cluster
          </Button>
          <Table responsive>
            <thead className="text-primary">
              <tr>
                <th>Name</th>
                <th>Nodes</th>
                <th>GPU Type</th>
                <th>Status</th>
                <th>Uptime</th>
              </tr>
            </thead>
            <tbody>
              {clusters.map((c, idx) => (
                <tr key={idx}>
                  <td>{c.name}</td>
                  <td>{c.nodes}</td>
                  <td>{c.gpu}</td>
                  <td>{c.status}</td>
                  <td>{c.uptime}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
}

export default ClusterManagement;
