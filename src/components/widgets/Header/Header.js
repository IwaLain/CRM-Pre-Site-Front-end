import { useContext, useEffect, useReducer } from "react";
import { GlobalContext } from "../../../context";
import Creatable from "react-select/creatable";
import { reducer } from "../../../reducer";
import ModalSketch from "../../ModalComponent/ModalSketch";

const Header = () => {
  const initialState = {
    customerNames: {},
    modal: false,
    createName: "",
    selectedOption: "",
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const { customerNames, modal, createName, selectedOption } = state;

  const { selectedCustomer, setSelectedCustomer, updateTrigger } =
    useContext(GlobalContext);

  const toggleModal = () => {
    dispatch({ modal: !modal });
  };

  const changeCustomer = ({ value, __isNew__ }) => {
    if (__isNew__) {
      dispatch({ createName: value });
      toggleModal();
    } else {
      try {
        fetch(
          process.env.REACT_APP_SERVER_URL +
            "/api/customer/" +
            value +
            "?access-token=" +
            localStorage.getItem("token")
        )
          .then((res) => res.json())
          .then((customer) => {
            if (customer) {
              setSelectedCustomer(customer.customer[value]);
              localStorage.setItem(
                "selectedCustomer",
                JSON.stringify(customer.customer[value])
              );
            }
          });
      } catch (e) {}
    }

    dispatch({ selectedOption: value });
  };

  useEffect(() => {
    const formattedNames = [];

    try {
      fetch(
        process.env.REACT_APP_SERVER_URL +
          "/api/customers?access-token=" +
          localStorage.getItem("token") +
          "&limit=-1"
      )
        .then((res) => res.json())
        .then((data) => {
          Object.entries(data["customers"]).map(([, { id, name }]) => {
            formattedNames.push({ value: id, label: name });
          });
          dispatch({ customerNames: formattedNames });
        });
    } catch (e) {}
  }, [updateTrigger]);

  return (
    <>
      <ModalSketch
        entity="customers"
        modal={modal}
        toggle={toggleModal}
        mode="create"
        data={{ createName }}
      />
      <header style={{ zIndex: 10 }}>
        <span></span>
        <span className="selected-customer">
          <Creatable
            options={customerNames}
            onChange={(e) => {
              changeCustomer(e);
            }}
            placeholder="Choose customer"
          />
        </span>
      </header>
    </>
  );
};

export default Header;
