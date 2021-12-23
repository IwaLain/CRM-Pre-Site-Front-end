import "../../../scss/list.scss";
import { useContext, useEffect, useReducer, useState } from "react";
import TableView from "../../TableView/TableView";
import InfoCard from "../../InfoCard/InfoCard";
import CustomPagination from "../../widgets/Pagination/Pagination";
import { Label } from "reactstrap";
import { GlobalContext } from "../../../context";
import customersApi from "../../../js/api/customer";
import locationApi from "../../../js/api/locations";
import equipmentApi from "../../../js/api/equipment";
import facilitiesApi from "../../../js/api/facilities";
import Button from "../../UIKit/Button/Button";
import ModalSketch from "../../ModalComponent/ModalSketch";
import Loader from "../../widgets/Loader/Loader";
import { reducer } from "../../../reducer";

const List = ({
  type,
  title,
  chooseMode,
  hideTitle,
  hideCreateBtn,
  hideSelect,
  hideSearch,
  hideChangeView,
  showProgress,
  hideRecordView,
  initBlockView,
}) => {
  const initialState = {
    data: [],
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const { data } = state;

  const [searchQuery, setSearchQuery] = useState("");
  const [requests, setRequests] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [view, setView] = useState(true);
  const [screenSize, SetScreenSize] = useState(window.innerWidth);
  const [totalRows, setTotalRows] = useState(Math.ceil(0));
  const [entityNames, setEntityNames] = useState();
  const [mode, setMode] = useState();
  const [modal, setModal] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const RECORDS_PER_PAGE = 20;
  const [prevSelectedAll, setPrevSelectedAll] = useState(false);

  const {
    entityID,
    setEntityID,

    selectedCustomer,
    setSelectedCustomer,
    customerStructure,
    updateTrigger,
  } = useContext(GlobalContext);

  const formatNames = (data) => {
    const formattedNames = [];

    for (const [key, value] of Object.entries(data)) {
      formattedNames.push({ id: value.id, name: value.name, key });
    }

    return formattedNames;
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);

    setIsLoading(true);
    setPage(1);
    if (requests.list) {
      requests
        .list(RECORDS_PER_PAGE, 1, e.target.value, entityID)
        .then((res) => {
          dispatch({ data: res });
          setTotalRows(res.total);
          setTotalPages(Math.ceil(res.total / RECORDS_PER_PAGE));
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  };

  const handleResize = () => {
    SetScreenSize(window.innerWidth);
  };

  const handleEntitySelect = (e) => {
    setEntityID(e.target.value);
    if (prevSelectedAll)
      switch (type.entity) {
        case "customers":
          setRequests({ list: customersApi.getCustomers });
          break;
        case "facilities":
          setRequests({
            list: customersApi.getCustomerFacilities,
            ref: customersApi.getCustomers,
          });
          break;
        case "locations":
          setRequests({
            list: locationApi.getFacilityLocations,
            ref: facilitiesApi.getFacilities,
          });
          break;
        case "equipment":
          setRequests({
            list: equipmentApi.getLocationEquipment,
            ref: locationApi.getLocations,
          });
          break;
        case "gateways":
        case "nodes":
        case "motes":
        case "routers":
        case "sensors":
          setRequests({
            list: (limit, page, search) => {
              let url =
                process.env.REACT_APP_SERVER_URL +
                "/api/customer/" +
                selectedCustomer.id +
                "/" +
                type.entity +
                "?access-token=" +
                localStorage.getItem("token");
              if (limit) url += "&limit=" + limit;
              if (page) url += "&page=" + page;
              if (search) url += "&search=" + search;

              return fetch(url).then((res) => res.json());
            },
          });
          break;
        default:
          break;
      }
    if (e.target.value === "all") {
      switch (type.entity) {
        case "facilities":
          setRequests({
            list: facilitiesApi.getFacilities,
            ref: customersApi.getCustomers,
          });
          break;
        case "locations":
          setRequests({
            list: locationApi.getLocations,
            ref: facilitiesApi.getFacilities,
          });
          break;
        case "equipment":
          setRequests({
            list: equipmentApi.getEquipments,
            ref: locationApi.getLocations,
          });
          break;
        default:
          break;
      }
      setPrevSelectedAll(true);
    } else setPrevSelectedAll(false);
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const changeCustomer = (id) => {
    try {
      fetch(
        process.env.REACT_APP_SERVER_URL +
          "/api/customer/" +
          id +
          "?access-token=" +
          localStorage.getItem("token")
      )
        .then((res) => res.json())
        .then((customer) => {
          if (customer) {
            setSelectedCustomer(customer.customer[id]);
          } else console.log("Customer not found.");
        });
    } catch (e) {
      console.log(e);
    }

    try {
      fetch(
        process.env.REACT_APP_SERVER_URL +
          "/api/user/last-customer/" +
          id +
          "?access-token=" +
          localStorage.getItem("token"),
        {
          method: "PUT",
        }
      );
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (initBlockView) {
      setView(false);
    }
  }, [initBlockView]);

  useEffect(() => {
    if (type) {
      switch (type.entity) {
        case "customers":
          setRequests({ list: customersApi.getCustomers });
          break;
        case "facilities":
          setRequests({
            list: customersApi.getCustomerFacilities,
            ref: customersApi.getCustomers,
          });
          break;
        case "locations":
          setRequests({
            list: locationApi.getFacilityLocations,
            ref: facilitiesApi.getFacilities,
          });
          break;
        case "equipment":
          setRequests({
            list: equipmentApi.getLocationEquipment,
            ref: locationApi.getLocations,
          });
          break;
        case "gateways":
        case "nodes":
        case "motes":
        case "routers":
        case "sensors":
          setRequests({
            list: (limit, page, search) => {
              let url =
                process.env.REACT_APP_SERVER_URL +
                "/api/customer/" +
                selectedCustomer.id +
                "/" +
                type.entity +
                "?access-token=" +
                localStorage.getItem("token");
              if (limit) url += "&limit=" + limit;
              if (page) url += "&page=" + page;
              if (search) url += "&search=" + search;

              return fetch(url).then((res) => res.json());
            },
          });
          break;
        default:
          break;
      }
    }

    window.addEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (
      selectedCustomer &&
      !hideSelect &&
      Object.keys(selectedCustomer).length > 0 &&
      type &&
      type.ref === "customers"
    ) {
      setEntityID(selectedCustomer.id);
    }
  }, [selectedCustomer]);

  useEffect(() => {
    if (requests.list) {
      setIsLoading(true);
      try {
        requests
          .list(RECORDS_PER_PAGE, page, searchQuery, entityID)
          .then((res) => {
            dispatch({ data: res });
            setTotalRows(res.total);
            setTotalPages(Math.ceil(res.total / RECORDS_PER_PAGE));
            setIsLoading(false);
          });
      } catch (e) {
        console.log(e);
      }
    }
  }, [requests, updateTrigger]);

  useEffect(() => {
    if (requests.ref)
      try {
        requests.ref(-1).then((res) => {
          if (Object.keys(res[type.ref]).length > 0 && !hideSelect) {
            const formattedNames = formatNames(res[type.ref]);
            setEntityNames(formattedNames);
            if (
              selectedCustomer &&
              Object.keys(selectedCustomer).length > 0 &&
              type.ref === "customers"
            ) {
              setEntityID(selectedCustomer.id);
            } else setEntityID(formattedNames[0].id);
          }
        });
      } catch (e) {
        console.log(e);
      }
  }, [requests.ref]);

  useEffect(() => {
    if (requests.list) {
      try {
        requests
          .list(RECORDS_PER_PAGE, page, searchQuery, entityID)
          .then((res) => {
            dispatch({ data: res });
          });
      } catch (e) {
        console.log(e);
      }
    }
  }, [page]);

  useEffect(() => {
    if (requests.list) {
      setIsLoading(true);
      try {
        requests
          .list(RECORDS_PER_PAGE, page, searchQuery, entityID)
          .then((res) => {
            dispatch({ data: res });
            setTotalRows(res.total);
            setTotalPages(Math.ceil(res.total / RECORDS_PER_PAGE));
            setPage(1);
            setIsLoading(false);
          });
      } catch (e) {
        console.log(e);
      }
    }
  }, [entityID]);

  return (
    <>
      <ModalSketch
        entity={type && type.entity}
        subEntity={type && type.ref}
        modal={modal}
        toggle={toggleModal}
        mode={mode}
        customerStructure={customerStructure}
      />
      <div className="list">
        <div className="list__header">
          <div
            className="list__title"
            style={hideTitle && { visibility: "hidden" }}
          >
            <h3>{title}</h3>
            {!hideCreateBtn && (
              <button
                className="list__add-btn"
                onClick={() => {
                  setMode("create");
                  toggleModal();
                }}
              >
                +
              </button>
            )}
          </div>
          <div className="list__options">
            {type && type.ref && !hideSelect && (
              <div className="list__select-entity">
                <Label for="select-entity">{type && `${type.ref}:`}</Label>
                <select
                  className="ui-kit__select"
                  id="select-entity"
                  value={entityID}
                  onChange={handleEntitySelect}
                  disabled={!entityNames}
                >
                  <option value="" hidden>
                    No records
                  </option>
                  <option value="all">All</option>
                  {entityNames &&
                    entityNames.map((entity) => (
                      <option key={entity.id} value={entity.id}>
                        {entity.name}
                      </option>
                    ))}
                </select>
              </div>
            )}
            {!hideSearch && (
              <div style={{ display: "flex" }}>
                <input
                  className="list__search"
                  type="text"
                  placeholder="Search..."
                  onInput={handleSearch}
                />
              </div>
            )}
            {!hideChangeView && (
              <div className="list__options_btns">
                <Button
                  type="list-view"
                  onClick={() => setView(true)}
                  className={view ? "active" : ""}
                ></Button>
                <Button
                  type="block-view"
                  onClick={() => setView(false)}
                  className={!view ? "active" : ""}
                ></Button>
              </div>
            )}
          </div>
        </div>
        {!isLoading ? (
          <div className="list__content">
            <>
              {view ? (
                <TableView
                  data={data}
                  type={type}
                  totalRows={totalRows}
                  page={page}
                  setPage={setPage}
                  toggleModal={toggleModal}
                  modal={modal}
                  setMode={setMode}
                  chooseMode={chooseMode}
                  changeCustomer={changeCustomer}
                  hideRecordView={hideRecordView}
                  perPage={RECORDS_PER_PAGE}
                  showProgress={showProgress}
                />
              ) : (
                <div
                  className={
                    screenSize > 1020
                      ? "info-card_group"
                      : "info-card_group dense"
                  }
                >
                  {data && Object.keys(data[type.entity]).length > 0 ? (
                    Object.entries(data[type.entity]).map((record) => (
                      <InfoCard
                        key={record[1].id}
                        data={record[1]}
                        type={type.entity}
                        toggleModal={toggleModal}
                        setMode={setMode}
                        chooseMode={chooseMode}
                        selected={record[1].id === selectedCustomer.id}
                        changeCustomer={changeCustomer}
                        hideRecordView={hideRecordView}
                      />
                    ))
                  ) : (
                    <p
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        padding: "24px",
                        margin: "0",
                      }}
                    >
                      There are no records to display
                    </p>
                  )}
                </div>
              )}
              {!view && totalPages > 1 && (
                <CustomPagination
                  previousLabel={"<"}
                  nextLabel={">"}
                  pageCount={totalPages}
                  initialPage={page}
                  onPageChange={setPage}
                  totalRows={totalRows}
                  containerClassName={"pagination"}
                  activeClassName={"active"}
                />
              )}
            </>
          </div>
        ) : (
          <div
            style={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Loader />
          </div>
        )}
      </div>
    </>
  );
};

export default List;
