import { Formik, Form } from "formik";
import React, { useState } from "react";

import Modal from "../Modal";
import { IUpdateUser } from "../../api/users";
import resource from "../../api/resource";

export interface IEditUserProps {
    id: string;
    name: string;
    login: string;
    onUpdate?: (user: IUpdateUser) => void;
}

const EditUser = (props: IEditUserProps) => {
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSubmit = async (values: IUpdateUser) => {
        try {
            setLoading(true);
            await resource.users.update(props.id, values);
            setShowModal(false);
            props.onUpdate?.(values);
        } finally {
            setLoading(false);
        }
    }

    return(
        <>
            <span className="material-icons user-info__editor" onClick={() => setShowModal(true)}>edit</span>
            {
                showModal ? <Modal disabled={loading} showFooter={false} size="lg" title="Edit user" onClose={() => setShowModal(false)}>
                    <Formik initialValues={{ name: props.name, login: props.login }} onSubmit={onSubmit}>
                        {
                            (({ values, errors, handleChange }) => (
                                <Form>
                                    <div className="add-project-form-item_wrapper">
                                        <label htmlFor="project.name" className="form-label">Name</label>
                                        <input id="project.name" name="name" onChange={handleChange} type="text" className={`form-control ${errors.name ? "form-control.isInvalid" : ""}`} value={values.name} />
                                    </div>
                                    <div className="add-project-form-item_wrapper">
                                        <label htmlFor="project.login" className="form-label">Login</label>
                                        <input id="project.login" name="login" onChange={handleChange} type="text" className={`form-control ${errors.login ? "form-control.isInvalid" : ""}`} value={values.login} />
                                    </div>
                                    <div className="d-flex justify-content-end">
                                        <button type="submit" className="btn btn-dark">Update User</button>
                                    </div>
                                </Form>
                            ))
                        }
                    </Formik>
                </Modal> : null
            }
        </>
    );
}

export default EditUser;
