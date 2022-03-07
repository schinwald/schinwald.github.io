import React, { RefObject } from 'react';
import { parseClassName, parseIcon } from '@utils/parsers';
import { ClassName, Icon } from '@utils/types';
import styles from '@styles/modules/components/primitives/Button.module.scss';

export type ButtonProps = {
    className?: ClassName;
    icon?: Icon;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export const Button = React.forwardRef<HTMLButtonElement, React.PropsWithChildren<ButtonProps>>((props, ref) => (
    <button {...props} ref={ref} className={[styles["button"], parseClassName(props.className)].filter(Boolean).join(" ")} role="button">
        <span className={[parseIcon(props.icon)].filter(Boolean).join(" ")}>
            {props.children}
        </span>
    </button>
));

Button.displayName = 'Button'