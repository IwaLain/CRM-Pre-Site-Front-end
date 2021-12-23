import formatNames from "./components/ModalComponent/formatNames";

export function reducer(state, action) {
  if (action.type) {
    switch (action.type) {
      default:
        return state;
    }
  } else {
    return { ...state, ...(action || {}) };
  }
}
