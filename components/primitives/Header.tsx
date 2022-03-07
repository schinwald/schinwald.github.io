import { parseClassName, parseIcon } from '@utils/parsers';
import { ClassName, Icon, Justification } from '@utils/types';
import styles from '@styles/modules/components/primitives/Header.module.scss';
import React from 'react';

export type HeaderProps = {
    className?: ClassName
    type: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
    icon?: Icon
    justify: Justification
    underline?: Boolean
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>

export const Header = React.forwardRef<HTMLHeadingElement, React.PropsWithChildren<HeaderProps>>((props, ref) => {
    return React.createElement(props.type, {
        ref: ref,
        key: 'hello',
        className: [parseClassName(props.className), styles["header"], styles[`header--${props.type}`], styles["header--justify-" + props.justify], props.underline ? styles["header--underline"] : false, ].filter(Boolean).join(" ")
    }, 
        <span className={[parseIcon(props.icon)].filter(Boolean).join(" ")}>
            { props.children }
        </span>
    )
})

Header.displayName = 'Header'