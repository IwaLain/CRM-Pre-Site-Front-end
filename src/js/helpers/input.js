import { errorsValidation } from "./validation"
import { validation } from "./validation"
import '../../scss/components/inputs.scss'
import { Input } from "reactstrap"

const InputForm = ({type, data, errors = '', message = ''}) => {
    const { register, trigger } = data
    return (
        <div>
            <Input
                type={type}
                placeholder='...'
                className={`form-control ${errors ? 'is-invalid' : ''}`}
                {...register(type, validation(type) )}
                onKeyUp={() => {
                    trigger(type)
                }}
            />
            {errorsValidation(errors, message)}
        </div>
    )
}

export default InputForm