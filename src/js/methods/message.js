export const errorsValidation = (errors, message) => {
    if (errors) {
        return <small className="addUser__desc text-danger">{errors.message}</small>
    } else {
        return <small className='addUser__desc text-muted'>{message}</small>
    }
}