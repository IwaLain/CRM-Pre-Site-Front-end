import "./customers-page.scss";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import CustomerCard from "../../CustomerCard/CustomerCard";
import CustomersTable from "../../CustomersTable/CustomersTable";

const CustomersPage = () => {
  const [view, setView] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [screenSize, SetScreenSize] = useState(window.innerWidth);

  const history = useHistory();

  const handleResize = () => {
    SetScreenSize(window.innerWidth);
  };

  const toggleView = () => {
    setView(!view);
  };

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setCustomers(data));

    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <div className="customers">
      <div className="customers__header">
        <h3>Customers</h3>
        <div className="customers__options">
          <input
            className="customers__search"
            type="text"
            placeholder="Search..."
          />
          <div className="customers__options_btns">
            <button
              className="customers__add-btn"
              onClick={() => history.push("/dashboard/create-customer")}
            >
              +
            </button>
            <button onClick={toggleView} className="customers__toggle-btn">
              {view ? (
                <svg
                  width="44"
                  height="44"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="44" height="44" fill="#DEDEDE" />
                  <path d="M7 11H25" stroke="white" />
                  <path d="M7 16L25 16" stroke="white" />
                  <path d="M7 21L25 21" stroke="white" />
                </svg>
              ) : (
                <svg
                  width="44"
                  height="44"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="44" height="44" fill="#05C12E" />
                  <path d="M7.5 7.5H14.5V14.5H7.5V7.5Z" stroke="white" />
                  <rect x="17.5" y="7.5" width="7" height="7" stroke="white" />
                  <rect x="7.5" y="17.5" width="7" height="7" stroke="white" />
                  <rect x="17.5" y="17.5" width="7" height="7" stroke="white" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="customers__content">
        {view ? (
          <CustomersTable customers={customers} />
        ) : (
          <div
            className={
              screenSize > 440
                ? "customer-card_group"
                : "customer-card_group dense"
            }
          >
            {customers.length > 0 ? (
              customers.map((customer) => (
                <CustomerCard
                  key={customer.id}
                  title={customer.name}
                  id={customer.id}
                  progress="5"
                />
              ))
            ) : (
              <p>No customers found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomersPage;
