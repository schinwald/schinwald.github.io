import styles from '@styles/modules/components/Guide.module.scss';
import { parseClassName } from '@utils/parsers';
import React from 'react';
import gsap from 'gsap/dist/gsap'
import ScrollToPlugin from 'gsap/dist/ScrollToPlugin'

gsap.registerPlugin(ScrollToPlugin)

type Props = {
    className?: string;
    container: string;
    target: string;
    text: string;
    direction: "up" | "right" | "down" | "left";
}

export const Guide: React.FC<Props> = ({ className, container, target, text, direction }) => {

    const onClick = () => {
        gsap.to(container, { duration: 0.5, scrollTo: target, ease: 'power4' })
    }

    return <p className={[styles["guide"], parseClassName(className)].filter(Boolean).join(" ")}>
        <span className={["icon", `icon--position-${direction}`, `icon--chevrons-${direction}`, `icon--bobbing-${direction}`].filter(Boolean).join(" ")} onClick={onClick}>
            {text}
        </span>
    </p>
}