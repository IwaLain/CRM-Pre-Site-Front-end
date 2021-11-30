import { errorsValidation, validation } from "./validation"
import '../../scss/components/inputs.scss'

const InputForm = ({type, data, errors, placeholder = '...', message = ''}) => {
    const { 
        register, 
        trigger 
    } = data
    
    return (
        <div>
            <input
                type={type}
                placeholder={placeholder}
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