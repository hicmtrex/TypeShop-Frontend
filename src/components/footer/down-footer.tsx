import { Image } from 'react-bootstrap';
import toast from 'react-hot-toast';
import './footer.css';

const DownFooter = () => {
  return (
    <footer id='footer' className='mt-auto'>
      <div className='footer-top'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-3 col-md-6 footer-contact'>
              <h3>
                <Image width={100} src='/LogoMakr-4g0P6C.png' alt='' />
              </h3>
              <p>
                2 Allée Andersen
                <br />
                69780 Mions Lyon
                <br />
                France
                <br />
                <br />
                <strong>Phone:</strong> 06 76 56 48 93
                <br />
                <strong>Email:</strong> typeshop@me.com
                <br />
              </p>
            </div>
            <div className='col-lg-2 col-md-6 footer-links'>
              <h4>Useful Links</h4>
              <ul>
                <li>
                  <i className='bx bx-chevron-right' /> <a href='#'>Home</a>
                </li>
                <li>
                  <i className='bx bx-chevron-right' /> <a href='#'>About us</a>
                </li>
                <li>
                  <i className='bx bx-chevron-right' /> <a href='#'>Services</a>
                </li>
                <li>
                  <i className='bx bx-chevron-right' />{' '}
                  <a href='#'>Terms of service</a>
                </li>
                <li>
                  <i className='bx bx-chevron-right' />{' '}
                  <a href='#'>Privacy policy</a>
                </li>
              </ul>
            </div>
            <div className='col-lg-3 col-md-6 footer-links'>
              <h4>Our Services</h4>
              <ul>
                <li>
                  <i className='bx bx-chevron-right' />{' '}
                  <a href='#'>Web Design</a>
                </li>
                <li>
                  <i className='bx bx-chevron-right' />{' '}
                  <a href='#'>Web Development</a>
                </li>
                <li>
                  <i className='bx bx-chevron-right' />{' '}
                  <a href='#'>Product Management</a>
                </li>
                <li>
                  <i className='bx bx-chevron-right' />{' '}
                  <a href='#'>Marketing</a>
                </li>
                <li>
                  <i className='bx bx-chevron-right' />{' '}
                  <a href='#'>Graphic Design</a>
                </li>
              </ul>
            </div>
            <div className='col-lg-4 col-md-6 footer-newsletter'>
              <h4>Join Our Newsletter</h4>
              <p>
                Tamen quem nulla quae legam multos aute sint culpa legam noster
                magna
              </p>
              <form onSubmit={() => toast.success('thanks for yr Subscrition')}>
                <input
                  type='email'
                  required
                  placeholder='email@domain.com'
                  name='email'
                />
                <input type='submit' defaultValue='Subscribe' />
              </form>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default DownFooter;
