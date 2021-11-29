import "../../../scss/list.scss";
import { useContext, useEffect, useState } from "react";
import { useParams, useRouteMatch } from "react-router";
import TableView from "../../TableView/TableView";
import InfoCard from "../../InfoCard/InfoCard";
import Pagination from "../../widgets/Pagination/Pagination";
import { Spinner, Input, Label } from "reactstrap";
import { GlobalContext } from "../../../context";
import { customersApi } from "../../../js/api/customer";
import { location } from "../../../js/api/locations";
import { equipment } from "../../../js/api/equipment";
import { facilitiesApi } from "../../../js/api/facilities";
import ModalComponent from "../../ModalComponent/ModalComponent";

const List = ({ type }) => {
  const [data, setData] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [requests, setRequests] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [view, setView] = useState(true);
  const [page, setPage] = useState(1);
  const [screenSize, SetScreenSize] = useState(window.innerWidth);
  const [showEntitySelect, setShowEntitySelect] = useState(true);
  const [totalPages, setTotalPages] = useState(Math.ceil(0));
  const [entityNames, setEntityNames] = useState();
  const [mode, setMode] = useState();
  const [showChooseBox, setShowChooseBox] = useState(false);

  const RECORDS_PER_PAGE = 12;

  const {
    pageTitle,
    setPagePath,
    entityID,
    setEntityID,
    showFormModal,
    setShowFormModal,
<<<<<<< HEAD
=======
    selectedCustomer,
    setSelectedCustomer,
>>>>>>> develop-fedorov
  } = useContext(GlobalContext);

  const params = useParams();
  let id = 0;
  if (params) {
    id = params.id;
  }

  const match = useRouteMatch();

  const formatData = (data) => {
    const formattedData = [];
    for (let i = 0; i < Object.keys(data).length; i++) {
      formattedData.push(data[Object.keys(data)[i]]);
    }

    return formattedData;
  };

  const formatNames = (data) => {
    const formattedNames = [];

    for (const [key, value] of Object.entries(data)) {
      formattedNames.push({ id: value.id, name: value.name });
    }

    return formattedNames;
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);

    setIsLoading(true);
    requests
      .list(RECORDS_PER_PAGE, page, e.target.value, entityID)
      .then((res) => {
        setData(formatData(res[type.entity]));
        setTotalPages(Math.ceil(res.total / RECORDS_PER_PAGE));
        setIsLoading(false);
      });
  };

  const handlePageChange = (e) => {
    const page = e.selected + 1;
    setPage(page);
  };

  const handleResize = () => {
    SetScreenSize(window.innerWidth);
  };

  const handleEntitySelect = (e) => {
    setEntityID(e.target.value);
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
  };

  useEffect(() => {
    switch (type.entity) {
      case "customers":
        setRequests({ list: customersApi.getCustomers });
        setShowChooseBox(true);
        setShowEntitySelect(false);
        break;
      case "facilities":
        setRequests({
          list: customersApi.getCustomerFacilities,
          ref: customersApi.getCustomers,
        });
<<<<<<< HEAD
=======
        setShowChooseBox(false);
>>>>>>> develop-fedorov
        setShowEntitySelect(true);
        break;
      case "locations":
        setRequests({
          list: location.getFacilityLocations,
          ref: facilitiesApi.getFacilities,
        });
<<<<<<< HEAD
=======
        setShowChooseBox(false);
>>>>>>> develop-fedorov
        setShowEntitySelect(true);
        break;
      case "equipment":
        setRequests({
          list: equipment.getLocationEquipment,
          ref: location.getLocations,
        });
<<<<<<< HEAD
=======
        setShowChooseBox(false);
>>>>>>> develop-fedorov
        setShowEntitySelect(true);
    }

    setPagePath(match.path);

    if (requests.ref)
      requests.ref().then((res) => {
        setEntityNames(formatNames(res[type.ref]));
      });

    window.addEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (requests.list) {
      setIsLoading(true);
      requests
        .list(RECORDS_PER_PAGE, page, searchQuery, entityID)
        .then((res) => {
          setData(formatData(res[type.entity]));
          setTotalPages(Math.ceil(res.total / RECORDS_PER_PAGE));
          setIsLoading(false);
        });
    }

    if (requests.ref)
      requests.ref().then((res) => {
        const formattedNames = formatNames(res[type.ref]);
        setEntityNames(formattedNames);
        if (
          selectedCustomer &&
          Object.keys(selectedCustomer).length > 0 &&
          type.ref === "customers"
        )
          setEntityID(selectedCustomer.id);
        else setEntityID(formattedNames[0].id);
      });
  }, [requests]);

  useEffect(() => {
    if (requests.list) {
      requests
        .list(RECORDS_PER_PAGE, page, searchQuery, entityID)
        .then((res) => {
          setData(formatData(res[type.entity]));
        });
    }
  }, [page]);

  useEffect(() => {
    if (requests.list) {
      setIsLoading(true);
      requests
        .list(RECORDS_PER_PAGE, page, searchQuery, entityID)
        .then((res) => {
          setData(formatData(res[type.entity]));
          setTotalPages(Math.ceil(res.total / RECORDS_PER_PAGE));
          setPage(1);
          setIsLoading(false);
        });
    }
  }, [entityID]);

  return (
    <>
      <ModalComponent
        modal={showFormModal}
        toggle={toggleModal}
        type={type}
        mode={mode}
      />
      <div className="list">
        <div className="list__header">
          <div className="list__title">
            <h3>{pageTitle}</h3>
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
                <Input
                  id="select-entity"
                  onChange={handleEntitySelect}
                  type="select"
                >
                  {entityNames &&
                    entityNames.map((entity) => (
                      <option
                        key={entity.id}
                        value={entity.id}
                        selected={entity.id === selectedCustomer.id}
                      >
                        {entity.id}. {entity.name}
                      </option>
                    ))}
                </Input>
              </div>
            )}
            <input
              className="list__search"
              type="text"
              placeholder="Search..."
              onInput={handleSearch}
            />
            <div className="list__options_btns">
              <button
                onClick={() => setView(true)}
                className={
                  view ? "list__toggle-btn active" : "list__toggle-btn"
                }
              >
                <i className="fas fa-list-ul"></i>
              </button>
              <button
                onClick={() => setView(false)}
                className={
                  !view ? "list__toggle-btn active" : "list__toggle-btn"
                }
              >
                <i className="fas fa-th-large"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="list__content">
          {!isLoading ? (
            <>
              {view ? (
                <TableView
                  data={data}
                  type={type}
                  toggleModal={toggleModal}
                  modal={showFormModal}
                  setMode={setMode}
                  showChooseBox={showChooseBox}
                  changeCustomer={changeCustomer}
                />
              ) : (
                <div
                  className={
                    screenSize > 440
                      ? "info-card_group"
                      : "info-card_group dense"
                  }
                >
                  {data && data.length > 0 ? (
                    data.map((record) => (
                      <InfoCard
                        key={record.id}
                        data={record}
                        type={type.entity}
                        toggleModal={toggleModal}
                        setMode={setMode}
                        showChooseBox={showChooseBox}
                        selected={record.id === selectedCustomer.id}
                        changeCustomer={changeCustomer}
                        setMode={setMode}
                      />
                    ))
                  ) : (
                    <p>No records found.</p>
                  )}
                </div>
              )}
              {totalPages > 1 && (
                <Pagination
                  previousLabel={"<"}
                  nextLabel={">"}
                  pageCount={totalPages}
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
