import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import Heading from "@/components/ui/Heading";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { getAmritCoinApi, postAmritCoinApi } from "../../../services/adminApiRoutes";
import { notifySuccess } from "../../../components/ui/Notification";
import YellowButton from "../../../components/buttons/YellowButton";

function CoinManagement() {
  const [earningConditions, setEarningConditions] = useState([{ amount: "", coin: "" }]);
  const [spendingConditions, setSpendingConditions] = useState([{ amount: "", coin: "" }]);

  const formik = useFormik({
    initialValues: {
      coins: "",
      coin_price: "",
    },
    onSubmit: async (values) => {
      const payload = {
        coins: parseInt(values.coins, 10),
        coin_price: parseInt(values.coin_price, 10),
        earning: earningConditions.map(ec => ({
          amount: parseInt(ec.amount, 10),
          coin: parseInt(ec.coin, 10),
        })),
        spending: spendingConditions.map(sc => ({
          amount: parseInt(sc.amount, 10),
          coin: parseInt(sc.coin, 10),
        })),
      };

      try {
        await postAmritCoinApi(payload);
        notifySuccess("Coins Updated Successfully");
      } catch (error) {
        console.log("API Response:", error);
        notifyError(error.response?.data?.error);
      }
    },
  });

  const getConins = async () => {
    try {
      const response = await getAmritCoinApi();
      setEarningConditions(response?.data?.earning)
      setSpendingConditions(response?.data?.spending)
      formik.setValues(response?.data)
    } catch (error) {
      console.log("Error on Category List", error);
    }
  }

  const addEarningCondition = () => {
    setEarningConditions([...earningConditions, { amount: "", coin: "" }]);
  };

  const removeEarningCondition = (index) => {
    const newConditions = earningConditions.filter((_, i) => i !== index);
    setEarningConditions(newConditions);
  };


  const addSpendingCondition = () => {
    setSpendingConditions([...spendingConditions, { amount: "", coin: "" }]);
  };

  const removeSpendingCondition = (index) => { 
    const newConditions = spendingConditions.filter((_, i) => i !== index);
    setSpendingConditions(newConditions);
  };

  useEffect(() => {
    getConins();
  }, [])

  return (
    <>
      <div className="mt-5 mb-4 row">
        <div className="col-md-6">
        <Heading value={"Coin Management"} />
        </div>
        <div className="col-12 mt-3">
          <Breadcrumbs aria-label="breadcrumb">
          <Link to={"/admin/dashboard"}>Dashboard</Link>
          <Typography className="text-orange">Coin Management</Typography>
          </Breadcrumbs>
        </div>
      </div>
      <div className="">
        <form onSubmit={formik.handleSubmit}>
          <div className="row">
            <div className="col-md-auto">
              <div className="card">
                <div className="card-body p-4 mx-2 mb-3 mt-1">
                  <h5 className="mb-4 pb-2">Coin Price Settings</h5>
                  <div className="d-flex gap-3 align-items-center">
                    <div className="coin-div">
                      <input
                        type="text"
                        className="coin-input"
                        name="coins"
                        placeholder="1"
                        onChange={formik.handleChange}
                        value={formik.values.coins}
                      />
                      <p className="coin-text fb-fs-14 bg-light-orange">Coin</p>
                    </div>
                    <div>
                      <span className="text-mid-grey">=</span>
                    </div>
                    <div className="coin-div">
                      <input
                        type="text"
                        className="coin-input"
                        name="coin_price"
                        placeholder="1"
                        onChange={formik.handleChange}
                        value={formik.values.coin_price}
                      />
                      <p className="coin-text fb-fs-14 bg-light-orange">INR</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card" style={{ minHeight: "60vh" }}>
                <div className="card-body p-4 mx-2 mb-3 mt-1">
                  <h5 className="mb-4 pb-1">Earning Conditions</h5>
                  <div className="d-flex align-items-center gap-5">
                    <p className="text-mid-grey fw-500 mb-1" style={{ fontSize: "14px" }}>
                      SPEND AMOUNT(INR.)
                    </p>
                    <p className="text-mid-grey fw-500 mb-1 ms-4 ps-1" style={{ fontSize: "14px" }}>
                      REWARD COIN %
                    </p>
                  </div>
                  {earningConditions.map((condition, index) => (
                    <div key={index} className="d-flex gap-3 align-items-center mb-4">
                      <div className="coin-div">
                        <input
                          type="text"
                          className="coin-input"
                          placeholder="1"
                          value={condition.amount}
                          onChange={(e) => {
                            const newConditions = [...earningConditions];
                            newConditions[index].amount = e.target.value;
                            setEarningConditions(newConditions);
                          }}
                        />
                        <p className="coin-text fb-fs-14 bg-light-orange">INR.</p>
                      </div>
                      <div>
                        <span className="text-mid-grey">=</span>
                      </div>
                      <div className="coin-div">
                        <input
                          type="text"
                          className="coin-input"
                          placeholder="1"
                          value={condition.coin}
                          onChange={(e) => {
                            const newConditions = [...earningConditions];
                            newConditions[index].coin = e.target.value;
                            setEarningConditions(newConditions);
                          }}
                        />
                        <p className="coin-text fb-fs-14 bg-light-orange">%</p>
                      </div>
                      <div className="d-flex text-end gap-3 justify-content-end">
                        <button
                          type="button"
                          className="button-set-default rounded-1" style={{ width: "45px", height: "40px" }}
                          onClick={() => removeEarningCondition(index)}>
                          -
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="d-flex text-end gap-3 justify-content-end" >
                    <button
                      type="button" style={{ width: "45px", height: "40px" }}
                      className="button-yellow "
                      onClick={addEarningCondition}>
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card" style={{ minHeight: "60vh" }}>
                <div className="card-body p-4 mx-2 mb-3 mt-1">
                  <h5 className="mb-4 pb-1">Spending Conditions</h5>
                  <div className="d-flex align-items-center gap-5">
                    <p className="text-mid-grey fw-500 mb-1" style={{ fontSize: "14px" }}>
                      SPEND AMOUNT(INR.)
                    </p>
                    <p className="text-mid-grey fw-500 mb-1 ms-4 ps-1" style={{ fontSize: "14px" }}>
                      SPEND COIN %
                    </p>
                  </div>
                  {spendingConditions.map((condition, index) => (
                    <div key={index} className="d-flex gap-3 align-items-center mb-4">
                      <div className="coin-div">
                        <input
                          type="text"
                          className="coin-input"
                          placeholder="1"
                          value={condition.amount}
                          onChange={(e) => {
                            const newConditions = [...spendingConditions];
                            newConditions[index].amount = e.target.value;
                            setSpendingConditions(newConditions);
                          }} />
                        <p className="coin-text fb-fs-14 bg-light-orange">INR.</p>
                      </div>
                      <div>
                        <span className="text-mid-grey">=</span>
                      </div>
                      <div className="coin-div">
                        <input
                          type="text"
                          className="coin-input"
                          placeholder="1"
                          value={condition.coin}
                          onChange={(e) => {
                            const newConditions = [...spendingConditions];
                            newConditions[index].coin = e.target.value;
                            setSpendingConditions(newConditions);
                          }}
                        />
                        <p className="coin-text fb-fs-14 bg-light-orange">%</p>
                      </div>
                      <div className="d-flex text-end gap-3 justify-content-end">
                        <button
                          type="button"
                          className="button-set-default rounded-1" style={{ width: "45px", height: "40px" }}
                          onClick={() => removeSpendingCondition(index)}>
                          -
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="d-flex text-end gap-3 justify-content-end">
                    <button
                      type="button"
                      className="button-yellow" style={{ width: "45px", height: "40px" }}
                      onClick={addSpendingCondition}>
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 my-4 d-flex justify-content-end ">
              <YellowButton lable={"Update Detail" } handleClick={formik.handleSubmit} />
              <button
                className="button-primary-reverse me-4 ms-3 py-2"
                type="button"
                onClick={() => formik.resetForm()}>
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default CoinManagement;