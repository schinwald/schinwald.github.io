import React, { useState } from 'react'
import styles from '@styles/modules/components/primitives/Toggle.module.scss'
import { Icon } from '@utils/types'
import { parseIcon } from '@utils/parsers'

export type ToggleProps = {
    isToggled: boolean,
    onIcon: Icon,
    offIcon: Icon,
    toggleHandler: () => void
}

export const Toggle: React.FC<ToggleProps> = ({ isToggled, onIcon, offIcon, toggleHandler }) => {
    const onClick = (event: React.MouseEvent) => {
        toggleHandler()
    }
    
    return <button className={[styles["toggle"], styles[`toggle--${isToggled ? "on" : "off"}`]].filter(Boolean).join(" ")} onClick={onClick} role="switch" aria-checked={isToggled}>
        <span className={[styles["knob"], parseIcon(isToggled ? onIcon : offIcon)].filter(Boolean).join(" ")}></span>
    </button>
}