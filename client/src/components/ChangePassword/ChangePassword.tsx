import { Formik, Form } from "formik";
import React, { useState } from "react";

import Modal from "../Modal";
import InputModal from "../InputModal";
import resource from "../../api/resource";

export interface IChangePassword {
    oldPassword: string;
    newPassword: string;
    repeatNewPassword: string;
}

const initialValues = {
    oldPassword: "",
    newPassword: "",
    repeatNewPassword: ""
}

export interface IChangePasswordProps {
    id: string;
    onChangePassword?: () => void;
}

const ChangePassword = (props: IChangePasswordProps) => {
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSubmit = async (values: IChangePassword) => {
        const { repeatNewPassword, ...rest } = values;
        try {
            setLoading(true);
            await resource.users.changePassword(props.id, rest);
            setShowModal(false);
            props.onChangePassword?.();
        } finally {
            setLoading(false);
        }
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
