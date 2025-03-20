import React, { useState } from "react";
import { BsArrowRepeat } from "react-icons/bs";
import { HiDownload, HiOutlineExternalLink } from "react-icons/hi";
import { Link } from "react-router-dom";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { downloadInvoiceApi } from "../../../../services/adminApiRoutes";
const OrderListComponent = ({
  order,
  handleReOrderClick,
  handleInvoiceClick,
  handleReviewClick,
  tickImg,
}) => {
  const [downloadLoading, setDownloadLoading] = useState(false);
  const handleDownloadInvoice = async (id) => {
    setDownloadLoading(true);
    try {
      const response = await downloadInvoiceApi(id);
      const base64String = response?.data?.pdf_base64; // Base64 data

      if (base64String) {
        // Convert Base64 string to a Blob
        const byteCharacters = atob(base64String); // Decode Base64
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: "application/pdf" });

        // Create a URL for the Blob
        const blobUrl = window.URL.createObjectURL(blob);

        // Create a temporary link to trigger download
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = "invoice.pdf";
        name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        window.URL.revokeObjectURL(blobUrl);
      } else {
        console.error("No file data found in the response");
      }
    } catch (error) {
      console.error("Error downloading invoice:", error);
    } finally {
      setDownloadLoading(false);
    }
  };
  return (
    <>
      {order.results.map((item) => (
        <div
          className="summary-card rounded-20 mb-4 overflow-hidden"
          key={item.id}
        >
          <div className="container">
            <div className="row border-bottom px-0 px-md-3 py-3 align-items-center">
              <div className="col-lg-3 col-md-3 col-5 mb-lg-0 mb-md-0 mb-2">
                <p>
                  Order ID:
                  <span
                    className="fw-600 text-yellow"
                    title={item?.display_order_id}
                  >
                    &nbsp;&nbsp;
                    {item?.display_order_id}
                  </span>
                </p>
              </div>
              <div className="col-lg-3 col-md-3 col-7 mb-lg-0 mb-md-0 mb-2">
                <p>
                  Order Placed:
                  <span className="fw-600">
                    &nbsp;&nbsp;
                    {new Date(item?.created_at).toLocaleDateString("en-GB")}
                  </span>
                </p>
              </div>
              <div className="col-6 col-md-3">
                <p>
                  Total Amount:
                  <span className="fw-600">
                    &nbsp;&nbsp; ₹ {item?.amount_to_pay}
                  </span>
                </p>
              </div>
              <div className="col-6 col-md-3 d-flex align-items-center justify-content-end gap-3 text-end align-self-end">
                <button
                  onClick={() => handleReOrderClick(item?.id)}
                  className="fw-500 text-center border-0 text-orange bg-custom-btn-bg px-2 py-1 rounded-2 d-flex align-items-center gap-2 text-nowrap"
                >
                  <BsArrowRepeat size={"1.2rem"} className="buy-again-icon" />
                  Buy Again
                </button>
                <button
                  className="fw-500 text-center border-0 text-orange bg-custom-btn-bg d-flex align-items-center py-1 rounded-2 px-2 gap-2"
                  disabled ={downloadLoading}
                  onClick={() => handleDownloadInvoice(item?.id || "")}
                >
                  <HiDownload size={"1.2rem"} className="buy-again-icon" />
                 {downloadLoading ? "download..." : "Invoice"}
                </button>
              </div>
            </div>
            {item?.product_details.map((data) => (
              <div className="border-bottom" key={data?.id}>
                <div className="row px-2 px-md-3 pt-3 py-md-4">
                  <div className="col-md-8">
                    <div className="prod-detail d-flex align-items-center">
                      <img
                        className="img-fluid me-4 rounded-4"
                        style={{
                          height: "6rem",
                          width: "6rem",
                        }}
                        src={data?.product?.images[0]?.image}
                        alt="pencil"
                      />
                      <div>
                        <div>
                          <Link
                            className="d-flex gap-2 align-items-center"
                            to={`/product-detail?product_id=${data?.product?.id}`}
                          >
                            <p className="fb-fs-18 fw-600 text-dark-grey">
                              {data?.product?.name}
                            </p>
                            <HiOutlineExternalLink color="#F26722" size={22} />
                          </Link>
                        </div>
                        <p className="mt-2">
                          Qty:
                          <span className="fw-600">{data?.item_quantity}</span>
                        </p>
                        <p className="mt-2">
                          Size:
                          <span className="fw-600">
                            {`${data?.product?.quantity}`}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div>
                      <button
                        onClick={() =>
                          handleReviewClick(
                            data?.product?.id,
                            data?.product?.name,
                            data?.product?.images[0]?.image
                          )
                        }
                        className="fw-bold mt-2 text-orange text-center border-0 bg-transparent "
                      >
                        Add Review
                      </button>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="price-sec text-end text-dark-grey">
                      <p className="fb-fs-24 fw-bold">₹{data?.price}</p>
                    </div>
                  </div>
                </div>
                {/* <div className="row m-md-3">
                  <div className="col-md-6"></div>
                  <div className="col-md-5 col-xxl-3 ms-auto text-md-end">
                    <div className="more-option d-flex mb-2 mb-lg-0 justify-content-evenly justify-content-md-between">
                      <button
                        onClick={() =>
                          handleReviewClick(
                            data?.product?.id,
                            data?.product?.name,
                            data?.product?.images[0]?.image
                          )
                        }
                        className="fw-500 text-center border-0 text-dark-grey bg-transparent "
                      >
                        Add Review
                      </button>
                      <span className="vr"></span>
                      <Link
                        to={`/product-detail?product_id=${data?.product?.id}`}
                        className="fw-600 text-center border-0 bg-transparent text-orange"
                      >
                        View Product
                      </Link>
                    </div>
                  </div>
                </div> */}
              </div>
            ))}
            <div className="row bg-custom-light-yellow px-0 px-md-3 py-3 align-items-center">
              <div className="d-flex align-items-center justify-content-between bg-custom-light-yellow">
                <div className="d-flex mb-2 mb-md-0 delivery-check">
                  <img
                    className="img-fluid me-2"
                    style={{
                      height: "1.3rem",
                      width: "1.3rem",
                      aspectRatio: "1/1",
                    }}
                    src={tickImg}
                    alt="pencil"
                  />
                  <p className="text-dark-grey">
                    Delivered within {item?.payment_details?.delivery_days} days
                  </p>
                </div>
                <div className="track-order-button mb-2 mb-md-0">
                  <Link
                    className="text-orange fb-fs-16 d-flex align-items-center"
                    to={`/track-order/${item.id}`}
                  >
                    Track Order
                    <MdKeyboardDoubleArrowRight
                      color="#F26722"
                      className="mt-1"
                      size={18}
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default OrderListComponent;
