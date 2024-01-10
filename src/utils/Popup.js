import { createPortal } from 'react-dom';
import classes from './Popup.module.css';

const Popup = (props) => {
    return createPortal(
        <>
            <section className={classes.backdrop} onClick={props.closePopup} />
            <div className={classes.cross} onClick={props.closePopup}>X</div>
            <article className={classes.popup}>
                {props.header && <h2 className={classes.header}>
                    {props.header}
                </h2>}
                {props.children}
            </article>
        </>, document.getElementById('popup')
    );
}

export default Popup;