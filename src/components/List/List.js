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
import Button from "../UIKit/Button/Button";
import SliderModal from "../SliderModal/SliderModal";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import { useHistory } from "react-router-dom";
import { alert } from "../../js/helpers/alert";

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
  initTableView,
}) => {
  const initialState = {
    data: {},
    searchQuery: "",
    requests: {},
    isLoading: false,
    selectIsLoaded: false,
    view: false,
    screenSize: window.innerWidth,
    totalRows: Math.ceil(0),
    totalPages: 0,
    entityNames: [],
    mode: "",
    page: 1,
    modal: false,
    prevSelectedAll: false,
    modalData: {},
    modalDataID: null,
    sliderModal: false,
    entityImages: [],
    confirmModal: false,
    recordToDelete: null,
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
    modalDataID,
    sliderModal,
    entityImages,
    confirmModal,
    recordToDelete,
  } = state;

  const history = useHistory();

  const RECORDS_PER_PAGE = 20;

  const {
    entityID,
    setEntityID,
    selectedCustomer,
    updateTrigger,
    setSelectedCustomer,
    setUpdateTrigger,
    setCurrentPage,
  } = useContext(GlobalContext);

  const formatNames = (data) => {
    const formattedNames = [];

    for (const [key, value] of Object.entries(data)) {
      formattedNames.push({ id: value.id, name: value.name, key });
    }

    return formattedNames;
  };

  const debouncedSearchHandler = debounce((e) => handleSearch(e), 500);

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

  const toggleSliderModal = () => {
    dispatch({ sliderModal: !sliderModal });
  };

  const toggleConfirmModal = () => {
    dispatch({ confirmModal: !confirmModal });
  };

  useEffect(() => {
    if (initTableView) {
      dispatch({ view: true });
    }
  }, [initTableView]);

  let singleAlias = "";

  switch (type.entity) {
    case "customers":
      singleAlias = "customer";
      break;
    case "facilities":
      singleAlias = "facility";
      break;
    case "locations":
      singleAlias = "location";
      break;
    case "equipment":
      singleAlias = "equipment";
      break;
    case "gateways":
      singleAlias = "gateway";
      break;
    case "routers":
      singleAlias = "router";
      break;
    case "nodes":
      singleAlias = "node";
      break;
    case "motes":
      singleAlias = "mote";
      break;
    case "sensors":
      singleAlias = "sensor";
      break;
    default:
      break;
  }

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
    if (history && history.location && history.location.pathname) {
      switch (history.location.pathname) {
        case "/facilities":
        case "/locations":
        case "/equipment":
          if (
            !selectedCustomer ||
            !(Object.keys(selectedCustomer).length > 0)
          ) {
            history.push("/customers");
            alert("error", "You need to select customer first");
          }
          break;
        default:
          break;
      }
    }
  }, [history, selectedCustomer]);

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
    if (requests.ref) {
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
          dispatch({ selectIsLoaded: true });
        });
      } catch (e) {}
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

  useEffect(() => {
    if (type && type.entity) {
      switch (type.entity) {
        case "customers":
          dispatch({ singleAlias: "Customer" });
          break;
        case "facilities":
          dispatch({ singleAlias: "Facility" });
          break;
        case "locations":
          dispatch({ singleAlias: "Location" });
          break;
        case "gateways":
          dispatch({ singleAlias: "Gateway" });
          break;
        case "nodes":
          dispatch({ singleAlias: "Node" });
          break;
        case "motes":
          dispatch({ singleAlias: "Mote" });
          break;
        case "sensors":
          dispatch({ singleAlias: "Sensor" });
          break;
        case "routers":
          dispatch({ singleAlias: "Router" });
          break;
        default:
          dispatch({ singleAlias: type.entity });
          break;
      }
    }

    if (
      history.location.pathname === "/customers" ||
      history.location.pathname === "/facilities" ||
      history.location.pathname === "/locations" ||
      history.location.pathname === "/equipment"
    ) {
      setCurrentPage(type.entity);
    }
  }, [type]);

  const handleDeleteEntityObject = (deleteEntityId) => {
    let url =
      process.env.REACT_APP_SERVER_URL +
      "/api/" +
      `${singleAlias}/delete/` +
      deleteEntityId +
      "?access-token=" +
      localStorage.getItem("token");
    fetch(url, { method: "delete" }).then(() => {
      dispatch({ modalDataID: null });
      if (selectedCustomer) {
        if (deleteEntityId === selectedCustomer.id) {
          setSelectedCustomer({});
          localStorage.removeItem("selectedCustomer");
        }
      }
      setUpdateTrigger(!updateTrigger);
    });
  };

  return (
    <>
      <ConfirmModal
        modal={confirmModal}
        toggleModal={toggleConfirmModal}
        title={`Delete ${singleAlias}`}
        handleSubmit={(e) => {
          handleDeleteEntityObject(recordToDelete);
        }}
        modalText="Are you sure you want delete this?"
      />
      <SliderModal
        modal={sliderModal}
        toggleModal={toggleSliderModal}
        entityImages={entityImages}
      />
      <ModalSketch
        entity={type && type.entity}
        subEntity={type && type.ref}
        modal={modal}
        toggle={toggleModal}
        mode={mode}
        data={data}
        dataID={modalDataID}
        parentDispatch={dispatch}
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
                {singleAlias === "customer" ? (
                  <i class="fas fa-user" aria-hidden="true"></i>
                ) : singleAlias === "facility" ? (
                  <i class="fas fa-industry" aria-hidden="true"></i>
                ) : singleAlias === "location" ? (
                  <i class="fas fa-map-marker-alt" aria-hidden="true"></i>
                ) : singleAlias === "equipment" ? (
                  <i class="fas fa-tools" aria-hidden="true"></i>
                ) : (
                  <i class="fas fa-network-wired" aria-hidden="true"></i>
                )}
                {`Add ${singleAlias}`}
              </button>
            )}
          </div>
          <div className="list__options">
            {type && type.ref && !hideSelect && (
              <div className="list__select-entity">
                <Label for="select-entity">
                  {type &&
                    `${type.ref.charAt(0).toUpperCase() + type.ref.slice(1)}:`}
                </Label>
                <select
                  className="default-select"
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
                  className="list__search default-input"
                  type="text"
                  placeholder="Search"
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
                  toggleSliderModal={toggleSliderModal}
                  toggleConfirmModal={toggleConfirmModal}
                  modal={modal}
                  chooseMode={chooseMode}
                  hideRecordView={hideRecordView}
                  perPage={RECORDS_PER_PAGE}
                  showProgress={showProgress}
                  entityImages={entityImages}
                />
              ) : (
                <>
                  {data &&
                  data[type.entity] &&
                  Object.keys(data[type.entity]).length > 0 ? (
                    <div
                      className={
                        screenSize > 1020
                          ? "info-card_group"
                          : "info-card_group dense"
                      }
                    >
                      {Object.entries(data[type.entity]).map((record) => (
                        <InfoCard
                          key={record[1].id}
                          data={record[1]}
                          type={type.entity}
                          toggleModal={toggleModal}
                          toggleConfirmModal={toggleConfirmModal}
                          dispatch={dispatch}
                          chooseMode={chooseMode}
                          selected={record[1].id === selectedCustomer.id}
                          hideRecordView={hideRecordView}
                        />
                      ))}
                    </div>
                  ) : (
                    <p
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        margin: "0",
                      }}
                    >
                      There are no records to display
                    </p>
                  )}
                </>
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
  initTableView: PropTypes.bool,
};

export default List;
