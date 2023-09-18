import { PropsWithChildren } from "react";
import styles from "./styles.module.css";

export const BackgroundContainer = (props: PropsWithChildren<{ imagePath: string }>) => {
    return (
        <div className={styles.container}>
            <div className={styles.background} style={{ backgroundImage: `url(${props.imagePath})` }}></div>
            <div className={styles.content}>{props.children}</div>
        </div>
    );
}