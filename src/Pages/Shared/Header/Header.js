
import React, { useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase/firebase.init';
import logo from '../../../images/logo.png'
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {
    const [user] = useAuthState(auth);

    const handleSingOut = (e) => {
        e.preventDefault();
        signOut(auth);

    }
    useEffect(() => {
        if (user) {
            toast('Hello ' + user?.displayName);
        }
    }, [])

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
                            <Nav.Link as={Link} to='/addservice'>Add Service</Nav.Link>
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
                                user && <Nav.Link as={Link} to={'/manage'}>Manage </Nav.Link>
                            }
                            {
                                user && <Nav.Link as={Link} to={'/orders'}>Orders </Nav.Link>
                            }
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
            <ToastContainer></ToastContainer>
        </header>
    );
};

export default Header;