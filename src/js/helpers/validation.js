const regex = {
  password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/,
  email:
    /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
  phone: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
};

export const validation = (type) => {
  switch (type) {
    case "username":
      return {
        required: "Username is required",
        minLength: {
          value: 2,
          message: "Minimum 2 symbols",
        },
      };
    case "password":
      return {
        required: "Password is required",
        minLength: {
          value: 4,
          message: "Minimum 4 symbols",
        },
        maxLength: {
          value: 15,
          message: "Minimum 15 symbols",
        },
      };
    case "email":
      return {
        required: "Email is required",
        pattern: {
          value: regex.email,
          message: "Wrong email. Example tolik@gmail.com",
        },
      };
    case "phone":
      return {
        required: "Phone is required",
        minLength: {
          value: 9,
          message: "Minimum 9 symbols",
        },
        pattern: {
          value: regex.phone,
          message: "Wrong phone. Example: 555-555-5555",
        },
      };
    case "role":
      return {
        pattern: {
          value: "Select role",
          message: "Please select role",
        },
      };
    case "name":
      return {
        required: "Name is required",
        minLength: {
          value: 3,
          message: "Name should contain at least 3 symbols.",
        },
      };
    case "address":
      return {
        required: "Address is required",
        minLength: {
          value: 3,
          message: "Address should contain at least 3 symbols.",
        },
      };
    case "text":
      return {
        required: `${type} is required`,
        minLength: {
          value: 3,
          message: `${type} should contain at least 3 symbols.`,
        },
      };
    case "description":
      return {
        required: `${type} is required`,
        maxLength: {
          value: 15,
          message: "Max 15 symbols",
        },
      };
    case "price":
      return {
        required: `${type} is required`,
        minLength: {
          value: 1,
          message: "Should contain at least 1 number",
        },
      };
    default:
      break;
  }
};

export const errorsValidation = (errors, message) => {
  if (errors) {
    return (
      <small className="addUser__desc text-danger validation-error">
        {errors.message}
      </small>
    );
  } else {
    return (
      <small className="addUser__desc text-muted validation-error">
        {message}
      </small>
    );
  }
};
