import "../../../scss/list.scss";
import { useContext, useEffect, useState } from "react";
import {
  useParams,
  useHistory,
  useLocation,
  useRouteMatch,
} from "react-router";
import { PageContext } from "../../../context";
import {
  getCustomersAPI,
  getCustomerFacilities,
  getCustomerEquipment,
} from "../../../js/api/customer";
import TableView from "../../TableView/TableView";
import InfoCard from "../../InfoCard/InfoCard";
import Pagination from "../../widgets/Pagination/Pagination";
import { Spinner } from "reactstrap";

const List = ({ type }) => {
  const [data, setData] = useState();
  const [totalRecords, setTotalRecords] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [requests, setRequests] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [view, setView] = useState(true);
  const [page, setPage] = useState(1);
  const [screenSize, SetScreenSize] = useState(window.innerWidth);
  const [showCreateBtn, setShowCreateBtn] = useState(false);

  const { pageTitle, setPageType, setId, setPagePath } =
    useContext(PageContext);

  const params = useParams();
  let id = 0;
  if (params) {
    id = params.id;
  }

  const history = useHistory();
  const match = useRouteMatch();

  const RECORDS_PER_PAGE = 12;
  const totalPages = Math.ceil(totalRecords / RECORDS_PER_PAGE);

  const formatData = (data) => {
    const formattedData = [];
    for (let i = 0; i < Object.keys(data).length; i++) {
      formattedData.push(data[Object.keys(data)[i]]);
    }

    return formattedData;
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);

    setIsLoading(true);
    requests.list(RECORDS_PER_PAGE, page, e.target.value, id).then((res) => {
      setData(formatData(res[type.entity]));
      setTotalRecords(res.total);
      setIsLoading(false);
    });
  };

  const toggleView = () => {
    setView(!view);
  };

  const handlePageChange = (e) => {
    const page = e.selected + 1;
    setPage(page);
  };

  const handleResize = () => {
    SetScreenSize(window.innerWidth);
  };

  useEffect(() => {
    switch (JSON.stringify(type)) {
      case JSON.stringify({ entity: "customers" }):
        setRequests({ list: getCustomersAPI });
        break;
      case JSON.stringify({ entity: "facilities", ref: "customers" }):
        setRequests({ list: getCustomerFacilities });
        break;
      case JSON.stringify({ entity: "equipment", ref: "customers" }):
        setRequests({ list: getCustomerEquipment });
        break;
    }

    setPagePath(match.path);
    setId(id);
    setPageType(type);

    console.log(type);

    switch (type.entity) {
      case "customers":
        if (!type.ref) setShowCreateBtn(true);
        if (type.ref === "facilities") setShowCreateBtn(true);
        break;
      case "facilities":
        if (type.ref === "customers") setShowCreateBtn(true);
        break;
      case "equipment":
        if (type.ref === "facilities") setShowCreateBtn(true);
        break;
      default:
        break;
    }

    window.addEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (requests.list) {
      setIsLoading(true);
      requests.list(RECORDS_PER_PAGE, page, searchQuery, id).then((res) => {
        setData(formatData(res[type.entity]));
        setTotalRecords(res.total);
        setIsLoading(false);
      });
    }
  }, [requests]);

  useEffect(() => {
    if (requests.list) {
      requests.list(RECORDS_PER_PAGE, page, searchQuery, id).then((res) => {
        setData(formatData(res[type.entity]));
      });
    }
  }, [page]);

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
            {showCreateBtn && (
              <button
                className="list__add-btn"
                onClick={() =>
                  history.push(
                    `/dashboard/${type.ref}/${id}/${type.entity}/create`
                  )
                }
              >
                +
              </button>
            )}
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
              <TableView data={data} type={type.entity} />
            ) : (
              <div
                className={
                  screenSize > 440 ? "info-card_group" : "info-card_group dense"
                }
              >
                {data ? (
                  data.map((record) => (
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
