import React from 'react'
import styled from 'styled-components'
import Tippy from '@tippyjs/react'

type ToolTipProps = {
    children: any
    explanation: string
}

const ToolTip = ({ children, explanation }: ToolTipProps) => {
    return (
        <Tippy
            delay={0}
            duration={0}
            arrow={true}
            allowHTML={true}
            hideOnClick={true}
            content={<ToolTipContent>{ explanation }</ToolTipContent>}
        >
            {children}
        </Tippy>
    )
}

const ToolTipContent = styled.div`
    word-break: break-word;
    background-color: black;
    border: solid black 1px;
    border-radius: 5px;
    padding: 12px;
    color: white;
    width: 40ch;
`

export default ToolTip