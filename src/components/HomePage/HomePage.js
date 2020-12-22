import React from 'react'
import { Container, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return <Container>
    <ListGroup>
      <ListGroup.Item>
        <Link to="/spanish">
          Conocimientos Constitucionales y Socioculturales de España (CCSE)
    </Link>
      </ListGroup.Item>
      <ListGroup.Item>

        <Link to="/eventdetection">
          Event Detection
    </Link>
      </ListGroup.Item>
    </ListGroup>
  </Container>
}

export default HomePage
