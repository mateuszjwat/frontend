import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import {Form} from 'react-bootstrap';
import { LinkContainer} from 'react-router-bootstrap';
import {Link} from 'react-router-dom';

function NavigationBar(props) {

    let loginNav = <Navbar.Brand>Login</Navbar.Brand>;
    console.log("z navBara: ");
    if (!props.user.loggedIn){
        console.log("z navBara: niezalogowany");
        loginNav = <Navbar.Brand>Login</Navbar.Brand>;
    } else{
        console.log("z navBara: zalogowany");
        loginNav = <Navbar.Brand>LogOut</Navbar.Brand>;
    }

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
        <LinkContainer to="/">
            <Navbar.Brand>Home</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                <NavDropdown.Item>
                    <LinkContainer to="/about">
                        <Nav.Item>About</Nav.Item>
                    </LinkContainer>
                </NavDropdown.Item>
                <NavDropdown.Item>
                    <LinkContainer to="/contact">
                        <Nav.Item>Contact</Nav.Item>
                    </LinkContainer>
                </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form inline>
            <LinkContainer to="/login">
                {loginNav}
            </LinkContainer>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    );
}

export default NavigationBar;