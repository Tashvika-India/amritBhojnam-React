import React from 'react'
import coin from "../../assets/images/web/star-coin.png";
import { Link } from 'react-router-dom';
const ProfileBanner = ({coins}) => {
    return (
        <div className="user-profile-img d-flex justify-content-end mt-lg-5 mt-md-5 mt-4">
            <div className="pt-lg-4 pt-md-4 pe-lg-5 pe-md-5 pe-3 mt-2">
                <div className="d-flex">
                    <div className="ms-auto">
                        <Link to="/coin-history" className="d-inline-block white-button rounded-5 fw-600">
                            Show Tokens History
                        </Link>
                    </div>
                </div>
                <div className="text-white d-flex align-items-center gap-lg-5 gap-md-5 gap-4 mt-lg-4 mt-md-4 pt-lg-3 pt-md-3 amrit-coin-heading-profile-container">
                    <div className="amrit-coin-heading-profile">
                        <p className="fw-bolder fb-fs-28 lh-normal">Amrit Coins</p>
                        <p className="fw-600 fb-fs-18">Redeem your coins now</p>
                    </div>
                    <div className="d-flex align-items-center gap-lg-3 gap-md-3 gap-2 coin-count-section">
                        <img className="img-fluid" src={coin} alt="empty-address" />
                        <p style={{ fontWeight: "800", fontSize: "2.625rem", textShadow: "0px 4px 4px rgba(0, 0, 0, 0.6"}}>{coins?.available_coins}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileBanner