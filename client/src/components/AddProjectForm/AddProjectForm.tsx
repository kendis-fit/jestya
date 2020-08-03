import React from "react";
import { object, string } from "yup";
import { Formik, Form } from "formik";

const schema = object().shape({
    name: string()
        .required(),
    description: string()
        .notRequired()
});

const initialValues: IAddProjectForm = {
    name: "",
    description: ""
}

export interface IAddProjectForm {
    name: string;
    description?: string;
}

const AddProjectForm = () => {
    const onSubmit = (values: IAddProjectForm) => {
        console.log(JSON.stringify(values, null, 2));
    }

    return(
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={schema}>
            {
                (({ values, errors, touched, handleChange }) => (
                    <Form>
                        <div className="add-project-form-item_wrapper">
                            <label htmlFor="project.name" className="form-label">Name</label>
                            <input name="name" onChange={handleChange} type="text" className={`form-control ${errors.name ? "form-control.isInvalid" : ""}`} id="project.name" value={values.name} />
                            <div className={`${errors.name && touched.name ? "text-danger" : ""}`}>
                                {errors.name && touched.name ? errors.name : " "}
                            </div>
                        </div>
                        <div className="add-project-form-item_wrapper">
                            <label htmlFor="project.description" className="form-label">Description</label>
                            <textarea name="description" onChange={handleChange} className={`form-control ${errors.name ? "form-control.isInvalid" : ""}`} id="project.description" value={values.description} />
                            <div className={`${errors.name ? "text-danger" : ""}`}>
                                {errors.description && touched.description ? errors.description : " "}
                            </div>
                        </div>
                        <div className="d-flex justify-content-end">
                            <button type="submit" className="btn btn-primary">Create project</button>
                        </div>
                    </Form>
                ))
            }
        </Formik>
    );
}

export default AddProjectForm;
