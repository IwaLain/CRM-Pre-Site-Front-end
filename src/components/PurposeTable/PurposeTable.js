import { useContext, useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { GlobalContext } from "../../context";

const PurposeTable = ({ setData }) => {
  const { customerNetwork } = useContext(GlobalContext);

  const [listData, setListData] = useState([]);

  const handleDescriptionChange = (e) => {
    const newData = listData.map((el) => {
      if (el["item"] === e.target.id.split("-")[1]) {
        return {
          ...el,
          description: e.target.value,
        };
      } else return el;
    });

    setListData(newData);
    if (setData) {
      setData(newData);
    }
  };

  const handlePriceChange = (e) => {
    const newData = listData.map((el) => {
      if (el["item"] === e.target.id.split("-")[1]) {
        return {
          ...el,
          price: e.target.value,
          cost: el["quantity"] * e.target.value,
        };
      } else return el;
    });

    setListData(newData);
    if (setData) {
      setData(newData);
    }
  };

  useEffect(() => {
    const data = [];

    for (const [key, value] of Object.entries(customerNetwork)) {
      if (value > 0) {
        data.push({
          item: key,
          description: "",
          units: "EA",
          quantity: value,
          price: "",
          cost: 0,
        });
      }
    }

    setListData(data);
    if (setData) {
      setData(data);
    }
  }, [customerNetwork]);

  const columns = [
    {
      name: "Item",
      selector: (row) => row["item"],
    },
    {
      name: "Description",
      cell: (row) => (
        <input
          type="text"
          id={`description-${row.item}`}
          placeholder="Enter description..."
          onInput={(e) => handleDescriptionChange(e)}
        />
      ),
    },
    {
      name: "Units",
      selector: (row) => row["units"],
    },
    {
      name: "Quantity",
      selector: (row) => row["quantity"],
    },
    {
      name: "Price",
      cell: (row) => (
        <input
          id={`price-${row.item}`}
          type="number"
          min="0"
          placeholder="Enter price..."
          onInput={(e) => handlePriceChange(e)}
        />
      ),
    },
    {
      name: "Cost",
      selector: (row) => row["cost"],
    },
  ];

  return <DataTable columns={columns} data={listData} />;
};

export default PurposeTable;
