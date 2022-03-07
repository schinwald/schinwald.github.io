import { ClassName, Icon } from '@utils/types';
import styles from '@styles/modules/components/primitives/Input.module.scss';
import React from 'react';
import { parseClassName } from '@utils/parsers';

export type InputProps = {
    className?: ClassName;
    icon?: Icon;
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => (
    <input {...props} ref={ref} className={[styles["input"], parseClassName(props.className)].filter(Boolean).join(" ")} role="textbox" />
))

Input.displayName = 'Input'