import React from 'react'
import styles from '@styles/modules/components/Navigation.module.scss'
import { UnorderedList } from '@components/layouts'
import { Link, Toggle } from '@components/primitives'
import { parseClassName } from '@utils/parsers'
import { useTheme } from 'hooks/context'

type Props = {
    className?: string;
}

export const Navigation: React.FC<Props> = ({ className }) => {
    const [ theme, setTheme ] = useTheme()

    return <>
        <nav className={[styles["navigation"], parseClassName(className)].filter(Boolean).join(" ")}>
            <UnorderedList direction="horizontal">
                <Link href="#about" underline={true}>About</Link>
                <Link href="#projects" underline={true}>Projects</Link>
                <Link href="#artwork" underline={true}>Artwork</Link>
                <Link href="#blogs" underline={true}>Blogs</Link>
                <Link href="#resume" underline={true}>Resume</Link>
                <Link href="#contact" underline={true}>Contact</Link>
                <Toggle 
                    isToggled={theme === 'light' ? true : false} 
                    onIcon={{ type: "fontawesome", name: "light", position: "center"}}
                    offIcon={{ type: "fontawesome", name: "dark", position: "center"}}
                    toggleHandler={() => {
                        if (theme === 'light') {
                            setTheme('dark')
                        } else if (theme === 'dark') {
                            setTheme('light')
                        }
                    }}
                />
            </UnorderedList>
        </nav>
    </>
}