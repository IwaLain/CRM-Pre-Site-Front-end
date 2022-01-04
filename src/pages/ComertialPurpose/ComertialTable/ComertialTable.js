import { useContext, useEffect, useReducer } from "react";
import DataTable from "react-data-table-component";
import { GlobalContext } from "../../../context";
import { validation } from "../../../js/helpers/validation";
import { reducer } from "../../../reducer";

const ComertialPurpose = ({ setData, dataForm }) => {
  const { selectedCustomer } = useContext(GlobalContext);

  const initialState = {
    listData: [],
    customerNetwork: [],
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const { listData, customerNetwork } = state;

  const { register } = dataForm;

  const priceValidation = (e) => {
    if (e.target.value === 0 || e.target.value === "") {
      e.target.classList.add("is-invalid");
    } else {
      e.target.classList.remove("is-invalid");
    }
  };

  const handleDescriptionChange = (e) => {
    const newData = listData.map((el) => {
      if (el["item"] === e.target.id.split("-")[1]) {
        priceValidation(e);
        return {
          ...el,
          description: e.target.value,
        };
      } else return el;
    });

    dispatch({ listData: newData });
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

    dispatch({ listData: newData });
    if (setData) {
      setData(newData);
    }
  };

  useEffect(() => {
    if (selectedCustomer.id) {
      try {
        fetch(
          process.env.REACT_APP_SERVER_URL +
            "/api/customer/" +
            selectedCustomer.id +
            "/network?access-token=" +
            localStorage.getItem("token")
        )
          .then((res) => res.json())
          .then((data) => dispatch({ customerNetwork: data["Network"] }));
      } catch (e) {
        console.log(e);
      }
    }
  }, []);

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

    dispatch({ listData: data });
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
          name={`description-${row.item}`}
          placeholder="Enter description..."
          className="form-control ui-kit__input"
          onInput={(e) => {
            handleDescriptionChange(e);
            priceValidation(e);
          }}
          {...register(`description-${row.item}`, validation("text"))}
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
          name={`price-${row.item}`}
          type="number"
          min="0"
          placeholder="Enter price..."
          className="form-control ui-kit__input"
          onInput={(e) => {
            handlePriceChange(e);
            priceValidation(e);
          }}
          {...register(`price-${row.item}`, validation("price"))}
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

export default ComertialPurpose;
