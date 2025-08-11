import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, CardTitle, Table, Button } from "reactstrap";

function UserManagement() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch(() => setUsers([]));
  }, []);

  return (
    <div className="content">
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
                <tr key={idx}>
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
