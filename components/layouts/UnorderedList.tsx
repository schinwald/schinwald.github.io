import React, { RefObject } from 'react';
import { parseClassName } from '@utils/parsers';
import { ClassName } from '@utils/types';
import styles from '@styles/modules/components/layouts/UnorderedList.module.scss';

export type UnorderedListProps = {
    className?: ClassName;
    direction: "horizontal" | "vertical";
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement>;

export const UnorderedList = React.forwardRef<HTMLUListElement, React.PropsWithChildren<UnorderedListProps>>((props, ref) => (
    <ul {...props} ref={ref} className={[styles["list"], styles["list--direction-" + props.direction], parseClassName(props.className)].filter(Boolean).join(" ")}>
        { React.Children.map(props.children, (child) => {
            return <li>
                {child}
            </li>
        }) }
    </ul>
));

UnorderedList.displayName = 'UnorderedList'