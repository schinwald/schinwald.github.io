import React from 'react';
import { parseClassName } from '@utils/parsers';
import { ClassName } from '@utils/types';
import styles from '@styles/modules/components/layouts/BadgeList.module.scss';
import { UnorderedList, UnorderedListProps } from '@components/layouts';

export type BadgeListProps = {
    className?: ClassName;
} & UnorderedListProps;

export const BadgeList = React.forwardRef<HTMLUListElement, React.PropsWithChildren<BadgeListProps>>((props, ref) => (
    <UnorderedList {...props} ref={ref} className={[styles["list"], parseClassName(props.className)].filter(Boolean).join(" ")}>
        { props.children }
    </UnorderedList>
));

BadgeList.displayName = 'BadgeList'