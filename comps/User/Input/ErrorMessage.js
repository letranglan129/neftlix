const getMessage = (error, validate) => {
    switch (error) {
        case 'required':
            return 'This field is required'
        case 'email':
            return 'This field must be a valid email'
        case 'minLength':
            return `This field must be at least ${validate?.minLength} characters`
        case 'maxLength':
            return `This field must be at most ${validate?.maxLength} characters`
        case 'min':
            return `This field must be at least ${validate?.min}`
        case 'max':
            return `This field must be at most ${validate?.max}`
        case 'pattern':
            if(validate?.patternMessage) 
                return validate.patternMessage
            return `This field must be ${validate?.patternMessage}`
        case "comparePassword": 
            if(validate?.message)
                return validate.message
            // return "Passwords do not match"


        default:
            return ''
    }
}

export default function ErrorMessage({ error, ...validate }) {
    if (!error) return null

    return <p className="text-sm text-red-600">{getMessage(error, validate)}</p>
}
