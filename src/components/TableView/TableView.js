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
  const [cols, setCols] = useState([]);
  const [listData, setListData] = useState([]);
  const [fieldTitle, setFieldTitle] = useState("Title");
  const [showProgress, setShowProgress] = useState(true);
  const [progressField, SetProgressField] = useState("Progress");
  const [subEntity, setSubEntity] = useState("");

  const { setEditId, selectedCustomer } = useContext(GlobalContext);

  const staticColsStart = {
    cell: (row) => (
      <Input
        type="checkbox"
        checked={row.id === selectedCustomer.id}
        onChange={() => changeCustomer(row.id)}
        style={!chooseMode ? { visibility: "hidden" } : {}}
      />
    ),
    width: "0px",
  };

  const staticColsEnd = [
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
    if (
      data &&
      (data.length > 0 || Object.keys(data).length > 0) &&
      data[type.entity] &&
      (data[type.entity].length > 0 ||
        Object.keys(data[type.entity]).length > 0)
    ) {
      const newData = [];
      for (const [key, value] of Object.entries(data[type.entity])) {
        const obj = {};

        obj["id"] = value.id;
        if (value.name) obj["name"] = value.name;
        if (value.serial) obj["serial"] = value.serial;
        if (value.facilities) obj["facilities"] = value.facilities.length;
        if (value.locations) obj["locations"] = value.locations.length;
        if (value.equipments) obj["equipments"] = value.equipments.length;
        if (value.equipment) obj["equipment"] = value.equipment.length;
        if (value["location_info"])
          obj["location_info"] = value["location_info"];
        if (value["created_at"]) obj["created_at"] = value["created_at"];
        if (value["updated_at"]) obj["updated_at"] = value["updated_at"];
        newData.push(obj);
      }
      setListData(newData);

      const columns = [];

      Object.keys(newData[0]).forEach((key) => {
        if (key !== "id") {
          columns.push({
            name: key,
            selector: (row) => row[key],
          });
        }
      });

      setCols(columns);
    }
    console.log(data);
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
      columns={[staticColsStart, ...cols, ...staticColsEnd]}
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
