import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, CardTitle, Table, Button } from "reactstrap";

function ClusterManagement() {
  const [clusters, setClusters] = useState([]);

  useEffect(() => {
    fetch("/api/clusters")
      .then((res) => res.json())
      .then((data) => setClusters(data))
      .catch(() => setClusters([]));
  }, []);

  return (
    <div className="content">
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
