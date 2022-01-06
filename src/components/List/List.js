import "../../scss/list.scss";
import { useContext, useEffect, useReducer } from "react";
import TableView from "../TableView/TableView";
import InfoCard from "../InfoCard/InfoCard";
import CustomPagination from "../widgets/Pagination/Pagination";
import { Label } from "reactstrap";
import { GlobalContext } from "../../context";
import customersApi from "../../js/api/customer";
import locationApi from "../../js/api/locations";
import equipmentApi from "../../js/api/equipment";
import facilitiesApi from "../../js/api/facilities";
import ModalSketch from "../ModalComponent/ModalSketch";
import Loader from "../widgets/Loader/Loader";
import { reducer } from "../../reducer";
import PropTypes from "prop-types";
import debounce from "../../js/helpers/debounce";
import Button from "../UIKit/button/button";

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
    data: {},
    searchQuery: "",
    requests: {},
    isLoading: false,
    view: true,
    screenSize: window.innerWidth,
    totalRows: Math.ceil(0),
    totalPages: 0,
    entityNames: [],
    mode: "",
    page: 1,
    modal: false,
    prevSelectedAll: false,
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    data,
    searchQuery,
    requests,
    isLoading,
    view,
    screenSize,
    totalRows,
    totalPages,
    entityNames,
    modal,
    prevSelectedAll,
    page,
    mode,
  } = state;

  const RECORDS_PER_PAGE = 20;

  const {
    entityID,
    setEntityID,

    selectedCustomer,
    setSelectedCustomer,
    updateTrigger,
  } = useContext(GlobalContext);

  const formatNames = (data) => {
    const formattedNames = [];

    for (const [key, value] of Object.entries(data)) {
      formattedNames.push({ id: value.id, name: value.name, key });
    }

    return formattedNames;
  };

  const debouncedSearchHandler = debounce((e) => handleSearch(e));

  const handleSearch = (e) => {
    dispatch({ searchQuery: e.target.value });

    dispatch({ isLoading: true });
    dispatch({ page: 1 });
    if (requests.list) {
      requests
        .list(RECORDS_PER_PAGE, 1, e.target.value, entityID)
        .then((res) => {
          dispatch({ data: res });
          dispatch({ totalRows: res.total });
          dispatch({ totalPages: Math.ceil(res.total / RECORDS_PER_PAGE) });
          dispatch({ isLoading: false });
        });
    } else {
      dispatch({ isLoading: false });
    }
  };

  const debouncedResizeHandler = debounce(() => handleResize());

  const handleResize = () => {
    dispatch({ screenSize: window.innerWidth });
  };

  const handleEntitySelect = (e) => {
    setEntityID(e.target.value);
    if (prevSelectedAll)
      switch (type.entity) {
        case "customers":
          dispatch({ requests: { list: customersApi.getCustomers } });
          break;
        case "facilities":
          dispatch({
            requests: {
              list: customersApi.getCustomerFacilities,
              ref: customersApi.getCustomers,
            },
          });
          break;
        case "locations":
          dispatch({
            requests: {
              list: locationApi.getFacilityLocations,
              ref: facilitiesApi.getFacilities,
            },
          });
          break;
        case "equipment":
          dispatch({
            requests: {
              list: equipmentApi.getLocationEquipment,
              ref: locationApi.getLocations,
            },
          });
          break;
        case "gateways":
        case "nodes":
        case "motes":
        case "routers":
        case "sensors":
          dispatch({
            requests: {
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
            },
          });
          break;
        default:
          break;
      }
    if (e.target.value === "all") {
      switch (type.entity) {
        case "facilities":
          dispatch({
            requests: {
              list: facilitiesApi.getFacilities,
              ref: customersApi.getCustomers,
            },
          });
          break;
        case "locations":
          dispatch({
            requests: {
              list: locationApi.getLocations,
              ref: facilitiesApi.getFacilities,
            },
          });
          break;
        case "equipment":
          dispatch({
            requests: {
              list: equipmentApi.getEquipments,
              ref: locationApi.getLocations,
            },
          });
          break;
        default:
          break;
      }
      dispatch({ prevSelectedAll: true });
    } else dispatch({ prevSelectedAll: false });
  };

  const toggleModal = () => {
    dispatch({ modal: !modal });
  };

  const changeCustomer = (id) => {
    dispatch({ isLoading: true });
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
            dispatch({ isLoading: false });
          }
        });
    } catch (e) {}
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
    } catch (e) {}
  };

  useEffect(() => {
    if (initBlockView) {
      dispatch({ view: false });
    }
  }, [initBlockView]);

  useEffect(() => {
    if (type) {
      switch (type.entity) {
        case "customers":
          dispatch({ requests: { list: customersApi.getCustomers } });
          break;
        case "facilities":
          dispatch({
            requests: {
              list: customersApi.getCustomerFacilities,
              ref: customersApi.getCustomers,
            },
          });
          break;
        case "locations":
          dispatch({
            requests: {
              list: locationApi.getFacilityLocations,
              ref: facilitiesApi.getFacilities,
            },
          });
          break;
        case "equipment":
          dispatch({
            requests: {
              list: equipmentApi.getLocationEquipment,
              ref: locationApi.getLocations,
            },
          });
          break;
        case "gateways":
        case "nodes":
        case "motes":
        case "routers":
        case "sensors":
          dispatch({
            requests: {
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
            },
          });
          break;
        default:
          break;
      }
    }

    window.addEventListener("resize", debouncedResizeHandler);
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
      dispatch({ isLoading: true });
      try {
        requests
          .list(RECORDS_PER_PAGE, page, searchQuery, entityID)
          .then((res) => {
            dispatch({ data: res });
            dispatch({ totalRows: res.total });
            dispatch({ totalPages: Math.ceil(res.total / RECORDS_PER_PAGE) });
            dispatch({ isLoading: false });
          });
      } catch (e) {}
    }
  }, [requests, updateTrigger]);

  useEffect(() => {
    if (requests.ref)
      try {
        requests.ref(-1).then((res) => {
          if (Object.keys(res[type.ref]).length > 0 && !hideSelect) {
            const formattedNames = formatNames(res[type.ref]);
            dispatch({ entityNames: formattedNames });
            if (
              selectedCustomer &&
              Object.keys(selectedCustomer).length > 0 &&
              type.ref === "customers"
            ) {
              setEntityID(selectedCustomer.id);
            } else setEntityID(formattedNames[0].id);
          }
        });
      } catch (e) {}
  }, [requests.ref]);

  useEffect(() => {
    if (requests.list) {
      try {
        requests
          .list(RECORDS_PER_PAGE, page, searchQuery, entityID)
          .then((res) => {
            dispatch({ data: res });
          });
      } catch (e) {}
    }
  }, [page]);

  useEffect(() => {
    if (requests.list) {
      dispatch({ isLoading: true });
      try {
        requests
          .list(RECORDS_PER_PAGE, page, searchQuery, entityID)
          .then((res) => {
            dispatch({ data: res });
            dispatch({ totalRows: res.total });
            dispatch({ totalPages: Math.ceil(res.total / RECORDS_PER_PAGE) });
            dispatch({ page: 1 });
            dispatch({ isLoading: false });
          });
      } catch (e) {}
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
                className="list__add-btn ui-btn ui-btn-success"
                onClick={() => {
                  dispatch({ mode: "create" });
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
                  onInput={debouncedSearchHandler}
                />
              </div>
            )}
            {!hideChangeView && (
              <div className="list__options_btns">
                <Button
                  type="list-view"
                  onClick={() => dispatch({ view: true })}
                  className={`ui-btn ui-btn-success ${view ? "active" : ""}`}
                ></Button>
                <Button
                  type="block-view"
                  onClick={() => dispatch({ view: false })}
                  className={`ui-btn ui-btn-success ${!view ? "active" : ""}`}
                ></Button>
              </div>
            )}
          </div>
        </div>
        {!isLoading ? (
          <div className="list__content table-striped">
            <>
              {view ? (
                <TableView
                  data={data}
                  type={type}
                  totalRows={totalRows}
                  page={page}
                  dispatch={dispatch}
                  toggleModal={toggleModal}
                  modal={modal}
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
                  {data &&
                  data[type.entity] &&
                  Object.keys(data[type.entity]).length > 0 ? (
                    Object.entries(data[type.entity]).map((record) => (
                      <InfoCard
                        key={record[1].id}
                        data={record[1]}
                        type={type.entity}
                        toggleModal={toggleModal}
                        dispatch={dispatch}
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
                  dispatch={dispatch}
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

List.propTypes = {
  type: PropTypes.object,
  title: PropTypes.string,
  chooseMode: PropTypes.bool,
  hideTitle: PropTypes.bool,
  hideCreateBtn: PropTypes.bool,
  hideSelect: PropTypes.bool,
  hideSearch: PropTypes.bool,
  hideChangeView: PropTypes.bool,
  showProgress: PropTypes.bool,
  hideRecordView: PropTypes.bool,
  initBlockView: PropTypes.bool,
};

export default List;
