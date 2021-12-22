import { useContext, useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { GlobalContext } from "../../../../context";
import { validation } from "../../../../js/helpers/validation";
import '../../../../scss/ui-kit.scss'

const ComertialPurpose = ({ setData, dataForm }) => {
  const { customerNetwork } = useContext(GlobalContext);

  const [listData, setListData] = useState([]);
  const { register, trigger } = dataForm

  const priceValidation = (e) => {
      if (e.target.value === 0 || e.target.value === '') {
        e.target.classList.add('is-invalid')
      } else {
        e.target.classList.remove('is-invalid')
      }
  }

  const handleDescriptionChange = (e) => {
    const newData = listData.map((el) => {
      if (el["item"] === e.target.id.split("-")[1]) {
        priceValidation(e)
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
      if (value.length > 0) {
        data.push({
          item: key,
          description: "",
          units: "EA",
          quantity: value.length,
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
          name={`description-${row.item}`}
          placeholder="Enter description..."
          className={`form-control ${'description-' + row.item === '' ? 'is-invalid' : ''}`}
          onInput={(e) => {
              handleDescriptionChange(e)
              priceValidation(e)
            }}
          {...register(`description-${row.item}`, validation('text'))}
          onKeyUp = {() => {
            trigger(`description-${row.item}`)
          }}
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
          className={`form-control ${'price-' + row.item === '' ? 'is-invalid' : ''}`}
          onInput={(e) => {
              handlePriceChange(e)
              priceValidation(e)
            }}
          {...register(`price-${row.item}`, validation('price'))}
          onKeyUp = {() => {
            trigger(`price-${row.item}`)
          }}
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
