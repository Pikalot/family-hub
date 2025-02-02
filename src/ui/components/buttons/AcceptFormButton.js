import styles from "./FormButton.module.css";

const AcceptFormButton = (props) => {
    return (
        <button
            type="submit"
            name={props.value}
            id={props.value}
            value={props.value}
            onClick={props.onClick}
            className={styles["button"]}
        >
            {props.msg}
        </button>
    )
}

export default AcceptFormButton