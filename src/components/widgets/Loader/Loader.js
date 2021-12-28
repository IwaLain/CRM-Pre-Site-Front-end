import React, { Component } from "react";
import PropTypes from "prop-types";

class Loader extends Component {
  render() {
    let colorFill = "#010101";
    return (
      <div id="loader" className={"loader " + this.props.additionalClass}>
        <svg
          width="201"
          height="146"
          viewBox="0 0 201 146"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M67.8363 110.239C53.8431 73.4889 39.8727 36.7387 25.8795 0C17.2454 13.5233 8.62268 27.0466 0 40.6156C14.3139 75.7466 28.5819 110.878 42.8958 145.997C55.9844 145.997 69.0616 146.009 82.1387 145.986C89.1239 135.267 96.1893 124.606 103.152 113.865L105.35 110.228C92.8455 110.25 80.3409 110.228 67.8363 110.239Z"
            fill={colorFill}
          >
            <animate
              attributeName="fill"
              dur="1s"
              from={colorFill}
              to="#808080"
              repeatCount="indefinite"
              begin="0.1"
            />
          </path>
          <path
            d="M73.3216 40.5585C81.9557 27.0466 90.5554 13.5119 99.1781 0C108.728 25.074 118.267 50.148 127.806 75.222C114.339 75.222 100.873 75.2334 87.4178 75.2106C82.7229 63.6599 78.0051 52.1206 73.3216 40.5585Z"
            fill={colorFill}
          >
            <animate
              attributeName="fill"
              dur="1s"
              from={colorFill}
              to="#808080"
              repeatCount="indefinite"
              begin="0.4"
            />
          </path>
          <path
            d="M172.476 0C181.969 24.9258 191.451 49.8743 200.932 74.8001C187.477 74.8115 174.011 74.8001 160.544 74.8001C155.895 63.3976 151.246 51.9838 146.62 40.5699C155.242 27.0466 163.842 13.5119 172.476 0Z"
            fill={colorFill}
          >
            <animate
              attributeName="fill"
              dur="1s"
              from={colorFill}
              to="#808080"
              repeatCount="indefinite"
              begin="0.6"
            />
          </path>
          <path
            d="M127.978 75.7466C120.397 87.2174 112.92 98.7453 105.351 110.228L103.152 113.865C107.446 124.595 111.866 135.267 116.195 145.986C129.272 146.009 142.349 145.986 155.426 145.997C163.247 134.082 171.057 122.166 178.855 110.25C166.282 110.228 153.697 110.25 141.124 110.239C136.75 98.7453 132.398 87.2288 127.978 75.7466Z"
            fill={colorFill}
          >
            <animate
              attributeName="fill"
              dur="1s"
              from={colorFill}
              to="#808080"
              repeatCount="indefinite"
              begin="0.9"
            />
          </path>
        </svg>
      </div>
    );
  }
}

Loader.propTypes = {
  history: PropTypes.object,
  additionalClass: PropTypes.string,
};

export default Loader;
