import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";

function UserProfile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetch("/api/profile")
      .then((res) => res.json())
      .then((data) => setProfile(data))
      .catch(() => setProfile(null));
  }, []);

  if (!profile) {
    return <div className="content">Loading...</div>;
  }

  return (
    <div className="content">
      <Row>
        <Col md="8">
          <Card>
            <CardHeader>
              <CardTitle tag="h4">User Profile</CardTitle>
            </CardHeader>
            <CardBody>
              <p>Name: {profile.name}</p>
              <p>Email: {profile.email}</p>
              <p>Role: {profile.role}</p>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default UserProfile;
