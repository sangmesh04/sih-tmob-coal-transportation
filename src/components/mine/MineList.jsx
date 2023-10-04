import React from "react";
import '../body/body.css';
import './mineList.css';

const MineList = ({ mines, selectedMine, handleMineSelection }) => {
  return (
    <div>
      {mines.map((mine) => (
        <div
          key={mine.id}
          onClick={() => handleMineSelection(mine.id)}
          className={`card mine-item ${selectedMine === mine.id ? "selected" : ""}`}
        >
          <p className="name">Name: {mine.name}</p>
          <p className="state">State: {mine.state}</p>
        </div>
      ))}
    </div>
  );
};

export default MineList;
