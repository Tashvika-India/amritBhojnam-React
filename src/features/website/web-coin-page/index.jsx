import React, { useEffect, useState } from "react";
import Header from "../../../layout/web-layout/Header";
import Footer from "../../../layout/web-layout/Footer";
import profileBg from "../../../assets/images/web/account/profile-bg.png";
import trophyImg from "../../../assets/images/web/trophy-img.png";
import coinsImg from "../../../assets/images/web/coins.svg"
import { getAmritCoinHistoryApi } from "../../../services/adminApiRoutes";
import { formatDateTime } from "../../../utils/constant-variable";

const CoinPage = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const getCoinList = async () => {
    setLoading(true)
    try {
      const response = await getAmritCoinHistoryApi();
      setData(response?.data?.results)
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  } 
  
  useEffect(() => {
    getCoinList();
  }, [])
  return (
    <>
      <div className="web-wrapper-main">
        <Header />
        <section className="coin-page">
          <div className="container fb-container">
            <div className="row">
              <div className="col-lg-10 mx-auto">
                <div className="user-profile-img  mt-lg-5 mt-md-5 mt-4">
                  <img
                    className="img-fluid profile-img profile-foreground-img rounded-top w-100 mt-5"
                    src={profileBg}
                    alt="pencil"
                    style={{ height: "200px" }}
                  />
                </div>
                <ul className="coin-stepper-section mt-lg-5">
                  { data?.map((data) => (
                    <li className="coin-step-part d-flex justify-content-between pb-lg-5">
                      <div className="mt-4 pb-5">
                        <p className="fw-500 fb-fs-14 text-dark-grey mb-2">{formatDateTime(data?.created_at)}</p>
                        <p className="fb-fs-24 fw-600">
                          <span className="text-orange fw-bolder">{data?.coins}</span> Amrit Coins earned
                        </p>
                        <p className="text-dark-grey">Amrit Coins Collected</p>
                        <p className="fb-fs-22 text-yellow fw-500 mt-lg-4 mt-md-4 mt-2">
                          #{data?.order_id}
                        </p>
                      </div>
                      <div className="d-inline-flex align-items-center gap-2">
                        <p className="fb-fs-24 fw-600">
                          {(data?.transaction_type === "deduct") ? <span style={{ color: "#E70900" }}>+{data?.coins} </span> : <span style={{ color: "#4CD964" }} >-{data?.coins}</span>}
                        </p>
                        <img className="img-fluid" src={coinsImg} alt="pencil" />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};

export default CoinPage;
