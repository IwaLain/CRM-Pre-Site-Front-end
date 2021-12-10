const regex = {
  password: /^(?=.*[a-z])([a-z]{4,15})$/,
  email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
  phone: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
}

export const validation = (type) => {
  switch (type) {
      case 'username':
          return {
              required: "UserName is Required",
              minLength: {
                  value: 2,
                  message: "Minimum 2 simvols",
              },
          }
      case 'password':
          return {
              required: "Password is Required",
              minLength: {
                  value: 4,
                  message: "Minimum 4 simvols",
              },
              maxLength: {
                  value: 15,
                  message: "Minimum 15 simvols",
              },
              pattern: {
                  value: regex.password,
                  message: "Password should contain number and sinvols",
              }
          }
      case 'email':
          return {
              required: "Email is Required",
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
      case 'name':
          return {
            required: "Name is Required",
              minLength: {
                value: 3,
                message: "Name should contain at least 3 symbols.",
              },
          }
      case 'address':
          return {
            required: "Address is Required",
              minLength: {
                value: 3,
                message: "Address should contain at least 3 symbols.",
              },
          }
      case 'text':
          return {
            required: `${type} is Required`,
              minLength: {
                value: 3,
                message: `${type} should contain at least 3 symbols.`,
              },
          }
      default:
          break
  }
}

export const errorsValidation = (errors, message) => {
  if (errors) {
      return <small className="addUser__desc text-danger">{errors.message}</small>
  } else {
      return <small className='addUser__desc text-muted'>{message}</small>
  }
}