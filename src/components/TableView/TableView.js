import { Table, Progress, Button, FormGroup, Input } from "reactstrap";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context";

const TableView = ({
  data,
  type,
  toggleModal,
  setMode,
  showChooseBox,
  changeCustomer,
}) => {
  const [fieldTitle, setFieldTitle] = useState("Title");
  const [showProgress, setShowProgress] = useState(true);
  const [subEntity, setSubEntity] = useState("");

  const { setEditId, selectedCustomer } = useContext(GlobalContext);

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
  });

  useEffect(() => {
    if (data && data.length > 0) {
      if (data[0].name) setFieldTitle("Name");
    }
  }, [data]);

  const calculateProgress = (record) => {
    let progress = 0;
    switch (type.entity) {
      case "customers":
        if (record.name) progress += 33.3;
        if (record.facilities && record.facilities.length > 0) progress += 33.3;
        if (record.equipments && record.equipments.length > 0) progress += 33.3;
        break;
      case "facilities":
        if (record.name) progress += 33.3;
        if (record.locations && record.locations.length > 0) progress += 33.3;
        if (record.equipments && record.equipments.length > 0) progress += 33.3;
        break;
      default:
        break;
    }

    return progress;
  };

  return (
    <>
      <Table style={{ width: "100%", verticalAlign: "middle" }}>
        <thead>
          <tr>
            {showChooseBox && <th style={{ width: "2%" }}></th>}
            <th style={{ width: "10%" }}>{fieldTitle}</th>
            {subEntity && <th style={{ width: "3%" }}>{subEntity}</th>}
            <th style={{ width: "75%" }}>{showProgress && "Progress"}</th>
            <th style={{ width: "5%" }}></th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((record) => {
              let progress = calculateProgress(record);
              return (
                <tr key={record.id}>
                  {showChooseBox && (
                    <td>
                      <FormGroup check>
                        <Input
                          type="checkbox"
                          checked={record.id === selectedCustomer.id}
                          onChange={() => changeCustomer(record.id)}
                        />
                      </FormGroup>
                    </td>
                  )}
                  <td>{record.name}</td>
                  {subEntity && (
                    <td>{record[subEntity.toLowerCase()].length}</td>
                  )}
                  <td>{showProgress && <Progress value={progress} />}</td>
                  <td>
                    <Link to={`/dashboard/${type.entity}/${record.id}`}>
                      View
                    </Link>
                  </td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => {
                        setMode("edit");
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
