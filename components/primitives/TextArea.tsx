import { ClassName, Icon } from '@utils/types';
import styles from '@styles/modules/components/primitives/TextArea.module.scss';
import React from 'react';
import { parseClassName } from '@utils/parsers';

export type TextAreaProps = {
    className?: ClassName;
    icon?: Icon;
} & React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>

export const TextArea = React.forwardRef<HTMLTextAreaElement, React.PropsWithChildren<TextAreaProps>>((props, ref) => (
    <textarea {...props} ref={ref} className={[styles["textarea"], parseClassName(props.className)].filter(Boolean).join(" ")} role="textbox" />
));

TextArea.displayName = 'TextArea'