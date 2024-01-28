import React from 'react'
import classes from './Dropdown.module.css';

// const Dropdown = ({ label, id, options }) => {
//     return (
//         <div className={classes.dropdown}>
//             <label htmlFor={id}>{label}</label>
//             <select name={id} id={id}>
//                 {options.map(option => <option value={option}>{option}</option>)}
//             </select>
//         </div>
//     )
// }

const Dropdown = ({ id, children, onChange, value }) => {
    return (
        <select value={value} className={classes.dropdown} name={id} id={id} onChange={onChange}>{children}</select>
    );
}

const DropdownItem = ({ value, label }) => {
    return (
        <option className={classes.option}
            value={value}>{label}</option>
    );
}

export { Dropdown, DropdownItem };