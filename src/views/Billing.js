import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Card, CardHeader, CardBody, CardTitle, Table } from "reactstrap";

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
};

function Billing() {
  const [usage, setUsage] = useState({ labels: [], data: [] });
  const [costs, setCosts] = useState([]);

  useEffect(() => {
    fetch("/api/billing")
      .then((res) => res.json())
      .then((data) => {
        setUsage(data.usage || { labels: [], data: [] });
        setCosts(data.costs || []);
      })
      .catch(() => {
        setUsage({ labels: [], data: [] });
        setCosts([]);
      });
  }, []);

  const usageChart = {
    data: {
      labels: usage.labels,
      datasets: [
        {
          label: "GPU-seconds",
          data: usage.data,
          fill: false,
          borderColor: "#1f8ef1",
        },
      ],
    },
    options: chartOptions,
  };

  return (
    <div className="content">
      <Card className="card-chart">
        <CardHeader>
          <CardTitle tag="h4">Usage Overview</CardTitle>
        </CardHeader>
        <CardBody>
          <div className="chart-area" style={{ height: "300px" }}>
            <Line data={usageChart.data} options={usageChart.options} />
          </div>
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">Current Costs</CardTitle>
        </CardHeader>
        <CardBody>
          <Table responsive>
            <thead className="text-primary">
              <tr>
                <th>Resource</th>
                <th>Cost</th>
              </tr>
            </thead>
            <tbody>
              {costs.map((c, idx) => (
                <tr key={idx}>
                  <td>{c.resource}</td>
                  <td>{c.cost}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
}

export default Billing;
