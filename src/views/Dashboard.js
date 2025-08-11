import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
};

function Dashboard() {
  const [summary, setSummary] = useState({
    counts: { clusters: 0, endpoints: 0, agents: 0 },
    usage: { labels: [], data: [] },
  });

  useEffect(() => {
    const fetchSummary = () => {
      fetch("/api/summary")
        .then((res) => res.json())
        .then((data) =>
          setSummary({
            counts: data.counts || { clusters: 0, endpoints: 0, agents: 0 },
            usage: data.usage || { labels: [], data: [] },
          })
        )
        .catch(() =>
          setSummary({
            counts: { clusters: 0, endpoints: 0, agents: 0 },
            usage: { labels: [], data: [] },
          })
        );
    };
    fetchSummary();
    const id = setInterval(fetchSummary, 5000);
    return () => clearInterval(id);
  }, []);

  const usageChart = {
    data: {
      labels: summary.usage.labels,
      datasets: [
        {
          label: "GPU-seconds",
          data: summary.usage.data,
          fill: false,
          borderColor: "#1f8ef1",
        },
      ],
    },
    options: chartOptions,
  };

  return (
    <div className="content">
      <Row>
        <Col lg="4" md="6" sm="6">
          <Card className="card-stats">
            <CardBody>
              <CardTitle tag="h5">Clusters: {summary.counts.clusters}</CardTitle>
            </CardBody>
          </Card>
        </Col>
        <Col lg="4" md="6" sm="6">
          <Card className="card-stats">
            <CardBody>
              <CardTitle tag="h5">Endpoints: {summary.counts.endpoints}</CardTitle>
            </CardBody>
          </Card>
        </Col>
        <Col lg="4" md="6" sm="6">
          <Card className="card-stats">
            <CardBody>
              <CardTitle tag="h5">Agents: {summary.counts.agents}</CardTitle>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Card className="card-chart">
        <CardHeader>
          <CardTitle tag="h4">Usage</CardTitle>
        </CardHeader>
        <CardBody>
          <div className="chart-area" style={{ height: "300px" }}>
            <Line data={usageChart.data} options={usageChart.options} />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default Dashboard;
