import React from "react";
import "./Mainpage.style.css";
import BudgetBox from "../BudgetBox/Budgetbox";

const MainPage = () => {
  return (
    <div>
      <h1>Budget Calculator</h1>
      <BudgetBox />
    </div>
  );
};

export default MainPage;
