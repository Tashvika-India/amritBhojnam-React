import React from 'react'
import logo from '../../assets/images/web/logo.svg'
import { AiFillInstagram } from 'react-icons/ai'
import { FaFacebook, FaLinkedin } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import call from '../../assets/images/web/call.svg'
import clock from '../../assets/images/web/clock.svg'
import mail from '../../assets/images/web/mail.svg'

const Footer = () => {
  return (
    < > 
    <footer className='bg-light'>
      <div className="container fb-container">
        <div className="row py-5">
          <div className="col-md-5 mb-4">
            <div className="footer-detail">
              <img src={logo} alt="logo"  />
              <p className='my-3 text-balance'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum</p>
              <ul className="footer-detail-links d-flex flex-column gap-3 pt-2 mb-3">
                <li className='d-flex align-items-center fw-500'><span className='me-3'><img src={call} alt="call"  /></span>    <span className='text-orange me-2'>Call US :</span>  <a href='tel:+91-1234567890'>+91-1234567890</a> </li>
                <li className='d-flex align-items-center fw-500'><span  className='me-3'><img src={mail} alt="email"  /></span>   <span className='text-orange me-2'>Email : </span>  <a href='mailto: '>support@amritbhojanam.com</a> </li>
                <li className='d-flex align-items-center fw-500'><span  className='me-3'><img src={clock} alt="hours"  /></span>  <span className='text-orange me-2'>Hours : </span>  <time>10:00 - 18:00, Mon - Sat</time> </li>
              </ul>
              <div className="d-flex gap-4">
                <small className='fw-500 text-black'>Follow Us</small>  <div className="d-inline-flex gap-2 align-items-center"><a  href='https://www.instagram.com/'><AiFillInstagram size={24}  color='#f26722'/></a> <a href='https://www.instagram.com/'><FaLinkedin  size={20} color='#f26722'/> </a> <a href='https://www.facebook.com/'><FaFacebook size={20} color='#f26722'/> </a></div> 
              </div>
            </div>
          </div>
          <div className="col-md-7">
            <div className="row">
              <div className="col-md-4 col-6 mb-4">
                <h5 className='text-orange'>Company</h5>
                <ul className='footer-links mt-4 d-flex flex-column gap-3'>
                  <li><Link>About Us</Link></li>
                  <li><Link>Delivery Information</Link></li>
                  <li><Link>Privacy Policy</Link></li>
                  <li><Link>Term & Conditions</Link></li>
                  <li><Link>Contact Us</Link></li>
                  <li><Link>Support Center</Link></li>
                  <li><Link>Careers</Link></li>
                </ul>
              </div>
              <div className="col-md-4 col-6 mb-4">
                <h5 className='text-orange'>Help & Support</h5>
                <ul className='footer-links mt-4 d-flex flex-column gap-3'>
                  <li><Link>Sign In</Link></li>
                  <li><Link>Login</Link></li>
                  <li><Link>View Cart </Link></li>
                  <li><Link>Wishlist</Link></li>
                  <li><Link>Downloads</Link></li>
                  <li><Link>Upgrade Center</Link></li>
                  <li><Link>Video Tutorials</Link></li>
                  <li><Link>Contac & Support
                    </Link></li>
                </ul>
              </div>
              <div className="col-md-4 col-6 mb-4">
                <h5 className='text-orange'>Popular</h5>
                <ul className='footer-links mt-4 d-flex flex-column gap-3'>
                  <li><Link>Sorghum Millet (Jowar)</Link></li>
                  <li><Link>Proso Millet (Chena / Barri)</Link></li>
                  <li><Link>Pearl Millet (Bajra) </Link></li>
                  <li><Link>Foxtail Millet (Kakum / Kangni)</Link></li>
                  <li><Link>Barnyard Millet (Sanwa)</Link></li>
                  <li><Link>Little Millet (Moraiyo)</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom bg-yellow text-center py-2">
        <p className='text-white'>© 2024 - Amrit Bhojanam. All rights reserved.</p>
      </div>
    </footer>
    </>
  )
}

export default Footer