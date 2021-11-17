import "./customers-page.scss";
import { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import CustomerCard from "../../CustomerCard/CustomerCard";
import CustomersTable from "../../CustomersTable/CustomersTable";
import Pagination from "../../widgets/Pagination/Pagination";
import { PageTitleContext } from "../../../context";

const CustomersPage = () => {
  const [view, setView] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [page, setPage] = useState(1);
  const [screenSize, SetScreenSize] = useState(window.innerWidth);

  const history = useHistory();

  const customersPerPage = 12;

  const { pageTitle } = useContext(PageTitleContext);

  const totalPages = Math.ceil(totalCustomers / customersPerPage);

  const handleSearch = (e) => {
    const searchQuery = e.target.value;
    fetch(
      `http://crm.loc/api/customer?access-token=test&limit=${customersPerPage}&s=${searchQuery}`
    )
      .then((res) => res.json())
      .then((data) => {
        setCustomers(data.customers);
        setTotalCustomers(data.total);
      });
  };

  const handlePageChange = (e) => {
    const page = e.selected + 1;
    setPage(page);
  };

  const handleResize = () => {
    SetScreenSize(window.innerWidth);
  };

  const toggleView = () => {
    setView(!view);
  };

  useEffect(() => {
    fetch(
      `http://crm.loc/api/customer?access-token=test&limit=${customersPerPage}`
    )
      .then((res) => res.json())
      .then((data) => {
        setCustomers(data.customers);
        setTotalCustomers(data.total);
      });

    window.addEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetch(
      `http://crm.loc/api/customer?access-token=test&limit=${customersPerPage}&page=${page}`
    )
      .then((res) => res.json())
      .then((data) => {
        setCustomers(data.customers);
      });
  }, [page]);

  return (
    <div className="customers">
      <div className="customers__header">
        <h3>{pageTitle ? pageTitle : "err"}</h3>
        <div className="customers__options">
          <input
            className="customers__search"
            type="text"
            placeholder="Search..."
            onInput={handleSearch}
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
                  progress={customer.status * 100}
                  image={`http://crm.loc/${customer.img}`}
                />
              ))
            ) : (
              <p>No customers found.</p>
            )}
          </div>
        )}
      </div>
      <Pagination
        previousLabel={"<"}
        nextLabel={">"}
        pageCount={totalPages}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default CustomersPage;
