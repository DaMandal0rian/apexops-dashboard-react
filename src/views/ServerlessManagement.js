import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Card, CardHeader, CardBody, CardTitle, Table, Button } from "reactstrap";

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
};

function ServerlessManagement() {
  const [endpoints, setEndpoints] = useState([]);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchEndpoints = () => {
      fetch("/api/serverless")
        .then((res) => res.json())
        .then((data) => setEndpoints(data))
        .catch(() => setEndpoints([]));
    };
    const fetchJobs = () => {
      fetch("/api/serverless_jobs")
        .then((res) => res.json())
        .then((data) => setJobs(data))
        .catch(() => setJobs([]));
    };
    fetchEndpoints();
    fetchJobs();
    const id1 = setInterval(fetchEndpoints, 5000);
    const id2 = setInterval(fetchJobs, 5000);
    return () => {
      clearInterval(id1);
      clearInterval(id2);
    };
  }, []);

  const chartData = {
    labels: endpoints.map((e) => e.name),
    datasets: [
      {
        label: "Requests",
        data: endpoints.map((e) => e.requests),
        backgroundColor: "#1f8ef1",
      },
    ],
  };

  return (
    <div className="content">
      <Card className="card-chart">
        <CardHeader>
          <CardTitle tag="h4">Request Volume</CardTitle>
        </CardHeader>
        <CardBody>
          <div className="chart-area" style={{ height: "300px" }}>
            <Bar data={chartData} options={chartOptions} />
          </div>
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">Serverless Endpoints</CardTitle>
        </CardHeader>
        <CardBody>
          <Button color="primary" size="sm" className="mb-3">
            Deploy Endpoint
          </Button>
          <Table responsive>
            <thead className="text-primary">
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Requests</th>
              </tr>
            </thead>
            <tbody>
              {endpoints.map((e, idx) => (
                <tr key={idx}>
                  <td>{e.name}</td>
                  <td>{e.status}</td>
                  <td>{e.requests}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">Recent Serverless Jobs</CardTitle>
        </CardHeader>
        <CardBody>
          <Table responsive>
            <thead className="text-primary">
              <tr>
                <th>Job</th>
                <th>Endpoint</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((j, idx) => (
                <tr key={idx}>
                  <td>{j.name}</td>
                  <td>{j.endpoint}</td>
                  <td>{j.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
}

export default ServerlessManagement;
