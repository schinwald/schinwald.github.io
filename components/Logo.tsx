import React from 'react';
import styles from '../styles/modules/components/Logo.module.scss';
import SVGLogo from '../public/images/components/logo.svg';
import { parseClassName } from '@utils/parsers';
import { Link } from './primitives';

type Props = {
    className?: string;
}

export const Logo: React.FC<Props> = ({className}) => {
    return <figure className={[styles["container"], parseClassName(className)].filter(Boolean).join(" ")}>
        <Link className={styles["logo"]} underline={false} href="#introduction">
            <SVGLogo />
        </Link>
    </figure>
}