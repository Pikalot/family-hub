import styles from "./FormButton.module.css";

const AcceptFormButton = (props) => {
    return (
        <div
            className={styles["button"]}>
            <button
                type="submit"
                name={props.value}
                id={props.value}
                value={props.value}
            >
                {props.msg}
            </button>
        </div>
    )
}

export default AcceptFormButton