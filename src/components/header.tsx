import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux';
import { reset } from '../redux/cart/cart-slice';
import { userLogout } from '../redux/users/login-slice';

const Header = () => {
  const { userInfo } = useAppSelector((state) => state.login);
  const { cartItems } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(userLogout());
    dispatch(reset());
    navigate('/login');
  };

  return (
    <>
      <nav
        className='navbar navbar-expand-lg bg-dark navbar-light h-12 d-none d-lg-block'
        id='templatemo_nav_top'
      >
        <div className='container text-light'>
          <div className='w-full d-flex justify-content-between align-items-center'>
            <div>
              <i className='fa text-sm  fa-envelope mx-2'></i>
              <a
                className='navbar-sm-brand text-light text-sm text-decoration-none'
                href='mailto:info@company.com'
              >
                typeshop@me.com
              </a>
              <i className='fa text-sm  fa-phone mx-2'></i>
              <a
                className='navbar-sm-brand text-sm  text-light text-decoration-none'
                href='tel:010-020-0340'
              >
                06 76 56 48 93
              </a>
            </div>
            <div>
              <a
                className='text-light'
                href='https://fb.com'
                target='_blank'
                rel='sponsored'
              >
                <i className='fab text-sm  fa-facebook-f fa-sm fa-fw me-2'></i>
              </a>
              <a
                className='text-light'
                href='https://www.instagram.com/'
                target='_blank'
              >
                <i className='fab text-sm  fa-instagram fa-sm fa-fw me-2'></i>
              </a>
              <a
                className='text-light'
                href='https://twitter.com/'
                target='_blank'
              >
                <i className='fab text-sm fa-twitter fa-sm fa-fw me-2'></i>
              </a>
              <a
                className='text-light'
                href='https://www.linkedin.com/'
                target='_blank'
              >
                <i className='fab text-sm fa-linkedin fa-sm fa-fw'></i>
              </a>
            </div>
          </div>
        </div>
      </nav>

      <Navbar
        collapseOnSelect
        expand='lg'
        sticky='top'
        bg='white'
        className='shadow px-0 py-3'
      >
        <div className='container-xl'>
          {/* Logo */}
          <Navbar.Brand as={NavLink} to='/'>
            <img
              src='/LogoMakr-6Tit9e.png'
              className='avatar rounded me-lg-10'
              alt='...'
            />
          </Navbar.Brand>
          {/* Navbar toggle */}
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          {/* Collapse */}
          <Navbar.Collapse id='responsive-navbar-nav'>
            {/* Nav */}
            <div className='navbar-nav me-lg-auto'>
              <Nav.Item
                as={NavLink}
                className=' nav-link active'
                to='/'
                aria-current='page'
              >
                <span>Home</span>
              </Nav.Item>
              <Nav.Item as={NavLink} className=' nav-link' to='/home'>
                <span>Product</span>
              </Nav.Item>

              <Nav.Item as={NavLink} className=' nav-link' to='/contact'>
                <span>Contact</span>
              </Nav.Item>
            </div>
            {/* Right navigation */}

            <div className='d-flex align-items-center'>
              <div className='d-flex align-items-center'>
                <Link className='nav-link' to='/home'>
                  <i className='fa fa-fw fa-search text-dark me-2'></i>
                </Link>
                <Link
                  className='nav-icon position-relative text-decoration-none'
                  to='/cart'
                >
                  <i className='fa fa-fw fa-cart-arrow-down text-dark me-2 '></i>
                  <span
                    style={{ backgroundColor: '#e03a3c' }}
                    className='position-absolute top-0 left-100 translate-middle badge rounded-pill  text-white'
                  >
                    {cartItems.length}
                  </span>
                </Link>
              </div>
              {!userInfo ? (
                <>
                  <div className='navbar-nav ms-lg-4'>
                    <Nav.Link
                      as={NavLink}
                      to='/login'
                      className='nav-item nav-link'
                    >
                      Sign in
                    </Nav.Link>
                  </div>

                  <div className='d-flex align-items-lg-center mt-3 mt-lg-0'>
                    <Nav.Link
                      as={NavLink}
                      to='/register'
                      style={{ backgroundColor: '#e03a3c' }}
                      className='btn btn-sm  text-white w-full w-lg-auto '
                    >
                      Register
                    </Nav.Link>
                  </div>
                </>
              ) : (
                <NavDropdown
                  title={<i className='fa fa-fw fa-user text-dark mr-3'></i>}
                  id='basic-nav-dropdown'
                >
                  {userInfo.isAdmin && (
                    <NavDropdown.Item as={NavLink} to='/dashboard'>
                      Dashboard
                    </NavDropdown.Item>
                  )}
                  <NavDropdown.Item
                    as={NavLink}
                    to={`/profile/${userInfo._id}`}
                  >
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={onLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
              )}
            </div>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </>
  );
};

export default Header;
