import React, { useEffect, useState } from "react";
import "./routePage.css";
import axiosInstance from "../../server/axios";
import graph from "../../assets/graph.png";

const Route = () => {
  const [distributors, setDistributors] = useState([]);
  useEffect(() => {
    axiosInstance
      .get("/distributors")
      .then((res) => {
        setDistributors(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const route = JSON.parse(localStorage.getItem("route"));

  if (route.length === 0) {
    return (
      <div style={{ marginTop: "9rem", textAlign: "center" }}>
        No route found!
      </div>
    );
  }

  return (
    // <!-- The Timeline -->
    <div style={{ display: "flex" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img
          src={graph}
          alt=""
          style={{ marginTop: "9rem", marginLeft: "25px" }}
        />
      </div>
      <ul class="timeline">
        {/* <!-- Item 1 --> */}
        {route.map((item, index) => (
          <li>
            <div class={`direction-${index % 2 ? "l" : "r"}`}>
              <div class="flag-wrapper">
                <span class="flag">{item}</span>
                <span class="time-wrapper">
                  <span class="time">Expected time</span>
                </span>
              </div>
              <div class="desc">
                {item[0] === "M"
                  ? JSON.parse(localStorage.getItem("source")).name +
                    ", " +
                    JSON.parse(localStorage.getItem("source")).state
                  : item[0] === "C"
                  ? JSON.parse(localStorage.getItem("destination")).name +
                    ", " +
                    JSON.parse(localStorage.getItem("destination")).state
                  : distributors[item[1]]?.name +
                    ", " +
                    distributors[item[1]]?.state}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Route;
