import ErrorMessage from './ErrorMessage'
export default function Input({
    labelTitle,
    register,
    validate,
    showError = true,
    errors,
    minLength,
    ...props
}) {
    
    return (
        <>
            <div className="text-field">
                <input
                    autoComplete="off"
                    {...props}
                    {...register(props.name, validate)}
                />
                <label htmlFor={`${props?.id} || ''`}>{labelTitle || ''}</label>
            </div>
            {showError && (
                <ErrorMessage
                    error={errors?.[props.name]?.type}
                    {...validate}
                ></ErrorMessage>
            )}
        </>
    )
}
