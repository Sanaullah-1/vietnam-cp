import React from "react";
import Slider from "react-slick";
import { paymentGatewayLogos } from "../../utils/depositUtils";
import "./PaymentSlider.scss";

const settings = {
  // className: "center",
  // centerMode: true,
  infinite: true,
  // centerPadding: "60px",
  slidesToShow: 3,
  speed: 500,
  autoplay: true,
  speed: 2000,
  autoplaySpeed: 2000,
  cssEase: "linear",
  pauseOnHover: false,
};

const PaymentsSlider = () => {
  return (
    <div className="payment-slider-wrapper d-none d-lg-block">
      <Slider {...settings} className="payments-slider">
        {Object.keys(paymentGatewayLogos).map((gateway) => (
          <div className="card-item">
            <button>
              <img src={paymentGatewayLogos[gateway]} alt="" />
            </button>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PaymentsSlider;
