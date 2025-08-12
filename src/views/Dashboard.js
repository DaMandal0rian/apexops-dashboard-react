import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
};

function Dashboard() {
  const [metrics, setMetrics] = useState({
    latency: 0,
    cpu: 0,
    gpu: 0,
    memory: 0,
    clusters: { labels: [], resources: [] },
  });

  useEffect(() => {
    const fetchMetrics = () => {
      fetch("/api/metrics")
        .then((res) => res.json())
        .then((data) =>
          setMetrics({
            latency: data.latency || 0,
            cpu: data.cpu || 0,
            gpu: data.gpu || 0,
            memory: data.memory || 0,
            clusters: data.clusters || { labels: [], resources: [] },
          })
        )
        .catch(() =>
          setMetrics({
            latency: 0,
            cpu: 0,
            gpu: 0,
            memory: 0,
            clusters: { labels: [], resources: [] },
          })
        );
    };
    fetchMetrics();
    const id = setInterval(fetchMetrics, 5000);
    return () => clearInterval(id);
  }, []);

  const resourceChart = {
    data: {
      labels: metrics.clusters.labels,
      datasets: [
        {
          label: "GPUs",
          data: metrics.clusters.resources,
          backgroundColor: "#1f8ef1",
        },
      ],
    },
    options: chartOptions,
  };

  return (
    <div className="content">
      <Row>
        <Col lg="3" md="6" sm="6">
          <Card className="card-stats">
            <CardBody>
              <CardTitle tag="h5">Avg Latency: {metrics.latency} ms</CardTitle>
            </CardBody>
          </Card>
        </Col>
        <Col lg="3" md="6" sm="6">
          <Card className="card-stats">
            <CardBody>
              <CardTitle tag="h5">CPU Time: {metrics.cpu} s</CardTitle>
            </CardBody>
          </Card>
        </Col>
        <Col lg="3" md="6" sm="6">
          <Card className="card-stats">
            <CardBody>
              <CardTitle tag="h5">GPU Time: {metrics.gpu} s</CardTitle>
            </CardBody>
          </Card>
        </Col>
        <Col lg="3" md="6" sm="6">
          <Card className="card-stats">
            <CardBody>
              <CardTitle tag="h5">Memory: {metrics.memory} GB</CardTitle>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Card className="card-chart">
        <CardHeader>
          <CardTitle tag="h4">Cluster GPUs</CardTitle>
        </CardHeader>
        <CardBody>
          <div className="chart-area" style={{ height: "300px" }}>
            <Bar data={resourceChart.data} options={resourceChart.options} />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default Dashboard;
