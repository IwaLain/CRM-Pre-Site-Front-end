import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { GlobalContext } from "../../../context";

const Dashboard = () => {
  const { selectedCustomer } = useContext(GlobalContext);

  const history = useHistory();

  useEffect(() => {
    if (!selectedCustomer || !(Object.keys(selectedCustomer).length > 0))
      history.push("/dashboard/customers");
  }, []);

  return (
    <div className="dashboard">
      <div></div>
    </div>
  );
};

export default Dashboard;
