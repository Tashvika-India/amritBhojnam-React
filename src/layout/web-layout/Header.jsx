import React from 'react'

const Header = () => {
  return (
    < >
      <header>
        <div className="header-top d-flex justify-content-between bg-yellow">
          <div className="container fb-container d-flex justify-content-between align-items-center">
            <p className='text-white fb-fs-14'>Free delivery & 40% discount for next 3 orders! Place your 1st order now.</p>
            <p className='text-white fb-fs-14'>Need Help? Call Us: <a className='text-white text-decoration-none' href="tel:+1800 900 5600">+1800 900 5600</a></p>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header