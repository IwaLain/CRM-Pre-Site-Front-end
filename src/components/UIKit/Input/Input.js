const Input = ({
  type,
  id,
  name,
  placeholder,
  disabled,
  value,
  checked,
  defaultChecked,
  onBlur,
}) => {
  return (
    <input
      id={id}
      name={name}
      className="ui-kit__input"
      type={type ? type : "text"}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      checked={checked}
      defaultChecked={defaultChecked}
      onBlur={onBlur}
    />
  );
};

export default Input;
