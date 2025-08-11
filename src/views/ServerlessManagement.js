import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, CardTitle, Table, Button } from "reactstrap";

function ServerlessManagement() {
  const [endpoints, setEndpoints] = useState([]);

  useEffect(() => {
    fetch("/api/serverless")
      .then((res) => res.json())
      .then((data) => setEndpoints(data))
      .catch(() => setEndpoints([]));
  }, []);

  return (
    <div className="content">
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
    </div>
  );
}

export default ServerlessManagement;
