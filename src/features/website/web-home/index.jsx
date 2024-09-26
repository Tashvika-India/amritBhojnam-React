import React from 'react'
import Header from '../../../layout/web-layout/Header'
import Footer from '../../../layout/web-layout/Footer'
import { Nav, Tab } from 'react-bootstrap'

const HomePage = () => {
    return (
        <div className='web-wrapper-main'>
            <Header />
            <section>
                <div className="container fb-container">
                    <div className="cat-items-wrapper">
                        <div className="cat-itmes">
                            <div className="item-image" style={{ "--linear": "linear-gradient(180deg, #FFB7B7 0%, #FFE0E0 100%)" }}>
                                <img className="img-fluid" src="https://picsum.photos/200/300" alt="millet-rice" />
                            </div>
                            <h6 className='fb-fs-16 fw-500'>
                                Millet Rice
                            </h6>
                        </div>
                        <div className="cat-itmes">
                            <div className="item-image" style={{ "--linear": "linear-gradient(180deg, #96D7FF 0%, #D7F0FF 100%)" }}>
                                <img className="img-fluid" src="https://picsum.photos/200/300" alt="millet-rice" />
                            </div>
                            <h6 className='fb-fs-16 fw-500'>
                                Bakery & Confectionery
                            </h6>
                        </div>
                        <div className="cat-itmes">
                            <div className="item-image" style={{ "--linear": "linear-gradient(180deg, #FFCC8F 0%, #FFE9CF 100%)" }}>
                                <img className="img-fluid" src="https://picsum.photos/200/300" alt="millet-rice" />
                            </div>
                            <h6 className='fb-fs-16 fw-500'>
                                Flour
                            </h6>
                        </div>
                        <div className="cat-itmes">
                            <div className="item-image" style={{ "--linear": " linear-gradient(180deg, #C2FFBD 0%, #EFFFEE 100%)" }}>
                                <img className="img-fluid" src="https://picsum.photos/200/300" alt="millet-rice" />
                            </div>
                            <h6 className='fb-fs-16 fw-500'>
                                Beverages
                            </h6>
                        </div>
                        <div className="cat-itmes">
                            <div className="item-image" style={{ "--linear": "linear-gradient(180deg, #F6D4FF 0%, #FBECFF 100%)" }}>
                                <img className="img-fluid" src="https://picsum.photos/200/300" alt="millet-rice" />
                            </div>
                            <h6 className='fb-fs-16 fw-500'>
                                Snacks & Munching Rice
                            </h6>
                        </div>
                        <div className="cat-itmes">
                            <div className="item-image" style={{ "--linear": "linear-gradient(180deg, #C3CCFF 0%, #E0E5FF 100%)" }}>
                                <img className="img-fluid" src="https://picsum.photos/200/300" alt="millet-rice" />
                            </div>
                            <h6 className='fb-fs-16 fw-500'>
                                Instant Mixes
                            </h6>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="container fb-container">
                    <Tab.Container id="left-tabs-example" defaultActiveKey="All">
                        <div className="row">
                            <div className="col-md-6">
                                <h3 className='fw-bold'>Our Best Selling Products</h3>
                            </div>
                            <div className="col-md-6">
                                <Nav variant="pills" className="flex-row justify-content-end tab-nav-wrapper">
                                    <Nav.Item className='nav'>
                                        <Nav.Link className='fb-fs-18' eventKey="All">All</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link className='fb-fs-18' eventKey="Snacks">Snacks</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link className='fb-fs-18' eventKey="Instant-Mix">Instant Mix</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link className='fb-fs-18' eventKey="Flour">Flour</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link className='fb-fs-18' eventKey="Rice">Rice</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </div>
                            <div className="col-md-12">
                                <Tab.Content>
                                    <Tab.Pane eventKey="All">
                                        <div className="row">
                                            <div className="col-md-2">
                                                <div className="product-card border p-3">
                                                    <span className='product-badge badge bg-yellow fw-400'>10% off</span>
                                                    <span className='product-fav'></span>
                                                    <div className="">
                                                        <img className="img-fluid" src="https://picsum.photos/200/300" alt="product" />
                                                    </div>
                                                    <h6 className='fb-fs-12 fw-500'><span></span> 80 Calories</h6>
                                                    <h5 className='fb-fs-14 fw-600'>Masala Millet (Veggie Masala)</h5>
                                                    <h5 className='fb-fs-14 fw-600'>100 g</h5>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <h6 className='fb-fs-20 fw-bold mb-0'><small className='fw-500 fb-fs-16'><strike>₹80</strike> </small> ₹70</h6>
                                                        <button className='button-primary py-1 rounded fb-fs-14 fw-600'>Add</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="Snacks">Second tab content</Tab.Pane>
                                    <Tab.Pane eventKey="Instant-Mix">Second tab content</Tab.Pane>
                                    <Tab.Pane eventKey="Flour">Second tab content</Tab.Pane>
                                    <Tab.Pane eventKey="Rice">Second tab content</Tab.Pane>
                                </Tab.Content>
                            </div>
                        </div>
                    </Tab.Container>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default HomePage