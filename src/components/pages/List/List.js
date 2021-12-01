import "../../../scss/list.scss";
import { useContext, useEffect, useState } from "react";
import { useParams, useRouteMatch } from "react-router";
import TableView from "../../TableView/TableView";
import InfoCard from "../../InfoCard/InfoCard";
import Pagination from "../../widgets/Pagination/Pagination";
import { Spinner, Input, Label } from "reactstrap";
import { GlobalContext } from "../../../context";
import customersApi from "../../../js/api/customer";
import location from "../../../js/api/locations";
import equipment from "../../../js/api/equipment";
import facilitiesApi from "../../../js/api/facilities";
import ModalComponent from "../../ModalComponent/ModalComponent";
import Button from "../../UIKit/Button/Button";

const List = ({ type }) => {
  const [data, setData] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [requests, setRequests] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [view, setView] = useState(true);
  const [page, setPage] = useState(1);
  const [screenSize, SetScreenSize] = useState(window.innerWidth);
  const [showEntitySelect, setShowEntitySelect] = useState(true);
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
  } = useContext(GlobalContext);

  const match = useRouteMatch();

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
  };

  useEffect(() => {
    switch (type.entity) {
      case "customers":
        setRequests({ list: customersApi.getCustomers });
        setChooseMode(true);
        setShowEntitySelect(false);
        break;
      case "facilities":
        setRequests({
          list: customersApi.getCustomerFacilities,
          ref: customersApi.getCustomers,
        });
        setChooseMode(false);
        setShowEntitySelect(true);
        break;
      case "locations":
        setRequests({
          list: location.getFacilityLocations,
          ref: facilitiesApi.getFacilities,
        });
        setChooseMode(false);
        setShowEntitySelect(true);
        break;
      case "equipment":
        setRequests({
          list: equipment.getLocationEquipment,
          ref: location.getLocations,
        });
        setChooseMode(false);
        setShowEntitySelect(true);
        break;
      case "gateways":
        setRequests({
          list: (limit, page, search) => {
            let url =
              process.env.REACT_APP_SERVER_URL +
              "/api/customer/" +
              selectedCustomer.id +
              "/gateway?access-token=" +
              localStorage.getItem("token");
            if (limit) url += "&limit=" + limit;
            if (page) url += "&page=" + page;
            if (search) url += "&s=" + search;

            return fetch(url).then((res) => res.json());
          },
        });
      default:
        break;
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
          setData(res);
          setTotalRows(res.total);
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
                      />
                    ))
                  ) : (
                    <p>No records found.</p>
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
