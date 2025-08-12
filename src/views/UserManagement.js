import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Card, CardHeader, CardBody, CardTitle, Table, Button } from "reactstrap";

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
};

function UserManagement() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = () => {
      fetch("/api/users")
        .then((res) => res.json())
        .then((data) => setUsers(data))
        .catch(() => setUsers([]));
    };
    fetchUsers();
    const id = setInterval(fetchUsers, 5000);
    return () => clearInterval(id);
  }, []);

  const roleCounts = users.reduce((acc, u) => {
    acc[u.role] = (acc[u.role] || 0) + 1;
    return acc;
  }, {});
  const chartData = {
    labels: Object.keys(roleCounts),
    datasets: [
      {
        label: "Users",
        data: Object.values(roleCounts),
        backgroundColor: "#1f8ef1",
      },
    ],
  };

  return (
    <div className="content">
      <Card className="card-chart">
        <CardHeader>
          <CardTitle tag="h4">Users by Role</CardTitle>
        </CardHeader>
        <CardBody>
          <div className="chart-area" style={{ height: "300px" }}>
            <Bar data={chartData} options={chartOptions} />
          </div>
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">Users</CardTitle>
        </CardHeader>
        <CardBody>
          <Button color="primary" size="sm" className="mb-3">
            Create API Key
          </Button>
          <Table responsive>
            <thead className="text-primary">
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>API Key</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, idx) => (
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.name}</td>
                  <td>{u.role}</td>
                  <td>{u.apiKey}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
}

export default UserManagement;
