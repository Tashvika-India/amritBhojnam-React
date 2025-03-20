import React from 'react'
import coin from "../../assets/images/web/star-coin.png"; 

const CoinBanner = ({data}) => {


    return (
        <div className="user-profile-img mt-lg-5 mt-md-5 mt-4 px-lg-5 px-md-5 px-3 coin-banner">
            <div className="text-white d-flex justify-content-between align-items-center gap-lg-5 gap-md-5 gap-1 h-100">
                <div>
                    <div className="mb-lg-4 mb-md-4 mb-1">
                        <p className="fw-bolder fb-fs-28 lh-normal">Amrit Coins</p>
                        <p className="fw-600 fb-fs-18">Redeem your coins now</p>
                    </div>
                    <p className='earn'>Earn <span className='fw-bold'>Amrit Coins</span> on buying any product everytime</p>
                </div>
                <div className="d-flex align-items-center gap-lg-3 gap-md-3 gap-2 align-self-end mb-lg-5 mb-md-5 mb-2 coin-count-section">
                    <img className="img-fluid" src={coin} alt="empty-address" />
                    <p style={{ fontWeight: "800", fontSize: "2.625rem", textShadow: "0px 4px 4px rgba(0, 0, 0, 0.6"}}>{data?.available_coins}</p>
                </div>
            </div>
        </div>
    )
}

export default CoinBanner