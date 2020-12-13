import React from 'react'
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Container,Nav} from 'react-bootstrap'

const Header = () => {
    return (
        <Navbar bg="light" variant="light" expand="lg" collapseOnSelect>
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>
                        <i className="fas fa-home"></i>
                    </Navbar.Brand>
                </LinkContainer>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer to="/deeplearning">
                <Nav.Link>
                <i class="fas fa-robot"></i>
                </Nav.Link>
              </LinkContainer>
              
                
                <LinkContainer to="/nodejs">
                  <Nav.Link>
                  <i class="fab fa-node"></i>
                  </Nav.Link>
                </LinkContainer>
              
            </Nav>
          </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header
