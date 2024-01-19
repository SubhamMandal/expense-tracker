import { createPortal } from 'react-dom';
import classes from './Popup.module.css';

const Popup = (props) => {
    return createPortal(
        <section >
            <div className={classes.backdrop} onClick={props.closePopup} />
            <article className={classes.popup}>
                {props.children}
            </article>
        </section>, document.getElementById('popup')
    );
}

export default Popup;