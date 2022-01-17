import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Progress } from "reactstrap";
import { Link } from "react-router-dom";

const paginationComponentOptions = {
  noRowsPerPage: true,
};

const TableView = ({
  data,
  type,
  totalRows,
  page,
  dispatch,
  toggleModal,
  showProgress,
  hideRecordView,
  perPage,
  toggleSliderModal,
  toggleConfirmModal,
}) => {
  const [cols, setCols] = useState([]);
  const [listData, setListData] = useState([]);
  const [progressField, SetProgressField] = useState("Progress");

  const staticColsEnd = [
    {
      name: progressField,
      cell: (row) => (
        <div
          style={{ width: "100%" }}
          className={
            calculateProgress(row) < 34
              ? `progress-33`
              : calculateProgress(row) < 67
              ? "progress-66"
              : "progress-100"
          }
        >
          <Progress
            value={calculateProgress(row)}
            style={!showProgress ? { visibility: "hidden" } : {}}
          />
        </div>
      ),
    },
    {
      cell: (row) => (
        <>
          <Link
            className="table-view_btn ui-btn ui-btn-info me-2"
            to={`/${type.entity}/${row.id}`}
            style={hideRecordView && { visibility: "hidden" }}
          >
            <i className="far fa-eye"></i>
          </Link>
          <button
            className="ui-btn ui-btn-secondary me-2"
            onClick={() => {
              dispatch({ mode: "edit" });
              dispatch({ modalDataID: row.id });
              toggleModal();
            }}
          >
            <i className="far fa-edit users-table__img" alt="edite"></i>
          </button>
          <button
            className="ui-btn ui-btn-danger"
            onClick={() => {
              dispatch({ recordToDelete: row.id });
              toggleConfirmModal();
            }}
          >
            <i className="far fa-trash-alt  users-table__img" alt="edite"></i>
          </button>
        </>
      ),
      width: "171px",
      right: true,
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
    dispatch({ page });
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
              "No facilities"
            );
        if (value.locations)
          obj["Locations"] =
            value["locations"].length > 0 ? (
              <>
                <i className="fas fa-map-marker-alt me-1"></i>
                {value["locations"].length}
              </>
            ) : (
              "No locations"
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
              "No equipment"
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
              <div
                className="table-images"
                onClick={() => {
                  dispatch({ modalDataID: value.id });
                  dispatch({ entityImages: value[singleAlias + "Images"] });
                  toggleSliderModal();
                }}
              >
                <i className="fas fa-images me-1"></i>
                {
                  value[singleAlias + "Images"].filter(
                    (el) => el.type_id === "1"
                  ).length
                }
              </div>
            ) : (
              "No images"
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
          columns={[...cols, ...staticColsEnd]}
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
