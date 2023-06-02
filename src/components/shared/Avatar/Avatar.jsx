import React from "react";
import "./Avatar.scss";
const Avatar = ({ fullSize = false, size }) => {
  return (
    <div
      className="avatar "
      style={{
        width: fullSize ? "100%" : size,
        height: fullSize ? "100%" : size,
      }}
    >
      <img
        src="https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg"
        alt=""
      />
    </div>
  );
};

export default Avatar;
