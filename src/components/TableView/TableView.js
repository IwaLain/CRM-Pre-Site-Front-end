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
  showProgress,
  hideRecordView,
  perPage,
}) => {
  const [cols, setCols] = useState([]);
  const [listData, setListData] = useState([]);
  const [progressField, SetProgressField] = useState("Progress");

  const { setEditId, selectedCustomer } = useContext(GlobalContext);

  const staticColsStart = [
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
  ];

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
            to={`/${type.entity}/${row.id}`}
            style={hideRecordView && { visibility: "hidden" }}
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
        if (record["Name"]) progress += 33.3;
        if (
          record["Facilities"] &&
          typeof record["Facilities"] === "object" &&
          record["Facilities"].props.children[1] > 0
        )
          progress += 33.3;
        if (
          record["Equipment"] &&
          typeof record["Equipment"] === "object" &&
          record["Equipment"].props.children[1] > 0
        )
          progress += 33.3;
        break;
      case "facilities":
        if (record["Name"]) progress += 33.3;
        if (
          record["Locations"] &&
          typeof record["Locations"] === "object" &&
          record["Locations"].props.children[1] > 0
        )
          progress += 33.3;
        if (
          record["Equipment"] &&
          typeof record["Equipment"] === "object" &&
          record["Equipment"].props.children[1] > 0
        )
          progress += 33.3;
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

      let singleAlias = "";
      let mainEntity = "";
      switch (type.entity) {
        case "customers":
          singleAlias = "customer";
          mainEntity = "";
          break;
        case "facilities":
          singleAlias = "facility";
          mainEntity = "customer";
          break;
        case "locations":
          singleAlias = "location";
          mainEntity = "facility";
          break;
        case "equipment":
          singleAlias = "equipment";
          mainEntity = "location";
          break;
        case "gateways":
          singleAlias = "gateway";
          mainEntity = "";
          break;
        default:
          mainEntity = "";
          break;
      }

      for (const [, value] of Object.entries(data[type.entity])) {
        const obj = {};

        if (value[mainEntity])
          obj[mainEntity.charAt(0).toUpperCase() + mainEntity.slice(1)] =
            value[mainEntity]["name"];
        if (value.id) obj["id"] = value.id;
        if (value.name) obj["Name"] = value.name;
        if (value.serial) obj["Serial"] = value.serial;
        if (value.facilities)
          obj["Facilities"] =
            value["facilities"].length > 0 ? (
              <>
                <i className="fas fa-industry me-1"></i>
                {value["facilities"].length}
              </>
            ) : (
              "No facilities."
            );
        if (value.locations)
          obj["Locations"] =
            value["locations"].length > 0 ? (
              <>
                <i className="fas fa-map-marker-alt me-1"></i>
                {value["locations"].length}
              </>
            ) : (
              "No locations."
            );
        if (value.equipments || value.equipment)
          obj["Equipment"] =
            value["equipments"] && value["equipments"].length > 0 ? (
              <>
                <i className="fas fa-tools me-1"></i>
                {value["equipments"].length}
              </>
            ) : value["equipment"] && value["equipment"].length > 0 ? (
              <>
                <i className="fas fa-tools me-1"></i>
                {value["equipment"].length}
              </>
            ) : (
              "No equipment."
            );
        if (value.sensors && value.mote)
          obj["Sensors/motes"] = value.sensors.length + value.mote.length;
        if (value["location_info"])
          obj["Location info"] = value["location_info"];
        if (value["created_at"]) obj["Created at"] = value["created_at"];
        if (value["updated_at"]) obj["Updated at"] = value["updated_at"];
        if (value[singleAlias + "Images"])
          obj["Images"] =
            value[singleAlias + "Images"].length > 0 ? (
              <>
                <i className="fas fa-images me-1"></i>
                {value[singleAlias + "Images"].length}
              </>
            ) : (
              "No images."
            );
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
  }, [data]);

  return (
    <>
      {listData && Object.keys(listData).length > 0 && cols.length > 0 ? (
        <DataTable
          columns={[...staticColsStart, ...cols, ...staticColsEnd]}
          data={listData}
          pagination={Math.ceil(totalRows / perPage) > 1}
          paginationServer
          paginationTotalRows={totalRows}
          paginationComponentOptions={paginationComponentOptions}
          onChangePage={handlePageChange}
          paginationDefaultPage={page}
          paginationPerPage={perPage}
        />
      ) : (
        <p
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "24px 24px 39px 24px",
            margin: "0",
          }}
        >
          There are no records to display
        </p>
      )}
    </>
  );
};

export default TableView;
