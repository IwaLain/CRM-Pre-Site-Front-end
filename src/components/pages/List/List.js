import "../../../scss/list.scss";
import { useContext, useEffect, useState } from "react";
import { useRouteMatch } from "react-router";
import TableView from "../../TableView/TableView";
import InfoCard from "../../InfoCard/InfoCard";
import Pagination from "../../widgets/Pagination/Pagination";
import { Spinner, Label } from "reactstrap";
import { GlobalContext } from "../../../context";
import customersApi from "../../../js/api/customer";
import locationApi from "../../../js/api/locations";
import equipmentApi from "../../../js/api/equipment";
import facilitiesApi from "../../../js/api/facilities";
import Button from "../../UIKit/Button/Button";
import ModalSketch from "../../ModalComponent/ModalSketch";

const List = ({ type, title }) => {
  const [data, setData] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [requests, setRequests] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [view, setView] = useState(true);
  const [isSetViewNeeded, setIsSetViewNeeded] = useState(true);
  const [page, setPage] = useState(1);
  const [screenSize, SetScreenSize] = useState(window.innerWidth);
  const [showEntitySelect, setShowEntitySelect] = useState(true);
  const [showView, setShowView] = useState(true);
  const [totalRows, setTotalRows] = useState(Math.ceil(0));
  const [entityNames, setEntityNames] = useState();
  const [mode, setMode] = useState();
  const [chooseMode, setChooseMode] = useState(false);
  const [totalPages, setTotalPages] = useState();

  const RECORDS_PER_PAGE = 10;

  const {
    pageTitle,
    setPagePath,
    entityID,
    setEntityID,
    showFormModal,
    setShowFormModal,
    selectedCustomer,
    setSelectedCustomer,
    setCustomerStructure,
    updateTrigger,
  } = useContext(GlobalContext);

  const match = useRouteMatch();

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
    requests.list(RECORDS_PER_PAGE, 1, e.target.value, entityID).then((res) => {
      setData(res);
      setTotalRows(res.total);
      setTotalPages(Math.ceil(res.total / RECORDS_PER_PAGE));
      setIsLoading(false);
    });
  };

  const handleResize = () => {
    SetScreenSize(window.innerWidth);
  };

  const handleEntitySelect = (e) => {
    setEntityID(e.target.value);
  };

  const handlePageChange = (e) => {
    const page = e.selected + 1;
    setPage(page);
  };

  const toggleModal = () => {
    setShowFormModal(!showFormModal);
  };

  const changeCustomer = (id) => {
    fetch(
      process.env.REACT_APP_SERVER_URL +
        "/api/customer/" +
        id +
        "?access-token=" +
        localStorage.getItem("token")
    )
      .then((res) => res.json())
      .then((customer) => setSelectedCustomer(customer.customer[id]));
    fetch(
      process.env.REACT_APP_SERVER_URL +
        "/api/customer/" +
        id +
        "/construct?access-token=" +
        localStorage.getItem("token")
    )
      .then((res) => res.json())
      .then((customerStructure) =>
        setCustomerStructure(customerStructure["customerConstruct"])
      );
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
  };

  useEffect(() => {
    switch (type.entity) {
      case "customers":
        setRequests({ list: customersApi.getCustomers });
        setChooseMode(true);
        setShowEntitySelect(false);
        setShowView(true);
        setIsSetViewNeeded(true);
        break;
      case "facilities":
        setRequests({
          list: customersApi.getCustomerFacilities,
          ref: customersApi.getCustomers,
        });
        setChooseMode(false);
        setShowEntitySelect(true);
        setShowView(true);
        setIsSetViewNeeded(true);
        break;
      case "locations":
        setRequests({
          list: locationApi.getFacilityLocations,
          ref: facilitiesApi.getFacilities,
        });
        setChooseMode(false);
        setShowEntitySelect(true);
        setShowView(true);
        setIsSetViewNeeded(true);
        break;
      case "equipment":
        setRequests({
          list: equipmentApi.getLocationEquipment,
          ref: locationApi.getLocations,
        });
        setChooseMode(false);
        setShowEntitySelect(true);
        setShowView(true);
        setIsSetViewNeeded(true);
        break;
      case "gateways":
      case "nodes":
      case "motes":
      case "routers":
      case "sensors":
        setChooseMode(false);
        setShowEntitySelect(false);
        setShowView(false);
        setIsSetViewNeeded(false);
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

    setPagePath(match.path);

    window.addEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (
      selectedCustomer &&
      Object.keys(selectedCustomer).length > 0 &&
      type.ref === "customers"
    ) {
      setEntityID(selectedCustomer.id);
    }
  }, [selectedCustomer]);

  useEffect(() => {
    if (requests.list) {
      setIsLoading(true);
      requests
        .list(RECORDS_PER_PAGE, page, searchQuery, entityID)
        .then((res) => {
          setData(res);
          setTotalRows(res.total);
          setTotalPages(Math.ceil(res.total / RECORDS_PER_PAGE));
          setIsLoading(false);
        });
    }
  }, [requests, updateTrigger]);

  useEffect(() => {
    if (requests.ref)
      requests.ref(-1).then((res) => {
        const formattedNames = formatNames(res[type.ref]);
        setEntityNames(formattedNames);
        if (
          selectedCustomer &&
          Object.keys(selectedCustomer).length > 0 &&
          type.ref === "customers"
        ) {
          setEntityID(selectedCustomer.id);
        } else setEntityID(formattedNames[0].id);
      });
  }, [requests]);

  useEffect(() => {
    if (requests.list) {
      requests
        .list(RECORDS_PER_PAGE, page, searchQuery, entityID)
        .then((res) => {
          setData(res);
        });
    }
  }, [page]);

  useEffect(() => {
    if (requests.list) {
      setIsLoading(true);
      requests
        .list(RECORDS_PER_PAGE, page, searchQuery, entityID)
        .then((res) => {
          setData(res);
          setTotalRows(res.total);
          setTotalPages(Math.ceil(res.total / RECORDS_PER_PAGE));
          setPage(1);
          setIsLoading(false);
        });
    }
  }, [entityID]);

  return (
    <>
      <ModalSketch
        entity={type && type.entity}
        subEntity={type && type.ref}
        modal={showFormModal}
        toggle={toggleModal}
        mode={mode}
      />
      <div className="list">
        <div className="list__header">
          <div className="list__title">
            <h3>{title || pageTitle}</h3>
            <button
              className="list__add-btn"
              onClick={() => {
                setMode("create");
                toggleModal();
              }}
            >
              +
            </button>
          </div>
          <div className="list__options">
            {showEntitySelect && (
              <div className="list__select-entity">
                <Label for="select-entity">{type.ref}:</Label>
                <select
                  className="ui-kit__select"
                  id="select-entity"
                  value={entityID}
                  onChange={handleEntitySelect}
                >
                  {entityNames &&
                    entityNames.map((entity) => (
                      <option key={entity.id} value={entity.id}>
                        {entity.name}
                      </option>
                    ))}
                </select>
              </div>
            )}
            <input
              className="list__search"
              type="text"
              placeholder="Search..."
              onInput={handleSearch}
            />
            {isSetViewNeeded && (
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
        <div className="list__content">
          {!isLoading ? (
            <>
              {view ? (
                <TableView
                  data={data}
                  type={type}
                  totalRows={totalRows}
                  page={page}
                  setPage={setPage}
                  toggleModal={toggleModal}
                  modal={showFormModal}
                  setMode={setMode}
                  chooseMode={chooseMode}
                  changeCustomer={changeCustomer}
                  showView={showView}
                />
              ) : (
                <div
                  className={
                    screenSize > 440
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
                        showView={showView}
                      />
                    ))
                  ) : (
                    <p style={{ display: "flex", justifyContent: "center" }}>
                      No records found.
                    </p>
                  )}
                </div>
              )}
              {!view && totalPages > 1 && (
                <Pagination
                  previousLabel={"<"}
                  nextLabel={">"}
                  pageCount={totalPages}
                  initialPage={page - 1}
                  onPageChange={handlePageChange}
                  containerClassName={"pagination"}
                  activeClassName={"active"}
                />
              )}
            </>
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    </>
  );
};

export default List;
