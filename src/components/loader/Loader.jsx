import React from "react";
import { ProgressBar } from "react-loader-spinner";
import './loader.scss'


const Loader = () => {
  return (
    <div className="loader">
      <div className="procesing">Vui lòng chờ trong giây lát....</div>
      <ProgressBar
        height="120"
        width="120"
        ariaLabel="progress-bar-loading"
        wrapperStyle={{}}
        wrapperClass="progress-bar-wrapper"
        borderColor="#333"
        barColor="#007041"
      />
    </div>
  );
};

export default Loader;
