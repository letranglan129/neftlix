export default function Checkbox({ id, name, children, className }) {
    return (
        <label className={`box-checkbox ${className}`} htmlFor={id}>
            <input type="checkbox" id={id} name={name} hidden />
            <span className="checkbox"></span>
            <span className='text'>{children}</span>
        </label>
    )
}
