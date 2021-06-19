import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import {Form} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

function NavigationBar(props) {

    function logOut(){
        props.setUser(null);
    }

    let loginNav = <Navbar.Brand>Login</Navbar.Brand>;
    if (!props.user){
        //console.log("z navBara: niezalogowany");
        loginNav = <Navbar.Brand>Login</Navbar.Brand>;
    } else{
        //console.log("z navBara: zalogowany");
        loginNav = <Navbar.Brand onClick={logOut}>LogOut</Navbar.Brand>;
    }

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
        <LinkContainer to="/">
            <Navbar.Brand>Home</Navbar.Brand>
        </LinkContainer>
        <LinkContainer to="/PublicFiszki">
            <Navbar.Brand>Fiszki</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">
            <Nav class ="navbar-right">
            <Form inline>
            <Nav>
             <NavBarLogged />
            </Nav>
            <LinkContainer to="/login">
                {loginNav}
            </LinkContainer>
          </Form>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );


    function NavBarLogged(){
        if(props.user){
            return(
                <NavDropdown className="mr-auto" title="Twój profil" id="collasible-nav-dropdown">
                    <NavDropdown.Item>
                        <LinkContainer to="/profile">
                            <Nav.Item>Profil</Nav.Item>
                        </LinkContainer>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                        <LinkContainer to="/myFiszkas">
                            <Nav.Item>Twoje zestawy</Nav.Item>
                        </LinkContainer>
                    </NavDropdown.Item>
                </NavDropdown>
            );
        } else {
            return <div></div>;
        }
    }
}


export default NavigationBar;