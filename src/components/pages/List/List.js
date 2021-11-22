import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { parseClassName } from "react-toastify/dist/utils";
import { PageTitleContext } from "../../../context";
import { getCustomersAPI, getCustomersAPI } from "../../../js/api/customer";
import { getFacilityApi } from "../../../js/api/facilities";

const List = ({ type }) => {
  const [data, setData] = useState();
  const [totalRecords, setTotalRecords] = useState();
  const [request, setRequest] = useState();

  const params = useParams();

  const RECORDS_PER_PAGE = 12;

  const { pageTitle } = useContext(PageTitleContext);

  const totalPages = Math.ceil(totalRecords / RECORDS_PER_PAGE);

  useEffect(async () => {
    let data;

    switch (type) {
      case "customers":
        data = await getCustomersAPI();
        break;
      case "facilities":
        data = await getFacilityApi(params.id);
        break;
      default:
        break;
    }
  }, []);

  useEffect(() => {
    request.then((res) => {
      console.log(res);
    });
  }, [request]);

  return (
    <div className="list">
      <div className="list__header">
        <h3>{pageTitle}</h3>
        <div className="list__options">
          <input
            className="list__search"
            type="text"
            placeholder="Search..."
            onInput={handleSearch}
          />
          <div className="list__options_btns">
            <button
              className="list__add-btn"
              onClick={() => history.push(`/dashboard/${type}/create`)}
            >
              +
            </button>
            <button onClick={toggleView} className="list__toggle-btn">
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
      <div className="list__content">
        {!isLoading ? (
          <>
            {view ? (
              <TableView data={customers} type={type} />
            ) : (
              <div
                className={
                  screenSize > 440 ? "info-card_group" : "info-card_group dense"
                }
              >
                {customers ? (
                  customers.map((record) => (
                    <InfoCard key={record.id} data={record} type={type} />
                  ))
                ) : (
                  <p>No records found.</p>
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

export default List;
