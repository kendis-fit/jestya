import React, { ReactNode, useEffect, useRef, HTMLAttributes } from "react";

export interface IClickAwayListenerProps extends HTMLAttributes<HTMLDivElement> {
    onClickAway: (event: MouseEvent) => void;
    children?: ReactNode;
}

const ClickAwayListener = (props: IClickAwayListenerProps) => {
    const nodeRef = useRef<HTMLDivElement>(null);
    const { onClickAway, children, ...rest } = props; 

    useEffect(() => {
        const handleClickAway = (event: MouseEvent): void => {
            if (nodeRef && nodeRef.current && nodeRef.current.contains(event.target as Node)) {
                return;
            }
            onClickAway(event);
        }

        document.addEventListener("click", handleClickAway);
        return () => document.removeEventListener("click", handleClickAway);
    }, [nodeRef, onClickAway]);
    
    return(
        <div ref={nodeRef} {...rest}>
            {children}
        </div>
    );
}

export default ClickAwayListener;
