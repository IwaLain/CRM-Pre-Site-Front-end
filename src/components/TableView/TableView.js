import { Table, Progress, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { PageContext } from "../../context";

const TableView = ({ data, type, toggleModal }) => {
  const [fieldTitle, setFieldTitle] = useState("Title");
  const [showProgress, setShowProgress] = useState(true);

  const { setEditId } = useContext(PageContext);

  useEffect(() => {
    switch (type.entity) {
      case "customers":
      case "facilities":
        setShowProgress(true);
        break;
      default:
        setShowProgress(false);
        break;
    }
  });

  useEffect(() => {
    if (data && data.length > 0) {
      if (data[0].name) setFieldTitle("Name");
    }
  }, [data]);

  return (
    <>
      <Table style={{ width: "100%", verticalAlign: "middle" }}>
        <thead>
          <tr>
            <th style={{ width: "45%" }}>{fieldTitle}</th>
            <th style={{ width: "45%" }}>{showProgress && "Progress"}</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((record) => {
              let progress = 0;
              switch (type.entity) {
                case "customers":
                  if (record.name) progress += 33.3;
                  if (record.facilities && record.facilities.length > 0)
                    progress += 33.3;
                  if (record.equipments && record.equipments.length > 0)
                    progress += 33.3;
                  break;
                case "facilities":
                  if (record.name) progress += 33.3;
                  if (record.locations && record.locations.length > 0)
                    progress += 33.3;
                  if (record.equipments && record.equipments.length > 0)
                    progress += 33.3;
                  break;
                default:
                  break;
              }
              return (
                <tr key={record.id}>
                  <td>{record.name}</td>
                  <td>{showProgress && <Progress value={progress} />}</td>
                  <td>
                    <Link to={`/dashboard/${type.entity}/${record.id}`}>
                      View
                    </Link>
                  </td>
                  <td>
                    <Button
                      onClick={() => {
                        setEditId(record.id);
                        toggleModal();
                      }}
                    >
                      Edit
                    </Button>
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
    </>
  );
};

export default TableView;
