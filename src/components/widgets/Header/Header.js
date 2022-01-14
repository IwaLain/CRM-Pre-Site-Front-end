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
    selectedOption: null,
    inputValue: "",
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const { customerNames, modal, createName, selectedOption, inputValue } =
    state;

  const { selectedCustomer, setSelectedCustomer, updateTrigger } =
    useContext(GlobalContext);

  const toggleModal = () => {
    dispatch({ modal: !modal });
  };

  const inputChangeHandler = (e) => {
    dispatch({ inputValue: e });
  };

  const changeCustomer = ({ value, __isNew__ }) => {
    dispatch({
      selectedOption: customerNames.find((el) => el.value === value),
    });

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
          if (selectedCustomer && Object.keys(selectedCustomer).length > 0) {
            console.log(selectedCustomer);
            dispatch({
              selectedOption: formattedNames.find(
                (el) => el.value === selectedCustomer.id
              ),
            });
          }
        });
    } catch (e) {}
  }, [updateTrigger]);

  useEffect(() => {
    if (selectedCustomer && Object.keys(selectedCustomer).length < 1) {
      dispatch({ selectedOption: null });
      dispatch({ inputValue: "" });
    }
  }, [selectedCustomer]);

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
            value={selectedOption}
            inputValue={inputValue}
            onInputChange={inputChangeHandler}
            placeholder="Choose customer"
          />
        </span>
      </header>
    </>
  );
};

export default Header;
