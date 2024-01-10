import classes from './Input.module.css';

const Input = ({ label, id, type, placeholder, value, onChange}) => {
    // const appliedClasses = `${classes.field} ${(isFocused || inputRef?.current?.value?.length) && classes.focus}`
    return (
        <fieldset className={classes.field}>
            <label htmlFor={id}>{label}</label>
            <input id={id} value={value} onChange={onChange} placeholder={placeholder || ''} type={type} />
        </fieldset>
    )
}

export default Input