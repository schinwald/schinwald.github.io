import React from 'react';
import styles from '@styles/modules/components/Terminal.module.scss';
import SVGBrowserButtons from '@images/components/browser-buttons.svg';
import ReactTypingEffect from 'react-typing-effect';
import { UnorderedList } from '@components/layouts';
import { parseClassName } from '@utils/parsers';

type Props = {
    className?: string;
    occupations: string[]
}

export const Terminal: React.FC<Props> = ({ className, occupations }) => {
    occupations = occupations?.map(occupation => occupation + '.')

    return <section className={[styles["terminal"], "shadow shadow--box", parseClassName(className)].filter(Boolean).join(" ")}>
        <div className={styles["terminal__header"]} role="img">
            <SVGBrowserButtons height="100%"/>
        </div>
        <article className={styles["terminal__body"]}>
            <UnorderedList direction="vertical">
                <span>Hello World!</span>
                <span></span>
                <span>I&#39;m <strong>James</strong>, but my friends call me <strong>Jamie</strong>.</span>
                <span>
                    { occupations &&
                        <ReactTypingEffect 
                            staticText="I'm"
                            text={occupations}
                            displayTextRenderer={(text: string, index: number) => {
                                const offset = (occupations[index].slice(0, 2) == "an") ? 3 : 2;
                                const last = (text.length == occupations[index].length) ? <span>.</span> : <></>;
                                return <>
                                    <span>{text.slice(0, offset)}</span><strong>{text.slice(offset, -1)}</strong>{last}
                                </>
                            }}
                            speed={50}
                            eraseSpeed={50}
                            typingDelay={1000}
                            eraseDelay={3000} />
                    }
                </span>
            </UnorderedList>
        </article>
    </section>
}