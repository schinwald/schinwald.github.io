import { ClassName, Icon } from '@utils/types'
import styles from '@styles/modules/components/primitives/Link.module.scss'
import React from 'react'
import { parseClassName, parseIcon } from '@utils/parsers'

export type LinkProps = {
    className?: ClassName
    icon?: Icon
    underline: boolean
} & React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>

export const Link = React.forwardRef<HTMLAnchorElement, React.PropsWithChildren<LinkProps>>((props, ref) => (
    <a {...props} ref={ref} className={[styles["link"], props.underline ? styles["link--underline"] : "", parseClassName(props.className)].filter(Boolean).join(" ")} role="link">
        <span className={[parseIcon(props.icon)].filter(Boolean).join(" ")}>
            {props.children}
        </span>
    </a>
));

Link.displayName = 'Link'