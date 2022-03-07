import React from 'react';
import styles from '@styles/modules/components/Socials.module.scss';
import { UnorderedList } from '@components/layouts';
import { Link } from '@components/primitives';

type Props = {
    className?: string;
}

export const Socials: React.FC<Props> = ({className}) => {
    return <section className={(className ? className + " " : "") + styles["socials"]}>
        <UnorderedList direction="horizontal">
            <Link href="https://github.com/schinwald" icon={{ type: "fontawesome", name: "github", position: "left"}} underline={true} rel="external">GitHub</Link>
            <Link href="https://www.linkedin.com/in/schinwald" icon={{ type: "fontawesome", name: "linkedin", position: "left"}} underline={true} rel="external">LinkedIn</Link>
            <Link href="https://twitter.com/schinwald" icon={{ type: "fontawesome", name: "twitter", position: "left"}} underline={true} rel="external">Twitter</Link>
        </UnorderedList>
    </section>
}