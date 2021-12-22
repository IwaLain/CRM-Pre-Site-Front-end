import { useEffect, useReducer } from "react";

const reducer = (state, updates) => ({ ...state, ...(updates || {}) });
const initialState = {
  searchValue: null,
  activeTab: null,
};

const Test = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { searchValue, activeTab } = state;

  useEffect(() => {
    dispatch({
      activeTab: 4,
    });

    console.log(state);
  }, []);

  return "";
};

export default Test;
