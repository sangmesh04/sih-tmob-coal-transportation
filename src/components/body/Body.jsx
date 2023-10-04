import React, { useEffect, useState } from "react";
import "./body.css";
import MineList from "../mine/MineList";
import CustomerList from "../customers/CustomerList";
import axiosInstance from "../../server/axios";
import { useNavigate } from "react-router-dom";
import graph from "../../assets/graph.png";
import Loader from "../Loader";

const Body = () => {
  /* Hooks and functions */
  const [source, setsource] = useState(null);
  const [destination, setdestination] = useState(null);
  const [isloading, setIsloading] = useState(false);

  const [mines, setMines] = useState([]);
  const [customers, setCustomers] = useState([]);

  const handleMineSelection = (mineId) => {
    if (source === mineId) {
      setsource(null); // Unselect the currently selected mine
    } else {
      setsource(mineId); // Select the clicked mine
    }
  };

  const handleCustomerSelection = (customerId) => {
    if (destination === customerId) {
      setdestination(null); // Unselect the currently selected customer
    } else {
      setdestination(customerId); // Select the clicked customer
    }
  };

  const createSelectionObject = () => {
    if (!source || !destination) {
      alert("Please select both a mine and a customer.");
      return null;
    }

    const selectionObject = {
      source,
      destination,
    };
    return selectionObject;
  };

  const navigate = useNavigate();

  const handleSearch = () => {
    const data = createSelectionObject();
    if (!data) return;
    setIsloading(true);
    axiosInstance
      .post("/findRoute", { ...data })
      .then((res) => {
        console.log(res.data);
        var src = {};
        mines.map((item) => {
          if (item.id === source) {
            src = item;
          }
        });
        var dest = {};
        customers.map((item) => {
          if (item.id === destination) {
            dest = item;
          }
        });
        setIsloading(false);
        localStorage.setItem("route", JSON.stringify(res.data.path));
        localStorage.setItem("source", JSON.stringify(src));
        localStorage.setItem("destination", JSON.stringify(dest));
        navigate("/routes");
      })
      .catch((err) => {
        setIsloading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    setIsloading(true);
    axiosInstance
      .get("/getData")
      .then((res) => {
        setIsloading(false);
        setMines(res.data.data.mines);
        setCustomers(res.data.data.customers);
      })
      .catch((err) => {
        setIsloading(false);
        console.log(err);
      });
  }, []);

  if (isloading) {
    return <Loader />;
  }

  return (
    <div className="container">
      <div
        className="main-box"
        style={{ justifyContent: "center", width: "fit-content" }}
      >
        <img src={graph} alt="" />
      </div>
      <div className="main-box">
        <div className="mines">
          <h1 className="title">Mines</h1>
          <MineList
            mines={mines}
            selectedMine={source}
            handleMineSelection={handleMineSelection}
          />
        </div>

        <div className="customers">
          <h1 className="title">Customers</h1>
          <CustomerList
            customers={customers}
            selectedCustomer={destination}
            handleCustomerSelection={handleCustomerSelection}
          />
        </div>
      </div>

      <div className="search-div" style={{ marginBottom: "25px" }}>
        <button className="btn" onClick={() => handleSearch()}>
          Search
        </button>
      </div>
    </div>
  );
};

export default Body;
