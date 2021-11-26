import "./customers-page.scss";
import { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import InfoCard from "../../InfoCard/InfoCard";
import CustomersTable from "../../CustomersTable/CustomersTable";
import Pagination from "../../widgets/Pagination/Pagination";
import { PageTitleContext } from "../../../context";
import { Spinner } from "reactstrap";
import { customersApi } from "../../../js/api/customer";

const CustomersPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [view, setView] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [screenSize, SetScreenSize] = useState(window.innerWidth);

  const history = useHistory();

  const customersPerPage = 12;

  const { pageTitle } = useContext(PageTitleContext);

  const totalPages = Math.ceil(totalCustomers / customersPerPage);

  const formatCustomers = (customers) => {
    const formattedCustomers = [];
    for (let i = 0; i < Object.keys(customers).length; i++) {
      formattedCustomers.push(customers[Object.keys(customers)[i]]);
    }

    return formattedCustomers;
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

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);

    setIsLoading(true);
    customersApi.getCustomers(customersPerPage, e.target.value).then((data) => {
      setCustomers(formatCustomers(data.customers));
      setTotalCustomers(data.total);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    setIsLoading(true);
    customersApi.getCustomers(customersPerPage).then((data) => {
      setCustomers(formatCustomers(data.customers));
      setTotalCustomers(data.total);
      setIsLoading(false);
    });

    window.addEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    customersApi.getCustomers(customersPerPage, searchQuery, page).then((data) => {
      setCustomers(formatCustomers(data.customers));
    });
  }, [page]);

  return (
    <div className="customers">
      <div className="customers__header">
        <h3>{pageTitle}</h3>
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
              onClick={() => history.push("/dashboard/customer-create")}
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
        {!isLoading ? (
          <>
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
                {customers ? (
                  customers.map((customer) => (
                    <InfoCard
                      key={customer.id}
                      data={customer}
                      type="customers"
                    />
                  ))
                ) : (
                  <p>No customers found.</p>
                )}
              </div>
            )}
            <Pagination
              previousLabel={"<"}
              nextLabel={">"}
              pageCount={totalPages}
              onPageChange={handlePageChange}
              containerClassName={"pagination"}
              activeClassName={"active"}
            />
          </>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

export default CustomersPage;
