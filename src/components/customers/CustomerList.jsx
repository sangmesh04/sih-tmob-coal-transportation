import React from "react";
import '../body/body.css';
import './customerList.css';

const CustomerList = ({ customers, selectedCustomer, handleCustomerSelection }) => {
  return (
    <div>
      {customers.map((customer) => (
        <div
          key={customer.id}
          onClick={() => handleCustomerSelection(customer.id)}
          className={`card customer-item ${selectedCustomer === customer.id ? "selected" : ""}`}
        >
          <p className="name">Name: {customer.name}</p>
          <p className="state">State: {customer.state}</p>
        </div>
      ))}
    </div>
  );
};

export default CustomerList;