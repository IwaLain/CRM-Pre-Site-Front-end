import { Table, Progress } from "reactstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const TableView = ({ data, type }) => {
  const [fieldTitle, setFieldTitle] = useState("Title");

  useEffect(() => {
    if (data && data.length > 0) {
      if (data[0].name) setFieldTitle("Name");
    }
  }, [data]);

  return (
    <Table style={{ width: "100%", verticalAlign: "middle" }}>
      <thead>
        <tr>
          <th style={{ width: "45%" }}>{fieldTitle}</th>
          <th style={{ width: "45%" }}>Progress</th>
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((record) => {
            let progress = 0;
            if (record.name) progress += 33.3;
            if (record.facilities && record.facilities.length > 0)
              progress += 33.3;
            if (record.equipments && record.equipments.length > 0)
              progress += 33.3;
            return (
              <tr key={record.id}>
                <td>{record.name}</td>
                <td>
                  <Progress value={progress} />
                </td>
                <td>
                  <Link to={`/dashboard/${type}/${record.id}`}>View</Link>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan="3" style={{ textAlign: "center" }}>
              No records found.
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default TableView;
