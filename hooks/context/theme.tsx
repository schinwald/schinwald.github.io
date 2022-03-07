import React, { useEffect, useLayoutEffect } from "react"
import { PropsWithChildren, useContext, useState } from "react"

export type ThemeProps = {
    theme: 'light' | 'dark'
}

const ThemeContext = React.createContext<any>(null)

export const useTheme = () => {
    return useContext(ThemeContext)
}

export const ThemeProvider: React.FC<PropsWithChildren<ThemeProps>> = (props) => {
    const [ theme, setTheme ] = useState<string>('')

    const darkColorSchemeHandler = (event: MediaQueryListEvent) => {
        if (event.matches) {
            setTheme('dark')
        }
    }

    const lightColorSchemeHandler = (event: MediaQueryListEvent) => {
        if (event.matches) {
            setTheme('light')
        }
    }

    useEffect(() => {
        if (theme) return

        // add event listener for color preference change
        window.matchMedia("(prefers-color-scheme: dark").addEventListener('change', darkColorSchemeHandler)
        window.matchMedia("(prefers-color-scheme: light").addEventListener('change', lightColorSchemeHandler)

        // check if theme was set already
        const stored = window.localStorage.getItem('theme')
        if (stored === 'dark' || stored === 'light') {
            setTheme(stored)
        // otherwise check user color scheme preferences
        } else {
            // check for dark preference
            if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
                setTheme('dark')
            // check for light preference
            } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
                setTheme('light')
            // use default
            } else {
                setTheme(props.theme)
            }
        }

        return () => {
            window.matchMedia("(prefers-color-scheme: dark").removeEventListener('change', darkColorSchemeHandler)
            window.matchMedia("(prefers-color-scheme: light").removeEventListener('change', lightColorSchemeHandler)
        }
    })

    useEffect(() => {
        window.localStorage.setItem('theme', theme)
    }, [ theme ])

    return <ThemeContext.Provider value={[ theme, setTheme ]}>
        <div className={['theme', `theme--${theme}`].filter(Boolean).join(' ')}>
            { props.children }
        </div>
    </ThemeContext.Provider>
}