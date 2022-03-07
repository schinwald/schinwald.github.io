import React, { RefObject } from 'react';
import { ClassName } from '@utils/types';
import styles from '@styles/modules/components/primitives/Figure.module.scss';
import { parseClassName } from '@utils/parsers';

export type FigureProps = {
    className?: ClassName;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export const Figure = React.forwardRef<HTMLButtonElement, React.PropsWithChildren<FigureProps>>((props, ref) => (
    <figure {...props} ref={ref} className={[styles["figure"], parseClassName(props.className)].filter(Boolean).join(" ")}>
        <div className={[styles["container"], "shadow shadow--filter"].filter(Boolean).join(" ")}>
            { props.children }
        </div>
    </figure>
));

Figure.displayName = 'Figure'