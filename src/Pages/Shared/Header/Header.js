
import React from 'react';
import { signOut } from 'firebase/auth';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase/firebase.init';
import logo from '../../../images/logo.png'
import { Link } from 'react-router-dom';

const Header = () => {
    const [user] = useAuthState(auth);

    const handleSingOut = (e) => {
        e.preventDefault();
        signOut(auth);
         
    }
    
    return (
        <header>
            <Navbar collapseOnSelect expand="lg" sticky="top" bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand as={Link} to={'/home'}><img height={'30'} src={logo} alt="logo" /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="home#services">Servives</Nav.Link>
                            <Nav.Link href="home#Experts">Experts</Nav.Link>
                            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Nav>
                            <Nav.Link as={Link} to={'/about'}>About</Nav.Link>
                            {
                            user ? 
                                <Nav.Link onClick={handleSingOut} as={Link} to={'/login'}>Sing Out</Nav.Link> 
                                :   
                                <Nav.Link as={Link} to="/login">Sing In</Nav.Link>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;