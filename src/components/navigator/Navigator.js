import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../../assets/logo.png'
import { Link } from 'react-router';

function Navigator() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container className=''>
        <Link className='text-black link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover ' to={''}><Navbar.Brand><img className='' 
        style={{ width: '50px', height: '50px' }} alt="Lazy Loaded" loading="lazy" src={logo}></img>webshop</Navbar.Brand></Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link ><Link className='text-black link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover' to={'/'}>home</Link></Nav.Link>
            <Nav.Link><Link className=' text-black link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover' to={'/services'}>Services</Link></Nav.Link>
            <NavDropdown title="admin" id="basic-nav-dropdown" className='text-black link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover'>
              <NavDropdown.Item ><Link className='text-black link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover text-black' to={'/create-product'}>Create Product</Link></NavDropdown.Item>
              <NavDropdown.Item ><Link className='text-black link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover text-black' to={'/inventory'}>inventory</Link></NavDropdown.Item>
              <NavDropdown.Item ><Link className='text-black link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover text-black' to={'/orderManagement'}>Manage Orders</Link></NavDropdown.Item>
            </NavDropdown>
          </Nav>
          
        <Nav.Link ><Link className='text-black link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover' to={'/cart'}>cart
        <svg className='mx-2' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-basket" viewBox="0 0 16 16">
  <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1v4.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 13.5V9a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1.217L5.07 1.243a.5.5 0 0 1 .686-.172zM2 9v4.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V9zM1 7v1h14V7zm3 3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 4 10m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 6 10m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 8 10m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5"/>
</svg>
        </Link></Nav.Link>
        <Nav.Link ><Link className='mx-2 text-black link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover' to={'/myOrders'}>My orders</Link></Nav.Link>
        </Navbar.Collapse>
        
      </Container>
    </Navbar>
  );
}

export default Navigator;