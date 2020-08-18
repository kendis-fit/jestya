import * as bootstrap from "bootstrap";
import React, { ReactNode, useEffect, useRef, useState } from "react";

import ButtonsFooter from "../ButtonsFooter/ButtonsFooter";
import { createPortal } from "react-dom";

export interface IModalFooter {
    titlePrimary?: string;
    titleSecondary?: string;
    hideSecondary?: boolean;
}

export interface IModal {
    title: string;
    onClose: () => void;
    size?: "xl" | "lg" | "sm";
    children?: ReactNode;
    isStatic?: boolean;
    verticalCentered?: boolean;
    showFooter?: boolean;
    fullscrean?: boolean;
    footer?: IModalFooter;
    onOk?: () => void;
    disabled?: boolean;
}

const Modal = ({ showFooter = true, ...props }: IModal) => {
    const [modal, setModal] = useState<bootstrap.Modal | null>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    const [fullscreen, setFullscreen] = useState<string | null>(props.fullscrean ? "modal-fullscreen" : "");
    const [size, setSize] = useState<string | null>(props.size ? `modal-${props.size}` : "modal-sm");
    const [center, setCenter] = useState<string | null>(props.verticalCentered ? "modal-dialog-centered" : "");

    useEffect(() => {
        return function cleanup() {
            document.querySelector(".modal-backdrop")?.remove();
        }
    }, []);

    useEffect(() => {
        setFullscreen(props.fullscrean ? "modal-fullscreen" : "");
    }, [props.fullscrean]);

    useEffect(() => {
        setSize(props.size ? `modal-${props.size}` : "modal-sm");
    }, [props.size]);

    useEffect(() => {
        setCenter(props.verticalCentered ? "modal-dialog-centered" : "");
    }, [props.verticalCentered]);

    useEffect(() => {
        if (modalRef) {
            const current = modalRef.current;
            if (current && !modal) {
                current.addEventListener("hidden.bs.modal", () => {
                    props.onClose && props.onClose();
                });
                const modal = new bootstrap.Modal(current);
                modal.show();
                setModal(modal);
            }
        }
    }, [modalRef, props, modal]);

    const onClose = () => {
        modal?.hide();
    }

    return createPortal(
        <div className="modal fade" 
            data-backdrop={props.isStatic ? "static" : null}
            data-keyboard={props.isStatic ? "false" : null}
            id={`${props.title}-modal`}
            tabIndex={-1}
            aria-labelledby={`${props.title}-modal`}
            aria-hidden="true"
            ref={modalRef}>
            <div className={`modal-dialog ${size} ${fullscreen} ${center}`}>
                <div className="modal-content">
                    <div className="modal-header text-light bg-dark">
                        <h5 className="modal-title">{props.title}</h5>
                        <button type="button" onClick={onClose} className="close" data-dismiss="modal" aria-label="Close">
                            <span className="material-icons text-light" aria-hidden="true">close</span>
                        </button>
                    </div>
                    {
                        props.children ? <div className={`modal-body ${props.disabled ? "disabled" : null}`}>
                            {props.children}
                        </div> : null
                    }
                    {
                        showFooter ? <div className="modal-footer">
                            <ButtonsFooter onClose={onClose} onOk={props.onOk} {...props.footer} />
                        </div> : null
                    }
                </div>
            </div>
        </div>,
        document.body
    );
}

export default Modal;