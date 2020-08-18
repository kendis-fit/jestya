import { Formik, Form } from "formik";
import React, { useState } from "react";

import Modal from "../Modal";
import InputModal from "../InputModal";

const initialValues = {
    oldPassword: "",
    newPassword: "",
    repeatNewPassword: ""
}

export interface IChangePasswordProps {
    onChangePassword?: () => void;
}

const ChangePassword = (props: IChangePasswordProps) => {
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSubmit = (values: any) => {
        setShowModal(false);
        props.onChangePassword?.();
    }

    return(
        <>
            <button className="btn btn-dark btn-sm" onClick={() => setShowModal(true)}>Change Password</button>
            {
                showModal ? <Modal showFooter={false} disabled={loading} title="Change password" onClose={() => setShowModal(false)}>
                    <Formik initialValues={initialValues} onSubmit={onSubmit}>
                        {
                            (({ values, errors, handleChange }) => (
                                <Form>
                                    <InputModal type="password" label="Old password" name="oldPassword" onChange={handleChange} value={values.oldPassword} error={errors.oldPassword} />
                                    <InputModal type="password" label="New password" name="newPassword" onChange={handleChange} value={values.newPassword} error={errors.newPassword} />
                                    <InputModal type="password" label="Repeat password" name="repeatNewPassword" onChange={handleChange} value={values.repeatNewPassword} error={errors.repeatNewPassword} />
                                    <div className="d-flex justify-content-end">
                                        <button type="submit" className="btn btn-dark">Change password</button>
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

export default ChangePassword;
