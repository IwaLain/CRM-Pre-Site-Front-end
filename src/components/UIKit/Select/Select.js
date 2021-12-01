const Select = ({ children, defaultValue }) => {
  return (
    <select
      className="ui-kit__select"
      defaultValue={defaultValue ? defaultValue : ""}
      required
    >
      <option value="" disabled hidden>
        Select
      </option>
      {children}
    </select>
  );
};

export default Select;
