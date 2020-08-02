import bootstrap from "bootstrap";
import React, { ReactNode, useEffect, useRef, useState } from "react";

export interface IModal {
    title: string;
    open: boolean;
    size?: "xl" | "lg" | "sm";
    children?: ReactNode;
    isStatic?: boolean;
    verticalCentered?: boolean;
    fullscrean?: boolean;
    childrenFooter?: ReactNode;
    onClose?: () => void;
    onOk?: () => void;
}

const Modal = (props: IModal) => {
    const [modal, setModal] = useState<bootstrap.Modal | null>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    const [fullscreen, setFullscreen] = useState<string | null>(props.fullscrean ? "modal-fullscreen" : null);
    const [size, setSize] = useState<string | null>(props.size ?? "sm");
    const [center, setCenter] = useState<string | null>(props.verticalCentered ? "modal-dialog-centered" : null);

    useEffect(() => {
        setFullscreen(props.fullscrean ? "modal-fullscreen" : null);
    }, [props.fullscrean]);

    useEffect(() => {
        setSize(props.size ?? "sm");
    }, [props.size]);

    useEffect(() => {
        setCenter(props.verticalCentered ? "modal-dialog-centered" : null);
    }, [props.verticalCentered]);

    useEffect(() => {
        if (modalRef) {
            const current = modalRef.current;
            if (current) {
                setModal(new bootstrap.Modal(current));
            }
        }
    }, [modalRef]);

    useEffect(() => {
        if (modal) {
            props.open ? modal.show() : modal.hide();
        }
    }, [modal, props.open]);

    return(
        <div className="modal fade" 
            data-backdrop={props.isStatic ? "static" : null}
            data-keyboard={props.isStatic ? "false" : null}
            id={`${props.title}-modal`}
            tabIndex={-1}
            aria-labelledby={`${props.title}-modal modal-${size} ${fullscreen} ${center}`}
            aria-hidden="true"
            ref={modalRef}>
            <div className={`modal-dialog modal`}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{props.title}</h5>
                        <button type="button" onClick={() => props.onClose && props.onClose()} className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    {
                        props.children ? <div className="modal-body">
                            {props.children}
                        </div> : null
                    }
                    <div className="modal-footer">
                        {
                            props.childrenFooter ?  props.childrenFooter :
                            <>
                                <button type="button" onClick={() => props.onClose && props.onClose()} className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" onClick={() => props.onOk && props.onOk()} className="btn btn-primary">Ok</button>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;