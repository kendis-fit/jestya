import { Formik, Form } from "formik";
import React, { useState } from "react";

import Modal from "../Modal";
import resource from "../../api/resource";
import { IUpdateUser } from "../../api/users";
import InputModal from "../InputModal";

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
                showModal ? <Modal disabled={loading} showFooter={false} title="Edit user" onClose={() => setShowModal(false)}>
                    <Formik initialValues={{ name: props.name, login: props.login }} onSubmit={onSubmit}>
                        {
                            (({ values, errors, handleChange }) => (
                                <Form>
                                    <InputModal label="Name" name="name" value={values.name} error={errors.name} onChange={handleChange} />
                                    <InputModal label="Login" name="login" value={values.login} error={errors.login} onChange={handleChange} />
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
