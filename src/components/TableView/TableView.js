import { useEffect, useState, useContext } from "react";
import DataTable from "react-data-table-component";
import { Progress } from "reactstrap";
import { GlobalContext } from "../../context";
import { Link } from "react-router-dom";
import Input from "../UIKit/Input/Input";
import Button from "../UIKit/Button/Button";

const paginationComponentOptions = {
  noRowsPerPage: true,
};

const TableView = ({
  data,
  type,
  totalRows,
  page,
  setPage,
  toggleModal,
  setMode,
  chooseMode,
  changeCustomer,
  showView,
}) => {
  const [listData, setListData] = useState([]);
  const [fieldTitle, setFieldTitle] = useState("Title");
  const [showProgress, setShowProgress] = useState(true);
  const [progressField, SetProgressField] = useState("Progress");
  const [subEntity, setSubEntity] = useState("");

  const { setEditId, selectedCustomer } = useContext(GlobalContext);

  const columns = [
    {
      cell: (row) => (
        <Input
          type="checkbox"
          checked={row.id === selectedCustomer.id}
          onChange={() => changeCustomer(row.id)}
          style={!chooseMode ? { visibility: "hidden" } : {}}
        />
      ),
      width: "0px",
    },
    {
      name: fieldTitle,
      selector: (row) => row.name,
    },
    {
      name: subEntity,
      selector: (row) => row[subEntity.toLowerCase()],
      width: "100px",
    },
    {
      name: progressField,
      cell: (row) => (
        <Progress
          value={calculateProgress(row)}
          style={!showProgress ? { visibility: "hidden" } : {}}
        />
      ),
    },
    {
      cell: (row) => (
        <>
          <Link
            className="table-view_btn me-2"
            to={`/dashboard/${type.entity}/${row.id}`}
            style={!showView ? { visibility: "hidden" } : {}}
          >
            View
          </Link>
          <Button
            color="default"
            onClick={() => {
              setMode("edit");
              setEditId(row.id);
              toggleModal();
            }}
          >
            Edit
          </Button>
        </>
      ),
      width: "171px",
    },
  ];

  const calculateProgress = (record) => {
    let progress = 0;
    switch (type.entity) {
      case "customers":
        if (record.name) progress += 33.3;
        if (record.facilities && record.facilities > 0) progress += 33.3;
        if (record.equipments && record.equipments > 0) progress += 33.3;
        break;
      case "facilities":
        if (record.name) progress += 33.3;
        if (record.locations && record.locations > 0) progress += 33.3;
        if (record.equipments && record.equipments > 0) progress += 33.3;
        break;
      default:
        break;
    }

    return progress;
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  useEffect(() => {
    SetProgressField(showProgress ? "Progress" : "");
  }, [showProgress]);

  useEffect(() => {
    if (data) {
      const newData = [];
      for (const [key, value] of Object.entries(data[type.entity])) {
        const obj = {};
        obj["id"] = value.id;
        obj["name"] = value.name;
        if (value.facilities) obj["facilities"] = value.facilities.length;
        if (value.locations) obj["locations"] = value.locations.length;
        if (value.equipments) obj["equipments"] = value.equipments.length;
        if (value.equipment) obj["equipment"] = value.equipment.length;
        newData.push(obj);
      }
      setListData(newData);
    }
  }, [data]);

  useEffect(() => {
    switch (type.entity) {
      case "customers":
        setShowProgress(true);
        setSubEntity("Facilities");
        break;
      case "facilities":
        setShowProgress(true);
        setSubEntity("Locations");
        break;
      case "locations":
        setShowProgress(false);
        setSubEntity("Equipment");
        break;
      default:
        setShowProgress(false);
        setSubEntity("");
        break;
    }
  }, []);

  useEffect(() => {
    if (listData && listData.length > 0) {
      if (listData[0].name) setFieldTitle("Name");
    }
  }, [listData]);

  return (
    <DataTable
      columns={columns}
      data={listData}
      pagination
      paginationServer
      paginationTotalRows={totalRows}
      paginationComponentOptions={paginationComponentOptions}
      onChangePage={handlePageChange}
      paginationDefaultPage={page}
    />
  );
};

export default TableView;
