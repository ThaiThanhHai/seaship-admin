import React from "react";

const EmptyOrder = ({ label }) => {
  return (
    <>
      <img
        src="https://i.imgur.com/7JCiMzQ.png"
        alt="empty"
        style={{
          padding: "100px",
          width: "50%",
          height: "30%",
        }}
      />
      <p>{label}</p>
    </>
  );
};

export default EmptyOrder;
