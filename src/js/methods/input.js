import { errorsValidation } from "./message"
import { validation } from "./validation"

export const input = (type, data) => {
    const { register, trigger, formState: { errors } } = data
    return (
        <div>
            <input
                type={type}
                placeholder='...'
                className={`form-control ${errors.username && 'invalid'}`}
                {...register(type, validation(type) )}
                onKeyUp={() => {
                    trigger(type)
                }}
            />
            {errorsValidation(errors.username, 'Include any simvols')}
        </div>
    )
}