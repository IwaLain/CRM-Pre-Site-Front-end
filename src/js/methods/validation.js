const regex = {
<<<<<<< HEAD
  password: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
  email:
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
  phone: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
};

const validation = (type) => {
  switch (type) {
    case "username":
      return {
        required: "UserName is Required",
        minLength: {
          value: 3,
          message: "Minimum 3 simvols",
        },
      };
    case "password":
      return {
        required: "Password is Required",
        minLength: {
          value: 4,
          message: "Minimum 4 simvols",
        },
        maxLength: {
          value: 16,
          message: "Maximum 16 simvols",
        },
        pattern: {
          value: regex.password,
          message:
            "Password should contain atleast one number and one special character",
        },
      };
    case "email":
      return {
        required: "Email is Required",
        minLength: {
          value: 5,
          message: "Minimum 5 simvols",
        },
        pattern: {
          value: regex.email,
          message: "Email must be like exampl@mail.com",
        },
      };
    case "phone":
      return {
        required: "Phone is Required",
        minLength: {
          value: 9,
          message: "Minimum 9 simvols",
        },
        pattern: {
          value: regex.phone,
          message: "Phone must be like 555-555-5555",
        },
      };
    case "role":
      return {
        pattern: {
          value: "Select role",
          message: "Please select role",
        },
      };
    case "text":
      return {
        required: "This input is required",
        minLength: {
          value: 4,
          message: "Minimum 4 simvols",
        },
      };
    default:
      break;
  }
};
export { validation };
=======
    password: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
    email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
    phone: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
}

export const validation = (type) => {
    switch (type) {
        case 'username':
            return {
                required: "UserName is Required",
                minLength: {
                    value: 3,
                    message: "Minimum 3 simvols",
                }
            }
        case 'password':
            return {
                required: "Password is Required",
                minLength: {
                    value: 4,
                    message: "Minimum 4 simvols",
                },
                maxLength: {
                    value: 16,
                    message: "Maximum 16 simvols",
                },
                pattern: {
                    value: regex.password,
                    message: "Password should contain atleast one number and one special character",
                }
            }
        case 'email':
            return {
                required: "Email is Required",
                minLength: {
                    value: 5,
                    message: "Minimum 5 simvols",
                },
                pattern: {
                    value: regex.email,
                    message: "Email must be like exampl@mail.com",
                }
            }
        case 'phone':
            return {
                required: "Phone is Required",
                minLength: {
                    value: 9,
                    message: "Minimum 9 simvols",
                },
                pattern: {
                    value: regex.phone,
                    message: "Phone must be like 555-555-5555",
                }
            }
        case 'role':
            return {
                pattern: {
                    value: 'Select role',
                    message: 'Please select role'
                }
            }
        case 'text':
            return {
                required: 'This input is required',
                minLength: {
                    value: 4,
                    message: "Minimum 4 simvols",
                },
            }
        default:
            break
    }
}
>>>>>>> 46d90e9fb9e1c2f511625f5d41cde3ae94609dc7
