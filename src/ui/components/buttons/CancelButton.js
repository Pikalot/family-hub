import Link from "next/link";
import styles from "./FormButton.module.css";

const CancelButton = ({ props }) => {
    return (
        <Link
            href={props.callbackUrl ?? "/"}
            className={styles["cancel"]}>
            Cancel
        </Link>
    )
}

export default CancelButton