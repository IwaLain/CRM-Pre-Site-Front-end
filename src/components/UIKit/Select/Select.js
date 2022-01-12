const Select = ({ children, defaultValue, onChange, id }) => {
  return (
    <select
      id={id}
      className="default-select"
      defaultValue={defaultValue}
      onChange={onChange}
      required
    >
      {children}
    </select>
  );
};

export default Select;
