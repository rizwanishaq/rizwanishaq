import React from 'react'
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Container } from 'react-bootstrap'

const Header = () => {
    return (
        <Navbar bg="light" variant="light" expand="lg" collapseOnSelect>
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>
                        <i className="fas fa-home"></i>
                    </Navbar.Brand>
                </LinkContainer>
            </Container>
        </Navbar>
    )
}

export default Header
