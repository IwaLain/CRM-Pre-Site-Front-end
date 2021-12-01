import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Progress } from "reactstrap";
import { Link } from "react-router-dom";

const paginationComponentOptions = {
  noRowsPerPage: true,
};

const DataTablePage = () => {
  const [listData, setListData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [fieldTitle, setFieldTitle] = useState("Title");
  const [loading, setLoading] = useState(false);

  const type = { entity: "customers" };

  const columns = [
    {
      cell: () => <input type="checkbox" />,
      width: "0px",
    },
    {
      name: fieldTitle,
      selector: (row) => row.name,
    },
    {
      name: "Facilities",
      selector: (row) => row.facilities,
    },
    {
      name: "Progress",
      cell: (row) => (
        <Progress value={calculateProgress(row)} style={{ width: "100%" }} />
      ),
    },
    {
      cell: (row) => (
        <Link
          className="table-view_btn"
          to={`/dashboard/${type.entity}/${row.id}`}
        >
          View
        </Link>
      ),
    },
  ];

  const calculateProgress = (record) => {
    let progress = 0;
    let type = { entity: "customers" };
    switch (type.entity) {
      case "customers":
        if (record.name) progress += 33.3;
        if (record.facilities && record.facilities > 0) progress += 33.3;
        if (record.equipment && record.equipment > 0) progress += 33.3;
        break;
      case "facilities":
        if (record.name) progress += 33.3;
        if (record.locations && record.locations) progress += 33.3;
        if (record.equipment && record.equipment) progress += 33.3;
        break;
      default:
        break;
    }

    return progress;
  };

  const handlePageChange = (page) => {
    setLoading(true);
    fetch(
      process.env.REACT_APP_SERVER_URL +
        "/api/customer?access-token=" +
        localStorage.getItem("token") +
        `&limit=10&page=${page}`
    )
      .then((res) => res.json())
      .then((data) => {
        const newData = [];
        for (const [key, value] of Object.entries(data[type.entity])) {
          setTotalRows(data.total);
          newData.push({
            id: value.id,
            name: value.name,
            equipment: value.equipments.length,
            facilities: value.facilities.length,
          });
        }
        setListData(newData);
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    fetch(
      process.env.REACT_APP_SERVER_URL +
        "/api/customer?access-token=" +
        localStorage.getItem("token") +
        `&limit=10&page=1`
    )
      .then((res) => res.json())
      .then((data) => {
        const newData = [];
        for (const [key, value] of Object.entries(data[type.entity])) {
          setTotalRows(data.total);
          newData.push({
            id: value.id,
            name: value.name,
            equipment: value.equipments.length,
            facilities: value.facilities.length,
          });
        }
        setListData(newData);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (listData && listData.length > 0) {
      if (listData[0].name) setFieldTitle("Name");
    }
  }, [listData]);

  return (
    <>
      <DataTable
        columns={columns}
        data={listData}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        paginationComponentOptions={paginationComponentOptions}
        onChangePage={handlePageChange}
      />
    </>
  );
};

export default DataTablePage;
