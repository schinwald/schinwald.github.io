import React, { RefObject } from 'react';
import { parseClassName, parseIcon } from '@utils/parsers';
import { ClassName, Icon } from '@utils/types';
import styles from '@styles/modules/components/primitives/Badge.module.scss';

export type BadgeProps = {
    className?: ClassName;
    icon?: Icon;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const Badge = React.forwardRef<HTMLDivElement, React.PropsWithChildren<BadgeProps>>((props, ref) => (
    <div {...props} ref={ref} className={[styles["badge"], "shadow shadow--box", parseClassName(props.className)].filter(Boolean).join(" ")}>
        <span className={[parseIcon(props.icon)].filter(Boolean).join(" ")}>
        </span>
        {props.children}
    </div>
));

Badge.displayName = 'Badge'